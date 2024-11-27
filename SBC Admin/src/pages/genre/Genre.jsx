import { Link } from "react-router-dom";
import "./genre.css";
import { Publish } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Genre() {
  const { genreId } = useParams();
  const [genre, setGenre] = useState({});
  const [genreName, setGenreName] = useState("");
  const [genreDesc, setGenreDesc] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/musictest/genre/${genreId}`)
      .then((response) => response.json())
      .then((data) => {
        setGenre(data);
        setGenreName(data.genreName);
        setGenreDesc(data.genreDesc);
      })
      .catch((error) => console.error("Error fetching genre data:", error));
  }, [genreId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedGenre = { genreName, genreDesc };

    try {
      const response = await fetch(`/musictest/genre/update/${genreId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGenre),
      });

      if (response.ok) {
        console.log("Genre updated successfully");
        navigate("/genre");
      } else {
        console.error("Error updating genre");
      }
    } catch (error) {
      console.error("Error updating genre:", error);
    }
  };

  return (
    <div className="genre">
      <div className="genreTitleContainer">
        <h1 className="genreTitle">Genre</h1>
      </div>
      <div className="genreTop">
        <div className="genreTopRight">

          <div className="genreInfoBottom">
            <div className="genreInfoItem">
              <span className="genreInfoKey">ID:</span>
              <span className="genreInfoValue">{genre.genreId}</span>
            </div>
            <div className="genreInfoItem">
              <span className="genreInfoKey">Description:</span>
              <span className="genreInfoValue">{genre.genreDesc}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="genreBottom">
        <form className="genreForm" onSubmit={handleUpdate}>
          <div className="genreFormLeft">
            <label>Genre Name</label>
            <input
              type="text"
              value={genreName}
              onChange={(e) => setGenreName(e.target.value)}
            />
            <label>Genre Description</label>
            <input
              type="text"
              value={genreDesc}
              onChange={(e) => setGenreDesc(e.target.value)}
            />
          </div>
          <div className="genreFormRight">
            <button className="genreButton" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}