import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Both email and password are required');
      return false;
    }
    // Add any other validation checks here
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log('Sending login request with:', formData);
      const response = await axios.post('http://localhost:3001/api/login/loginUser', formData);
      console.log('Login response:', response.data);
      // Assuming the response contains the user type
      if (response.data.userType === 'Borrower') {
        navigate('/borrower/BorrowerMainpage');
      } else if (response.data.userType === 'Lender') {
        navigate('/lender/LenderMainpage');
      } else {
        setError('Invalid user type');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="main-content">
      <div className="login-component">
        <form onSubmit={handleSubmit}>
          <label>Log In</label>
            <br/>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
            
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Password" />
            
            <button type="submit">Log In</button>
            {error && <div>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
