import React, { useState } from 'react';
import MovieOptionsModal from '../MovieModes/MovieOptionsModal';
import './OverlayDetails.css';

const OverlayDetails = ({ item, onClose }) => {
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const handleOpenOptionsModal = () => {
    setShowOptionsModal(true);
  };

  const handleCloseOptionsModal = () => {
    setShowOptionsModal(false);
  };

  return (
    <div className="overlay">
      <div className="overlay-content">
        <button className="close-button" onClick={onClose}>
          &larr; Back
        </button>
        <div className="movie-details">
          <div className="movie-image">
            <img src={item.Poster} alt={item.Title} />
          </div>
          <div className="movie-info">
            <h3>{item.Title}</h3>
            <p>Released: {item.Released}</p>
            <p>{item.Plot}</p>
            <p>Director: {item.Director}</p>
            <p>Genre: {item.Genre}</p>
            <p>Rating: {item.imdbRating}</p>
          </div>
        </div>
      </div>
      {showOptionsModal && (
        <MovieOptionsModal
          movie={item}
          onClose={handleCloseOptionsModal}
        />
      )}
    </div>
  );
};

export default OverlayDetails;
