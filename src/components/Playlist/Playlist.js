import React, { useState, useEffect, lazy, Suspense } from 'react';
import movieData from '../../Data/movieData';
import './Playlist.css';
import debounce from 'lodash/debounce';
import OverlayDetails from '../Details/OverlayDetails';

const PlaylistCard = lazy(() => import('../MovieCard/PlaylistCard'));

const Playlist = () => {
  const [publicPlaylists, setPublicPlaylists] = useState([]);
  const [privatePlaylists, setPrivatePlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const username = sessionStorage.getItem('username');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = debounce(async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const publicLists = movieData.filter((item) => item.wishlist === 'public');
      const privateLists = movieData.filter(
        (item) => item.wishlist === 'private' && item.username === username
      );
      setPublicPlaylists(publicLists);
      setPrivatePlaylists(privateLists);
    } catch (error) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, 300);

  const filteredPublicPlaylists = publicPlaylists.filter((playlist) =>
    playlist.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPrivatePlaylists = privatePlaylists.filter((playlist) =>
    playlist.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={`playlist-page ${selectedItem ? 'blurred' : ''}`}>
        <h2>Playlist Page</h2>
        <div className="search-container">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Search by movie name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        {loading ? (
          <div className="loading">
            <div className="skeleton-card" />
            <div className="skeleton-card" />
            <div className="skeleton-card" />
          </div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <div className="playlist-section">
              <h3>Public Playlists</h3>
              <div className="playlist-cards">
                {filteredPublicPlaylists.length > 0 ? (
                  filteredPublicPlaylists.map((item) => (
                    <PlaylistCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                  ))
                ) : (
                  <div>No public playlists found.</div>
                )}
              </div>
            </div>
            {isLoggedIn && (
              <div className="playlist-section">
                <h3>Private Playlists</h3>
                <div className="playlist-cards">
                  {filteredPrivatePlaylists.length > 0 ? (
                    filteredPrivatePlaylists.map((item) => (
                      <PlaylistCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                    ))
                  ) : (
                    <div>No private playlists found.</div>
                  )}
                </div>
              </div>
            )}
          </Suspense>
        )}
      </div>
      {selectedItem && (
        <OverlayDetails
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </>
  );
};

export default Playlist;
