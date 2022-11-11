
import { useAuth } from "../context/authContext";

export function Home() {
  const { user, logout, loading } = useAuth();

  console.log(user);

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  if (loading) return <h1>loading</h1>;
  return (
    <div>
      <h1>Welcome {user._id}</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
