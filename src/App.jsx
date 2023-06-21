import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './src/utils/firebase';
import Login from './src/components/authentication/Login';
import DataEntry from './src/components/DataEntry';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AboutUs from './routes/AboutUs';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Erro ao efetuar login:', error.message);
    }
  };

  const handleSignUp = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isLoggedIn ? <Login onLogin={handleLogin} onSignUp={handleSignUp} /> : <DataEntry />} />
        <Route path="/sobre-nos" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;