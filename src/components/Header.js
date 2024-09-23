import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="app-name">
        <img src="/react-movie-app/movie-icon.svg" className="movie-icon" alt="Movie Icon" />
        <span>React Movie App</span>
      </div>
    </header>
  );
}

export default Header;
