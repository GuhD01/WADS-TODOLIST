import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from './firebase/auth';
import { useUser  } from './contexts/authContext/UserContext.jsx';
import './login.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useUser(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    const lowerCaseEmail = email.toLowerCase(); 
    try {
      await doSignInWithEmailAndPassword(lowerCaseEmail, password);
      login(lowerCaseEmail); 
      setShowSuccessPopup(true);
      setShowErrorPopup(false);
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate('/app');
      }, 2000);
    } catch (error) {
      setShowErrorPopup(true);
      setTimeout(() => {
        setShowErrorPopup(false);
      }, 2000);
      console.error("Authentication error:", error);
    }
  };
  
  return (
    <>
      {showSuccessPopup && (
        <div className="success-popup">Login Successful</div>
      )}
      {showErrorPopup && (
        <div className="error-popup">Incorrect Email or Password</div> // Error popup
      )}
      <div className="card">
        <div className="card2">
          <form className="form" onSubmit={handleLogin}>
            <p id="heading">Login</p>
            <div className="field">
              <input
                type="email"
                className="input-field"
                placeholder="Email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <input 
                type="password" 
                className="input-field" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="btn">
              <button type="submit" className="button1">Login</button> 
              <button type="button" className="button2" onClick={() => navigate('/register')}>Sign Up</button> 
            </div>
            {/* <button type="button" className="button3">Forgot Password</button>  */}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
