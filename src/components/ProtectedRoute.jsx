import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";
//esto es para corroborar que el elemento exista si no lo regresa a login
export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <h1>loading</h1>;
  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}
