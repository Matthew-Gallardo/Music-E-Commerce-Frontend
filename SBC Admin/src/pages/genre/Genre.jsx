import { Link } from "react-router-dom";
import "./genre.css";

import { Publish } from "@mui/icons-material";

export default function Genre() {
  return (
    <div className="genre">
      <div className="genreTitleContainer">
        <h1 className="genreTitle">Genre</h1>
        <Link to="/newgenre">
          <button className="genreAddButton">Create</button>
        </Link>
      </div>
      <div className="genreTop">
        <div className="genreTopRight">
          <div className="genreInfoTop">
            <img
              src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="genreInfoImg"
            />
            <span className="genreName">Apple Airpods</span>
          </div>
          <div className="genreInfoBottom">
            <div className="genreInfoItem">
              <span className="genreInfoKey">id:</span>
              <span className="genreInfoValue">123</span>
            </div>
            <div className="genreInfoItem">
              <span className="genreInfoKey">desc:</span>
              <span className="genreInfoValue">Goated album</span>
            </div>
            <div className="genreInfoItem">
              <span className="genreInfoKey">genre:</span>
              <span className="genreInfoValue">Hip-hop</span>
            </div>
            <div className="genreInfoItem">
              <span className="genreInfoKey">sales:</span>
              <span className="genreInfoValue">5123</span>
            </div>
            <div className="genreInfoItem">
              <span className="genreInfoKey">active:</span>
              <span className="genreInfoValue">Yes</span>
            </div>
            <div className="genreInfoItem">
              <span className="genreInfoKey">in stock:</span>
              <span className="genreInfoValue">No</span>
            </div>
          </div>
        </div>
      </div>
      <div className="genreBottom">
        <form className="genreForm">
          <div className="genreFormLeft">
            <label>Genre Name</label>
            <input type="text" placeholder="Genre Name" />
            <label>Desc</label>
            <input type="text" placeholder="Description" />
            <label>Genre</label>
            <input type="text" placeholder="Genre" />
            <label>In Stock</label>
            <select name="inStock" id="idStock">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
            <label>Active</label>
            <select name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="genreFormRight">
            <div className="genreUpload">
              <img
                src="https://images.pexels.com/photos/7156886/pexels-photo-7156886.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="genreUploadImg"
              />
              <label htmlFor="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="genreButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
