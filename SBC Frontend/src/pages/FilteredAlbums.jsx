import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ShoppingCartOutlined, SearchOutlined } from "@mui/icons-material";
import Footer from "../components/Footer";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const AlbumContainer = styled.div`
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

const AlbumTitle = styled.h3`
  font-size: 18px;
  color: #333;
`;

const Artist = styled.p`
  font-size: 14px;
  color: #777;
`;

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

  &:hover {
    opacity: 1;
  }
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

const FilteredAlbums = ({ type }) => {
  const { id } = useParams();
  const [albums, setAlbums] = useState([]);
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`/musictest/album/${type}/${id}`);
        setAlbums(response.data);
      } catch (err) {
        console.error("Error fetching albums", err);
        setAlbums([]);
      }
    };

    const fetchFilterName = async () => {
      try {
        const response = await axios.get(`/musictest/${type}/${id}`);
        setFilterName(response.data[`${type}Name`]);
      } catch (err) {
        console.error(`Error fetching ${type} name`, err);
        setFilterName("");
      }
    };

    fetchAlbums();
    fetchFilterName();
  }, [type, id]);

  return (
    <>
    <Container>
      <Title>Albums {type === "genre" ? `in ${filterName}` : `by ${filterName}`}</Title>
      {Array.isArray(albums) && albums.length > 0 ? (
        albums.map((album) => (
          <Link to={`/product/${album.albumId}`} key={album.albumId}>
            <AlbumContainer>
              <Circle />
              <Image src={album.albumImage} alt={album.albumName} />
              <TextContainer>
                <AlbumTitle>{album.albumName}</AlbumTitle>
                <Artist>{album.artist ? album.artist.artistName : "Unknown Artist"}</Artist>
              </TextContainer>
              <Info>
                <Icon>
                  <ShoppingCartOutlined />
                </Icon>
                <Icon>
                  <SearchOutlined />
                </Icon>
              </Info>
            </AlbumContainer>
          </Link>
        ))
      ) : (
        <p>No albums found.</p>
      )}
    
    </Container>
      <Footer/>
      </>
  );
};

export default FilteredAlbums;