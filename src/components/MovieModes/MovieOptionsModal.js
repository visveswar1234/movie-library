import React, { useState } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MovieOptionsModal.css';

const MovieOptionsModal = ({ movie, onClose, isOpen }) => {
  const [privacy, setPrivacy] = useState('public');

  const handleSave = async () => {
    try {
      const response = await Axios.post('http://localhost:5001/options', {
        title: movie.Title,
        option: privacy,
      });
      console.log(response.data); 
      onClose();
      toast.success(`"${movie.Title}" saved successfully.`);
    } catch (error) {
      console.error('Error saving options:', error);
      toast.error('Failed to save options.');
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      {isOpen && <div className="modal-background"></div>}
      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <button className="close" onClick={handleClose}>
            &times;
          </button>
          <h2>{movie.Title}</h2>
          <div className="movie-details">
            <div className="movie-image">
              <img
                src={
                  movie.Poster === 'N/A'
                    ? 'https://via.placeholder.com/200x300'
                    : movie.Poster
                }
                alt={movie.Title}
              />
            </div>
            <div className="options">
              <button
                className={`playlist-option ${privacy === 'public' ? 'selected' : ''}`}
                onClick={() => setPrivacy('public')}
              >
                Public
                {privacy === 'public' && <span className="tick">&#10003;</span>}
              </button>
              <button
                className={`playlist-option ${privacy === 'private' ? 'selected' : ''}`}
                onClick={() => setPrivacy('private')}
              >
                Private
                {privacy === 'private' && <span className="tick">&#10003;</span>}
              </button>
              <button className="save-button" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieOptionsModal;
