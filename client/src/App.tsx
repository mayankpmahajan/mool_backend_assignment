import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

interface AuthResponse {
  success: boolean;
  message: string;
  token?: string; // For storing JWT or other tokens
}

const App: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSignup, setIsSignup] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const endpoint = isSignup ? 'http://localhost:5000/api/v1/auth/register/' : 'http://localhost:5000/api/v1/auth/login/';
    try {
      const response = await axios.post<AuthResponse>(endpoint, { email, password });
      if (response.data.success) {
        alert(`Success: ${response.data.message}`);
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
        }
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
      console.error(error);
    }
  };

  const handleGoogleAuth = () => {
    window.location.href = 'http://localhost:5000/auth/google'; 
  };

  return (
    <div className="auth-container">
      <h1>{isSignup ? 'Signup' : 'Login'}</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field"
        />
        <button type="submit" className="submit-button">
          {isSignup ? 'Signup' : 'Login'}
        </button>
      </form>
      <button onClick={handleGoogleAuth} className="google-button">
        Sign in with Google
      </button>
      <p onClick={() => setIsSignup(!isSignup)} className="toggle-link">
        {isSignup ? 'Already have an account? Login' : 'Don’t have an account? Signup'}
      </p>
    </div>
  );
};

export default App;
