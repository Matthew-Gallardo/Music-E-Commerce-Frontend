import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './newAlbum.css';
import Swal from 'sweetalert2';

export default function NewAlbum() {
  const { albumId } = useParams();
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);
  const [album, setAlbum] = useState({
    albumName: '',
    albumImage: '',
    albumDesc: '',
    albumPrice: '',
    albumQty: '',
    artistId: '',
    genreId: ''
  });

  useEffect(() => {
    const fetchArtistsAndGenres = async () => {
      try {
        const [artistsResponse, genresResponse] = await Promise.all([
          axios.get('/musictest/artist/all'),
          axios.get('/musictest/genre/all')
        ]);
        setArtists(artistsResponse.data);
        setGenres(genresResponse.data);
      } catch (error) {
        console.error('Error fetching artists or genres:', error);
      }
    };

    fetchArtistsAndGenres();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbum(prevState => ({
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
      formData.append('folder', 'sbcmusic/album/img'); 

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/do3op0083/image/upload', formData);
        setAlbum(prevState => ({
          ...prevState,
          albumImage: response.data.secure_url
        }));
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/musictest/album/add', album);
      if (response.status === 200) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Album created successfully.',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error creating album.'
        });
      }
    } catch (err) {
      console.error('Error creating album', err);
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
      <h1 className="addProductTitle">New Album</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={handleFileChange} required />
          {album.albumImage && <img src={album.albumImage} alt="Album" className="productUploadImg" />}
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input type="text" name="albumName" placeholder="Album Name" value={album.albumName} onChange={handleChange} required />
        </div>
        <div className="addProductItem">
          <label>Desc</label>
          <input type="text" name="albumDesc" placeholder="Album Description" value={album.albumDesc} onChange={handleChange} required />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="number" name="albumPrice" placeholder="Album Price" value={album.albumPrice} onChange={handleChange} required />
        </div>
        <div className="addProductItem">
          <label>Quantity</label>
          <input type="number" name="albumQty" placeholder="Album Quantity" value={album.albumQty} onChange={handleChange} required />
        </div>
        <div className="addProductItem">
          <label>Artist</label>
          <select name="artistId" value={album.artistId} onChange={handleChange} required>
            <option value="">Select Artist</option>
            {artists.map(artist => (
              <option key={artist.artistId} value={artist.artistId}>{artist.artistName}</option>
            ))}
          </select>
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <select name="genreId" value={album.genreId} onChange={handleChange} required>
            <option value="">Select Genre</option>
            {genres.map(genre => (
              <option key={genre.genreId} value={genre.genreId}>{genre.genreName}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="addProductButton">Create</button>
      </form>
    </div>
  );
}