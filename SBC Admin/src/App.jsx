import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Genre from "./pages/genre/Genre";
import GenreList from "./pages/genreList/genreList";
import NewGenre from "./pages/newGenre/NewGenre";
import Artist from "./pages/artist/Artist";
import ArtistList from "./pages/artistList/ArtistList";
import NewArtist from "./pages/newArtist/newArtist";

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
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/genre" element={<GenreList />} />
          <Route path="/genre/:genreId" element={<Genre />} />
          <Route path="/newgenre" element={<NewGenre />} />
          <Route path="/artist/:artistId" element={<Artist />} />
          <Route path="/artist" element={<ArtistList />} />
          <Route path="/newartist" element={<NewArtist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
