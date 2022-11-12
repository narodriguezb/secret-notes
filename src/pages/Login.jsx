import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  function handleChange({ target: { name, value } }) {
    setUser({ ...user, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/weak-password") {
        setError("invalid password");
      } else if (error.code === "auth/internal-error") {
        setError("invalid email");
      } else {
        setError("an error has ocurred");
        console.log(error);
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      console.log(error)
      setError(error.message);
    }
  };
  return (
    <div>
      {error && <Alert message={error}/>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="youremail@example.com"
          onChange={handleChange}
        />

        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="******"
          onChange={handleChange}
        />

        <button>Login</button>
      </form>

      <button onClick={handleGoogleSignIn}>Login with Google</button>
    </div>
  );
}
