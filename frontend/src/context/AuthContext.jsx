import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Always load user from cookie session
  useEffect(() => {
    api.get("/auth/me")
      .then((res) => {
        setUser(res.data);  // user OR null
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null; // prevents flash

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
