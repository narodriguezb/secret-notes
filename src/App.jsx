import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Register } from "./pages/Register";
import { AuthProvider } from "./context/authContext";

export default function App() {
  return (
    <div className="bg-slate-300 h-screen text-black flex">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}
