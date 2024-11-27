import "./newGenre.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewGenre() {
  const [genreName, setGenreName] = useState("");
  const [genreDesc, setGenreDesc] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newGenre = { genreName, genreDesc };

    try {
      const response = await fetch("/musictest/genre/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGenre),
      });

      if (response.ok) {
        console.log("Genre created successfully");
        navigate("/genre");
      } else {
        console.error("Error creating genre");
      }
    } catch (error) {
      console.error("Error creating genre:", error);
    }
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Genre</h1>
      <form className="addProductForm" onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Name</label>
          <input
            type="text"
            placeholder="Genre Name"
            value={genreName}
            onChange={(e) => setGenreName(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="Genre Description"
            value={genreDesc}
            onChange={(e) => setGenreDesc(e.target.value)}
          />
        </div>
        <button className="addProductButton" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}