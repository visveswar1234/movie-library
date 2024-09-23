import React from 'react';
import './MovieModal.css';

function MovieModal({ movie, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{movie.Title}</h2>
        <div className="movie-details">
          <div className="movie-image">
            <img src={movie.Poster === 'N/A' ? 'https://via.placeholder.com/200x300' : movie.Poster} alt={movie.Title} />
          </div>
          <div className="movie-info">
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Released:</strong> {movie.Released}</p>
            <p><strong>Rating:</strong> {movie.imdbRating}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Awards:</strong> {movie.Awards}</p>
            <p><strong>Runtime:</strong> {movie.Runtime}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
