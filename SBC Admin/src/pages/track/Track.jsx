import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './track.css';

export default function Track() {
  const { trackId } = useParams();
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [track, setTrack] = useState({
    trackName: '',
    trackMusic: '',
    albumId: '',
    artistId: ''
  });
  const [newMusicUploaded, setNewMusicUploaded] = useState(false);

  const fetchTrackDetails = async (trackId) => {
    try {
      const response = await axios.get(`/musictest/track/${trackId}`);
      const trackData = response.data;
      setTrack({
        trackName: trackData.trackName,
        trackMusic: trackData.trackMusic,
        trackPrice: trackData.trackPrice,
        albumId: trackData.album ? trackData.album.albumId : null,
        artistId: trackData.artist.artistId
      });
    } catch (error) {
      console.error('Error fetching track details:', error);
    }
  };

  useEffect(() => {
    fetchTrackDetails(trackId);

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
  }, [trackId]);

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
      formData.append('folder', 'sbcmusic/track/music'); 

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/do3op0083/video/upload', formData);
        setTrack(prevState => ({
          ...prevState,
          trackMusic: response.data.secure_url
        }));
        setNewMusicUploaded(true);
      } catch (error) {
        console.error('Error uploading music to Cloudinary:', error);
      }
    }
  };

  const updateTrack = async () => {
    try {
      const updatedTrack = { ...track };
      if (!newMusicUploaded) {
        updatedTrack.trackMusic = track.trackMusic; 
      }
      console.log('Updating track with data:', updatedTrack);
      console.log('Track ID:', trackId);
      const response = await axios.put(`/musictest/track/update/${trackId}`, updatedTrack);
      console.log('Update response:', response.data); // Log the response data
      if (response.status === 200) {
        alert('Track updated successfully');
        history.push('/tracks'); // Redirect to the list of tracks
      } else {
        alert('Failed to update track');
      }
    } catch (error) {
      console.error('Error updating track:', error);
      alert('Failed to update track');
    }
  };

  return (
    <div className="product">
      <form className="productForm">
        <div className="productFormLeft">
          <label>Name</label>
          <input type="text" name="trackName" placeholder="Track Name" value={track.trackName} onChange={handleChange} />
          <label>Music</label>
          <input type="file" id="file" accept="audio/*" onChange={handleFileChange} />
          {track.trackMusic && <audio controls src={track.trackMusic} />}
          <label>Album</label>
          <select name="albumId" value={track.albumId} onChange={handleChange}>
            <option value="">Select Album</option>
            {albums.map(album => (
              <option key={album.albumId} value={album.albumId}>{album.albumName}</option>
            ))}
          </select>
          <label>Artist</label>
          <select name="artistId" value={track.artistId} onChange={handleChange}>
            <option value="">Select Artist</option>
            {artists.map(artist => (
              <option key={artist.artistId} value={artist.artistId}>{artist.artistName}</option>
            ))}
          </select>
        </div>
        <div className="productFormRight">
          <button type="button" className="productButton" onClick={updateTrack}>Update Track</button>
        </div>
      </form>
    </div>
  );
}