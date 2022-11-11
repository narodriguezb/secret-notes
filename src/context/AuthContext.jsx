import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Firebase";
import { createUser, getUserUid } from "../api/users/userServices";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }
    });
    return () => unsubscribe();
  }, []);

  const singUp = async (email, password, name, lastName) => {
    try {
      const userResponse = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const mongoResponse = await createUser({
        uid: userResponse.user.uid,
        firstName: name,
        lastName,
        email,
      });
      setUser(mongoResponse);
    } catch (error) {}
  };

  const login = async (email, password) => {
    try {
      const userResponse = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = await getUserUid(userResponse.user.uid);
      setUser(userData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    const fireUser = await signInWithPopup(auth, googleProvider);
    const mongoUser = await getUserUid(fireUser.user.uid);
    if (mongoUser) {
      setUser(userData);
      setLoading(false);
      return;
    }

    const newUser = await createUser({
      uid: fireUser.user.uid,
      name: fireUser.user.displayName,
      email: fireUser.user.email,
    });

    setUser(newUser);
    setLoading(false);
  };

  const logout = () => signOut(auth);

  return (
    <authContext.Provider
      value={{ singUp, login, user, logout, loading, loginWithGoogle }}
    >
      {children}
    </authContext.Provider>
  );
}
