import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Search from './pages/Search'; 
import FilteredAlbums from './pages/FilteredAlbums'; 
import Navbar from './components/Navbar';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/product/:id" element={isLoggedIn ? <Product /> : <Navigate to="/login" />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<Search />} /> 
        <Route path="/album/genre/:id" element={<FilteredAlbums type="genre" />} /> 
        <Route path="/album/artist/:id" element={<FilteredAlbums type="artist" />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;