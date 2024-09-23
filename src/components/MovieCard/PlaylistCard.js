
import React from 'react';
import './PlaylistCard.css';

const PlaylistCard = ({ item, onClick }) => (
  <div className="card" onClick={onClick}>
    <div className="image-container">
      <img
        src={item.Poster}
        alt={item.Title}
        className="main-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/150';
        }}
        loading="lazy"
      />
      <img
        src={item.Poster}
        alt={item.Title}
        className="background-blur"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/150';
        }}
        loading="lazy"
      />
    </div>
    <div className="card-details">
      <h3>{item.Title}</h3>
      <p>{item.Released}</p>
    </div>
  </div>
);

export default PlaylistCard;
