import React from 'react';

const Profile = () => {
  return (
    <div className="container py-5 text-center">
      <h1>Mi Perfil</h1>
      <p className="mt-4">Correo electrónico: usuario@ejemplo.com</p>
      <button className="btn btn-danger">
        Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;