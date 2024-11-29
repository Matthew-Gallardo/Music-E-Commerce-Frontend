import "./newArtist.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function NewArtist() {
  const [artistName, setArtistName] = useState("");
  const [artistNumber, setArtistNumber] = useState("");
  const [artistEmail, setArtistEmail] = useState("");
  const [artistLocation, setArtistLocation] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newArtist = { artistName, artistEmail, artistLocation };

    fetch("/musictest/artist/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newArtist),
    })
      .then((response) => {
        if (response.ok) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Created an Artist Record",
            showConfirmButton: false,
            timer: 1500
          });
          navigate("/artist");
        } else {
          console.error("Error creating artist:", response.statusText);
        }
      })
      .catch((error) => console.error("Error creating artist:", error));
  };


  return (
    <div className="newArtist">
      <h1 className="addArtistTitle">New Artist</h1>
      <form className="addArtistForm" onSubmit={handleSubmit}>
        <div className="addArtistItem">
          <label>Name</label>
          <input
            type="text"
            placeholder="Artist Name"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </div>
        <div className="addArtistItem">
          <label>Number</label>
          <input
            type="text"
            placeholder="Artist Number"
            value={artistNumber}
            onChange={(e) => setArtistNumber(e.target.value)}
          />
        </div>
        <div className="addArtistItem">
          <label>Email</label>
          <input
            type="email"
            placeholder="Artist Email"
            value={artistEmail}
            onChange={(e) => setArtistEmail(e.target.value)}
          />
        </div>
        <div className="addArtistItem">
          <label>Location</label>
          <input
            type="text"
            placeholder="Artist Location"
            value={artistLocation}
            onChange={(e) => setArtistLocation(e.target.value)}
          />
        </div>
        <button className="addArtistButton" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}