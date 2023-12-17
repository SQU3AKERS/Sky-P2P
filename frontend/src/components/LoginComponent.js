import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const LoginComponent = () => {
  return (
    <div className="login-component">
      <form>
        <h2>Login</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Log In</button>
        <p className="register-link">Don't have an account?<br/><Link to="/register">Register New Account Here</Link></p>
      </form>
    </div>
  );
};

export default LoginComponent;
