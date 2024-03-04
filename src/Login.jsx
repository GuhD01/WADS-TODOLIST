import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './login.css'; // Make sure you link to your CSS file

const LoginForm = () => {
  const navigate = useNavigate(); // Create an instance of useNavigate

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent the form from submitting

    // Here, you would typically validate your login credentials
    // For this example, we'll assume the login is successful and navigate to the App component

    navigate('/app'); // Navigate to the App component on successful login
  };

  return (
    <div className="card">
      <div className="card2">
        <form className="form" onSubmit={handleLogin}>
          <p id="heading">Login</p>
          <div className="field">
            <input
              type="text"
              className="input-field"
              placeholder="Username"
              autoComplete="off"
            />
          </div>
          <div className="field">
            <input type="password" className="input-field" placeholder="Password" />
          </div>
          <div className="btn">
            <button type="submit" className="button1">Login</button> {/* Use type="submit" for the Login button */}
            <button type="button" className="button2">Sign Up</button> {/* Use type="button" to prevent form submission */}
          </div>
          <button type="button" className="button3">Forgot Password</button> {/* Use type="button" to prevent form submission */}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
