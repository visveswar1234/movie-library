import React from 'react';

const MovieCard = ({ movie, onAddToWishlist }) => {
  const handleAddToWishlist = () => {
    onAddToWishlist(movie);
  };

  return (
    <div className="movie-card">
      <img
        src={movie.Poster === 'N/A' ? 'https://via.placeholder.com/200x300' : movie.Poster}
        alt={movie.Title}
        className="movie-poster"
      />
      <div className="movie-info">
        <div className="movie-title">{movie.Title}</div>
        <div className="movie-year">{movie.Year}</div>
      </div>
      <button onClick={handleAddToWishlist}>Add to Wishlist</button>
    </div>
  );
};

export default MovieCard;
