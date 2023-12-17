import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.email) {
      setError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Invalid email format');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) { // Example: minimum password length
      setError('Password must be at least 6 characters long');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
        return;
    }
    try {
      // Replace with your login API endpoint
      const response = await axios.post('/api/login', formData);
      console.log(response.data);
      navigate('/mainpage');
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-component">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
        
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Password" />
        
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginComponent;
