import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './newTrack.css';
import Swal from 'sweetalert2';

export default function NewTrack() {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [track, setTrack] = useState({
    trackName: '',
    trackMusic: '',
    albumId: '',
    artistId: ''
  });

  useEffect(() => {
    const fetchArtistsAndAlbums = async () => {
      try {
        const [artistsResponse, albumsResponse] = await Promise.all([
          axios.get('/musictest/artist/all'),
          axios.get('/musictest/album/all')
        ]);
        setArtists(artistsResponse.data);
        setAlbums(albumsResponse.data);
      } catch (error) {
        console.error('Error fetching artists and albums:', error);
      }
    };

    fetchArtistsAndAlbums();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrack(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'sbcmusic'); 
      formData.append('folder', 'sbcmusic/album/music'); 

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/do3op0083/video/upload', formData);
        setTrack(prevState => ({
          ...prevState,
          trackMusic: response.data.secure_url
        }));
      } catch (error) {
        console.error('Error uploading music to Cloudinary:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/musictest/track/add', track);
      if (response.status === 200) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Track created successfully",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error creating track.'
        });
      }
    } catch (err) {
      console.error('Error creating track', err);
      if (err.response) {
        console.error('Response data:', err.response.data);
      }
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred. Please try again.'
      });
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Track</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Name</label>
          <input type="text" name="trackName" placeholder="Track Name" value={track.trackName} onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Music</label>
          <input type="file" id="file" accept="audio/*" onChange={handleFileChange} />
          {track.trackMusic && <audio controls src={track.trackMusic} />}
        </div>
        <div className="addProductItem">
          <label>Album</label>
          <select name="albumId" value={track.albumId} onChange={handleChange}>
            <option value="">Select Album</option>
            {albums.map(album => (
              <option key={album.albumId} value={album.albumId}>{album.albumName}</option>
            ))}
          </select>
        </div>
        <div className="addProductItem">
          <label>Artist</label>
          <select name="artistId" value={track.artistId} onChange={handleChange}>
            <option value="">Select Artist</option>
            {artists.map(artist => (
              <option key={artist.artistId} value={artist.artistId}>{artist.artistName}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="addProductButton">Create</button>
      </form>
    </div>
  );
}