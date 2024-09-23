import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import userData from '../../Data/userData';

const Login = ({ theme, setUsername }) => {
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = () => {
    if (!validate()) return;

    fetch("http://localhost:8080/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((users) => {
        handleLoginAttempt(users);
      })
      .catch((err) => {
        handleLoginAttempt(userData.users); // Use local data for login attempt
      });
  };

  const handleLoginAttempt = (users) => {
    const user = users.find(u => u.username === username);
    if (!user) {
      toast.error('Please enter a valid username');
    } else if (user.password === password) {
      setSessionStorage(user.username, user.role);
      toast.success('Login successful');
      navigateToHome(); 
    } else {
      toast.error('Incorrect password');
    }
  };

  const setSessionStorage = (username, role) => {
    sessionStorage.setItem('isLoggedIn', true);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('userrole', role);
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const validate = () => {
    if (username.trim() === '') {
      toast.warning('Please enter a username');
      return false;
    }
    if (password.trim() === '') {
      toast.warning('Please enter a password');
      return false;
    }
    return true;
  };

  return (
    <div className={`login-container ${theme}`}>
      <ToastContainer autoClose={1500} position="top-right" className="Toastify__toast-container--right" />
      <div className="login-card">
        <div className="login-header">
          <h2>User Login</h2>
        </div>
        <div className="login-body">
          <div className="form-group">
            <label>User Name <span className="errmsg">*</span></label>
            <input value={username} onChange={(e) => setUsernameInput(e.target.value)} className="form-control" />
          </div>
          <div className="form-group">
            <label>Password <span className="errmsg">*</span></label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
          </div>
        </div>
        <div className="login-footer">
          <button type="button" onClick={login} className="btn btn-primary">Login</button>
          <span> | </span>
          <Link className="btn btn-success" to={'/register'}>New User</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
