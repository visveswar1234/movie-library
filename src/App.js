import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Playlist from './components/Playlist/Playlist';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import MovieDetails from './components/Details/MovieDetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [username, setUsername] = useState('');

  return (
    <Router>
      <div className={`App ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} username={username} setUsername={setUsername} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home theme={theme} username={username} />} />
            <Route path="/login" element={<Login theme={theme} setUsername={setUsername} />} />
            <Route path="/register" element={<Register theme={theme} />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/playlist" element={<Playlist theme={theme} />} />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
