import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Footer from './components/Footer.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';

function App() {
  const [page, setPage] = useState('home');

  return (
    <>
      <Navbar setPage={setPage} />

      {page === 'home' && <Home />}
      {page === 'login' && <Login />}
      {page === 'register' && <Register />}

      <Footer />
    </>
  );
}

export default App;