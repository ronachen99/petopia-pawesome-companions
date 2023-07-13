import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Function to handle user registration
  const handleSignup = async (userData) => {
    try {
      const response = await axios.post('/api/auth/signup', userData);
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  // Function to handle user login
  const handleLogin = async (userData) => {
    try {
      const response = await axios.post('/api/auth/login', userData);
      const { token } = response.data;
      setToken(token);
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  // Function to handle user logout
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/register"
            render={(props) => (
              <Signup {...props} handleSignup={handleSignup} />
            )}
          />
          <Route
            path="/login"
            render={(props) => <Login {...props} handleLogin={handleLogin} />}
          />
          <Route
            path="/dashboard"
            render={(props) => (
              <Dashboard {...props} token={token} handleLogout={handleLogout} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
