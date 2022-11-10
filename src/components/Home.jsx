import { useAuth } from "../context/authContext";

export function Home() {
  const { user, logout, loading } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  console.log(user.uid);
  if (loading) return <h1>loading</h1>;
  return (
    <div>
      <h1>Welcome {user.email}</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
