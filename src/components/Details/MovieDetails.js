import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieOptionsModal from '../MovieModes/MovieOptionsModal';
import movieData from '../../Data/movieData';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const movie = movieData.find(movie => movie.id === id);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="movie-details-container">
      <h2>{movie.Title}</h2>
      <div className="movie-details">
        <div className="movie-image">
          <img src={movie.Poster} alt={movie.Title} />
        </div>
        <div className="movie-info">
          <p>Director: {movie.Director}</p>
          <p>Genre: {movie.Genre}</p>
          <p>Released: {movie.Released}</p>
          <p>Rating: {movie.imdbRating}</p>
          <p>Plot: {movie.Plot}</p>
          <button onClick={handleOpenModal}>View Details</button>
        </div>
      </div>
      {showModal && <MovieOptionsModal movie={movie} onClose={handleCloseModal} />}
    </div>
  );
};

export default MovieDetails;
