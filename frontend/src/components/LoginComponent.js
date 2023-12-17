import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    // Update state based on input type
    const { id, value } = e.target;
    if (id === 'email') setEmail(value);
    if (id === 'password') setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });

    if (!email || !password) {
      alert('Both email and password are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, password });
      const userType = response.data.userType;
      console.log('User type:', userType);
      if (userType === 'borrower') {
        navigate('/borrower-mainpage');
      } else if (userType === 'lender') {
        navigate('/lender-mainpage');
      } else {
        alert('Invalid user type');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed - Unknown');
    }
  };

  return (
    <div className="main-content">
      <div className="login-component">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input type="email" id="email" value={email} onChange={handleInputChange} placeholder="Email" />
          <input type="password" id="password" value={password} onChange={handleInputChange} placeholder="Password" />
          <button type="submit">Log In</button>
          {/* Other content */}
          <p className="register-link">Don't have an account?<br/><Link to="/register">Register New Account Here</Link></p>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
