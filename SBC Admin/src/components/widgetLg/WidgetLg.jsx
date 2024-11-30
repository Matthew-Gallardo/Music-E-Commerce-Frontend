import "./widgetLg.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function WidgetLg() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get("/musictest/album/all");
        setAlbums(response.data);
      } catch (error) {
        console.error("Error fetching album data:", error);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Newly Created Albums</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Album</th>
            <th className="widgetLgTh">Artist</th>
            <th className="widgetLgTh">Genre</th>
            <th className="widgetLgTh">Price</th>
            <th className="widgetLgTh">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {albums.map((album) => (
            <tr className="widgetLgTr" key={album.albumId}>
              <td className="widgetLgUser">
                <img src={album.albumImage} alt="" className="widgetLgImg" />
                <span className="widgetLgName">{album.albumName}</span>
              </td>
              <td className="widgetLgArtist">{album.artist.artistName}</td>
              <td className="widgetLgGenre">{album.genre.genreName}</td>
              <td className="widgetLgPrice">₱{album.albumPrice.toFixed(2)}</td>
              <td className="widgetLgQty">{album.albumQty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}