import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const AlbumList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Album = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  width: 200px;
`;

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`/musictest/album/search?query=${query}`);
        setAlbums(response.data);
      } catch (err) {
        console.error("Error fetching albums", err);
      }
    };

    if (query) {
      fetchAlbums();
    }
  }, [query]);

  return (
    <Container>
      <Title>Search Results for "{query}"</Title>
      <AlbumList>
        {albums.map((album) => (
          <Album key={album.id}>
            <h2>{album.albumName}</h2>
            <p>{album.artist.artistName}</p>
          </Album>
        ))}
      </AlbumList>
    </Container>
  );
};

export default Search;