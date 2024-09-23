import React, { useState } from 'react';
import Axios from 'axios';
import { API_KEY } from '../../config';
import './Search.css';

function Search({ setSearchResults }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    if (query) {
      try {
        const response = await Axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
        console.log('Response from OMDB API:', response.data); 
        if (response.data.Response === "True") {
          setSearchResults(response.data.Search);
          setError('');
        } else {
          setSearchResults([]);
          setError(response.data.Error);
        }
      } catch (error) {
        console.error('Error fetching search results: ', error);
        setError('Failed to fetch search results.');
      }
    }
  };

  return (
    <div className="search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Search;
