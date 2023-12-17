import React, { useState } from 'react';
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
    
    // Simple front-end validation
    if (!email) {
      alert('Please enter your email.');
      return;
    }
    if (!password) {
      alert('Please enter your password.');
      return;
    }
    // Regex pattern for basic email validation
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    const userType = 'borrower';
    navigate(userType === 'borrower' ? '/borrower-mainpage' : '/lender-mainpage');
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
