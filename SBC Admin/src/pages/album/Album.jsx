import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './album.css';

export default function Album() {
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
  const [newImageUploaded, setNewImageUploaded] = useState(false);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const response = await axios.get(`/musictest/album/${albumId}`);
        const albumData = response.data;
        setAlbum({
          albumName: albumData.albumName,
          albumImage: albumData.albumImage,
          albumDesc: albumData.albumDesc,
          albumPrice: albumData.albumPrice,
          albumQty: albumData.albumQty,
          artistId: albumData.artist.artistId,
          genreId: albumData.genre.genreId
        });
      } catch (error) {
        console.error('Error fetching album details:', error);
      }
    };

    const fetchArtistsAndGenres = async () => {
      try {
        const [artistsResponse, genresResponse] = await Promise.all([
          axios.get('/musictest/artist/all'),
          axios.get('/musictest/genre/all')
        ]);
        setArtists(artistsResponse.data);
        setGenres(genresResponse.data);
      } catch (error) {
        console.error('Error fetching artists and genres:', error);
      }
    };

    fetchAlbumDetails();
    fetchArtistsAndGenres();
  }, [albumId]);

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
        setNewImageUploaded(true);
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
      }
    }
  };

  const updateAlbum = async () => {
    try {
      const updatedAlbum = { ...album };
      if (!newImageUploaded) {
        updatedAlbum.albumImage = album.albumImage; 
      }
      console.log('Updating album with data:', updatedAlbum);
      console.log('Album ID:', albumId);
      const response = await axios.put(`/musictest/album/update/${albumId}`, updatedAlbum);
      console.log('Update response:', response);
      alert('Album updated successfully');
    } catch (error) {
      console.error('Error updating album:', error);
      alert('Failed to update album');
    }
  };

  return (
    <div className="product">
      <form className="productForm">
        <div className="productFormLeft">
          <label>Image</label>
          <input type="file" id="file" onChange={handleFileChange} />
          {album.albumImage && <img src={album.albumImage} alt="Album" className="productUploadImg" />}
          <label>Name</label>
          <input type="text" name="albumName" placeholder="Album Name" value={album.albumName} onChange={handleChange} />
          <label>Desc</label>
          <input type="text" name="albumDesc" placeholder="Album Description" value={album.albumDesc} onChange={handleChange} />
          <label>Price</label>
          <input type="number" name="albumPrice" placeholder="Album Price" value={album.albumPrice} onChange={handleChange} />
          <label>Quantity</label>
          <input type="number" name="albumQty" placeholder="Album Quantity" value={album.albumQty} onChange={handleChange} />
          <label>Artist</label>
          <select name="artistId" value={album.artistId} onChange={handleChange}>
            <option value="">Select Artist</option>
            {artists.map(artist => (
              <option key={artist.artistId} value={artist.artistId}>{artist.artistName}</option>
            ))}
          </select>
          <label>Genre</label>
          <select name="genreId" value={album.genreId} onChange={handleChange}>
            <option value="">Select Genre</option>
            {genres.map(genre => (
              <option key={genre.genreId} value={genre.genreId}>{genre.genreName}</option>
            ))}
          </select>
        </div>
        <div className="productFormRight">
          <button type="button" className="productButton" onClick={updateAlbum}>Update Album</button>
        </div>
      </form>
    </div>
  );
}