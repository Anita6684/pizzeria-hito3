
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Profile = () => {
  const { token, email, profile, getProfile, logout } = useUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        await getProfile();
      } catch (err) {
        setError(err.message || "No se pudo obtener el perfil.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      navigate("/login");
    }
  }, [token, getProfile, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userEmail =
    profile?.email || profile?.user?.email || email;

  return (
    <div className="container py-5 text-center">
      <h1>Mi Perfil</h1>

      {loading ? (
        <p className="mt-4">Cargando perfil...</p>
      ) : error ? (
        <p className="text-danger mt-4">{error}</p>
      ) : (
        <p className="mt-4">
          Correo electrónico: {userEmail}
        </p>
      )}

      <button
        className="btn btn-danger mt-3"
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;


