import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Artist.css'; // Make sure to import the CSS file

const Artist = () => {
  const { artistId } = useParams();
  const [artistName, setArtistName] = useState("");
  const [artistNumber, setArtistNumber] = useState("");
  const [artistEmail, setArtistEmail] = useState("");
  const [artistLocation, setArtistLocation] = useState("");

  useEffect(() => {
    if (artistId) {
      fetch(`/musictest/artist/${artistId}`)
        .then((response) => response.json())
        .then((data) => {
          setArtistName(data.artistName || "");
          setArtistNumber(data.artistNumber || "");
          setArtistEmail(data.artistEmail || "");
          setArtistLocation(data.artistLocation || "");
        })
        .catch((error) => console.error("Error fetching artist data:", error));
    }
  }, [artistId]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedArtist = {
      artistName,
      artistNumber,
      artistEmail,
      artistLocation,
    };

    fetch(`/musictest/artist/update/${artistId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedArtist),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Artist updated successfully:', data);
      })
      .catch((error) => {
        console.error('Error updating artist:', error);
      });
  };

  return (
    <div className="artist">
      <div className="artistTitleContainer">
        <h1 className="artistUpdateTitle">Edit Artist</h1>
        <button className="artistAddButton">Create</button>
      </div>
      <div className="artistContainer">
        <div className="artistShow">
          <div className="artistShowTop">
            <div className="artistShowTopTitle">
              <span className="artistShowartistname">{artistName}</span>
              <span className="artistShowartistTitle">Artist</span>
            </div>
          </div>
          <div className="artistShowBottom">
            <span className="artistShowTitle">Account Details</span>
            <div className="artistShowInfo">
              <span className="artistShowInfoTitle">{artistNumber}</span>
            </div>
            <div className="artistShowInfo">
              <span className="artistShowInfoTitle">{artistEmail}</span>
            </div>
            <div className="artistShowInfo">
              <span className="artistShowInfoTitle">{artistLocation}</span>
            </div>
          </div>
        </div>
        <div className="artistUpdate">
          <span className="artistUpdateTitle">Edit</span>
          <form className="artistUpdateForm" onSubmit={handleUpdate}>
            <div className="artistUpdateLeft">
              <div className="artistUpdateItem">
                <label>Name</label>
                <input
                  type="text"
                  className="artistUpdateInput"
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                />
              </div>
              <div className="artistUpdateItem">
                <label>Number</label>
                <input
                  type="text"
                  className="artistUpdateInput"
                  value={artistNumber}
                  onChange={(e) => setArtistNumber(e.target.value)}
                />
              </div>
              <div className="artistUpdateItem">
                <label>Email</label>
                <input
                  type="email"
                  className="artistUpdateInput"
                  value={artistEmail}
                  onChange={(e) => setArtistEmail(e.target.value)}
                />
              </div>
              <div className="artistUpdateItem">
                <label>Location</label>
                <input
                  type="text"
                  className="artistUpdateInput"
                  value={artistLocation}
                  onChange={(e) => setArtistLocation(e.target.value)}
                />
              </div>
            </div>
            <div className="artistUpdateRight">
              <div className="artistUpdateUpload">
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="artistUpdateButton" type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Artist;