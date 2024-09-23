import React, { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Search from '../Search/Search';
import MovieModal from '../MovieModes/MovieModal';
import MovieOptionsModal from '../MovieModes/MovieOptionsModal';
import { API_KEY } from '../../config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Home.css';

function Home({ theme, username }) {
  const [searchResults, setSearchResults] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const navigate = useNavigate();
  const resultsContainerRef = useRef(null);

  useEffect(() => {
    const scrollToMiddle = () => {
      const container = resultsContainerRef.current;
      if (container) {
        const middle = container.scrollHeight / 2 - container.clientHeight / 2;
        container.scrollTo({ top: middle, behavior: 'smooth' });
      }
    };

    if (searchInitiated) {
      scrollToMiddle();
    }
  }, [searchInitiated]);

  const handleImageClick = async (id) => {
    try {
      const response = await Axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
      if (response.data.Response === "True") {
        setSelectedMovie(response.data);
        setShowMovieModal(true);
      } else {
        console.error('Error fetching movie details:', response.data.Error);
        toast.error(response.data.Error);
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
      toast.error('Failed to fetch movie details.');
    }
  };

  const handleAddToWishlist = (movie) => {
    setSelectedMovie(movie);
    setShowOptionsModal(true);
  };

  const handleSaveOptions = async (option, privacy) => {
    try {
      const response = await Axios.post('http://localhost:5050/users', { username, ...selectedMovie, option, privacy });
      setWishlist([...wishlist, { ...selectedMovie, option, privacy }]);
      setShowOptionsModal(false);
      toast.success(`"${selectedMovie.Title}" added to wishlist successfully.`);
    } catch (error) {
      console.error('Error storing movie details:', error);
      toast.error('Failed to add movie to wishlist.');
    }
  };

  const handleSearch = async (results) => {
    if (results.length > 0) {
      setSearchResults(results);
      setSearchInitiated(true);
    } else {
      setSearchResults([]);
      setSearchInitiated(true);
    }
  };

  const handleBackToHome = () => {
    setSearchInitiated(false);
    setSearchResults([]);
    navigate('/');
  };

  return (
    <div className={`home ${theme}`}>
      {!searchInitiated && <Search setSearchResults={handleSearch} />}
      <div className={`search-results-container ${searchInitiated ? 'initiated' : ''}`}>
        {searchInitiated && searchResults.length === 0 && (
          <div className="no-results-message">
            No movies found.
          </div>
        )}
        <h2>Search Movies</h2>
        <div className="search-results">
          {searchResults.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img
                src={movie.Poster === 'N/A' ? 'https://via.placeholder.com/200x300' : movie.Poster}
                alt={movie.Title}
                className="movie-poster"
                onClick={() => handleImageClick(movie.imdbID)}
              />
              <div className="movie-info">
                <div className="movie-title">{movie.Title}</div>
                <div className="movie-year">{movie.Year}</div>
              </div>
              <button onClick={() => handleAddToWishlist(movie)}>Add to Wishlist</button>
            </div>
          ))}
        </div>

        {showMovieModal && (
          <MovieModal
            movie={selectedMovie}
            onClose={() => setShowMovieModal(false)}
          />
        )}

        {showOptionsModal && (
          <MovieOptionsModal
            movie={selectedMovie}
            onClose={() => setShowOptionsModal(false)}
            onSave={handleSaveOptions}
          />
        )}

        {searchInitiated && (
          <button onClick={handleBackToHome} className="back-button">
            &larr; Back to Home
          </button>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default Home;
