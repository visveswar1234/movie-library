import React, { useState, useEffect } from 'react';
import { FaBars, FaSun, FaMoon } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ theme, setTheme }) => {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [setTheme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleClick = (url) => {
    setClicked(false);
    navigate(url);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('userrole');
    navigate('/login');
  };

  const isLoggedIn = sessionStorage.getItem('isLoggedIn');

  const menuData = [
    {
      title: 'Home',
      url: '/',
      cName: 'nav-links',
    },
    {
      title: 'Playlists',
      url: '/playlist',
      cName: 'nav-links',
      visible: isLoggedIn,
    },
    {
      title: isLoggedIn ? 'Logout' : 'Login',
      url: isLoggedIn ? '/' : '/login',
      cName: 'nav-links',
      onClick: isLoggedIn ? handleLogout : null,
    },
  ];

  return (
    <nav className={`NavbarItems ${theme}`}>
      <div className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? <FaMoon className="toggle-icon" /> : <FaSun className="toggle-icon" />}
      </div>
      <div className="menu-icons" onClick={() => setClicked(!clicked)}>
        {clicked ? '×' : <FaBars className="ico" />}
      </div>
      <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
        {menuData.filter(item => item.visible !== false).map((item, index) => (
          <li key={index}>
            <Link to={item.url} className={item.cName} onClick={item.onClick ? item.onClick : () => handleClick(item.url)}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
