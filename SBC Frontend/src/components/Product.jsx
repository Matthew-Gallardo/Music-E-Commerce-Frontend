import React from "react";
import { Link } from "react-router-dom";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import styled from "styled-components";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const TextContainer = styled.div`
  text-align: center;
  padding: 10px;
`;

const Title = styled.h3`
  font-size: 18px;
  color: #333;
`;

const Artist = styled.p`
  font-size: 14px;
  color: #777;
`;
const Price = styled.p`
  font-size: 16px;
  color: #333;
  font-weight: bold;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  return (
    <Link
      to={`/product/${item.albumId}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Container>
        <Circle />
        <Image src={item.albumImage} alt={item.albumName} />
        <TextContainer>
          <Title>{item.albumName}</Title>
          <Artist>
            {item.artist ? item.artist.artistName : "Unknown Artist"}
          </Artist>
          <Price>₱{item.albumPrice.toFixed(2)}</Price>
        </TextContainer>
        <Info>
          <Icon>
            <ShoppingCartOutlined />
          </Icon>
          <Icon>
            <SearchOutlined />
          </Icon>
        </Info>
      </Container>
    </Link>
  );
};

export default Product;
