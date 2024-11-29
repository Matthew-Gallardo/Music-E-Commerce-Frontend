import React, { useState } from "react";
import styled from "styled-components";
import { Badge, InputBase } from "@mui/material";
import { AccountCircleOutlined,Search, ShoppingCartOutlined } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  height: 60px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  width: 100%;
  justify-content: space-between;
`;

const Input = styled(InputBase)`
  border: none;
  width: 100%;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");

  const handleLogout = async () => {
    try {
      const response = await axios.post("/musictest/user/logout");
      if (response.status === 200) {
        setIsLoggedIn(false);
        navigate("/login");
      } else {
        alert("Error logging out. Please try again.");
      }
    } catch (err) {
      console.error("Error logging out", err);
      alert("An error occurred. Please try again.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?query=${searchInput}`);
    }
  };

  return (
    <Container>
      <Wrapper>
      <Left>
  <Logo onClick={() => navigate("/")}>Music App</Logo>
</Left>
<Center>
  {isLoggedIn && (
    <SearchContainer>
      <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Input
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" style={{ background: "none", border: "none", cursor: "pointer" }}>
          <Search style={{ color: "gray", fontSize: 16 }} />
        </button>
      </form>
    </SearchContainer>
          )}
        </Center>
        <Right>
          {!isLoggedIn && location.pathname !== '/register' && (
            <MenuItem onClick={() => navigate("/register")}>REGISTER</MenuItem>
          )}
          {!isLoggedIn && location.pathname === '/register' && (
            <MenuItem onClick={() => navigate("/login")}>LOGIN</MenuItem>
          )}
          {isLoggedIn && <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>}
          <MenuItem onClick={() => navigate("/cart")}>
            <Badge color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          <MenuItem onClick={() => navigate("/profile")}>
            <AccountCircleOutlined />
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;