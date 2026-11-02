import {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

const UserContext = createContext();

const API_URL = "http://localhost:5000/api";

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(null);

  // Login y Register
  const authenticate = async (endpoint, userEmail, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error de autenticación");
      }

      setToken(data.token);
      setEmail(data.email || data.user?.email || userEmail);
      setProfile(null);

      return data;
    } catch (error) {
      throw error;
    }
  };

  // Iniciar sesión
  const login = (userEmail, password) => {
    return authenticate("login", userEmail, password);
  };

  // Registrar usuario
  const register = (userEmail, password) => {
    return authenticate("register", userEmail, password);
  };

  // Cerrar sesión
  const logout = () => {
    setToken(null);
    setEmail("");
    setProfile(null);
  };

  // Obtener perfil del usuario autenticado
  const getProfile = useCallback(async () => {
    if (!token) {
      throw new Error("Debes iniciar sesión");
    }

    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "No se pudo obtener el perfil");
    }

    setProfile(data);
    setEmail(data.email || data.user?.email || "");

    return data;
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        token,
        email,
        profile,
        login,
        register,
        logout,
        getProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

