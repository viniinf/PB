import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './utils/firebase';
import Login from './components/authentication/Login';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AboutUs from './routes/AboutUs';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const handleSignUp = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !isLoggedIn ? (
              <Login onLogin={handleLogin} onSignUp={handleSignUp} />
            ) : (
              <h2>Welcome, user!</h2>
            )
          }
        />
        <Route path="/sobre-nos" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;