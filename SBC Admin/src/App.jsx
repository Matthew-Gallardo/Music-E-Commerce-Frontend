import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import AlbumList from "./pages/albumList/AlbumList";
import Album from "./pages/album/Album";
import NewAlbum from "./pages/newAlbum/NewAlbum";
import Genre from "./pages/genre/Genre";
import GenreList from "./pages/genreList/genreList";
import NewGenre from "./pages/newGenre/NewGenre";
import Artist from "./pages/artist/Artist";
import ArtistList from "./pages/artistList/ArtistList";
import NewArtist from "./pages/newArtist/newArtist";
import Track from "./pages/track/Track"
import TrackList from "./pages/trackList/TrackList";
import NewTrack from "./pages/newTrack/newTrack";
import CartList from "./pages/cartList/cartList";
import TransactionList from "./pages/transactionList/TransactionList";



function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/user/:userId" element={<User />} />
          <Route path="/newUser" element={<NewUser />} />
          <Route path="/albums" element={<AlbumList />} />
          <Route path="/album/:albumId" element={<Album />} />
          <Route path="/newalbum" element={<NewAlbum />} />
          <Route path="/genre" element={<GenreList />} />
          <Route path="/genre/:genreId" element={<Genre />} />
          <Route path="/newgenre" element={<NewGenre />} />
          <Route path="/artist/:artistId" element={<Artist />} />
          <Route path="/artist" element={<ArtistList />} />
          <Route path="/newartist" element={<NewArtist />} />
          <Route path="/track/:trackId" element={<Track/>} />
          <Route path="/tracks" element={<TrackList />} />
          <Route path="/newtrack" element={<NewTrack />} />
          <Route path="/carts" element={<CartList />} />
          <Route path="/transactions" element={<TransactionList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
