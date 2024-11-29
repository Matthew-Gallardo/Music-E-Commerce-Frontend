import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 18%;
  background-color: #fcf5f5;
  padding: 10px;
  display: flex;
  flex-direction: column;
  height: 100vh; 
  position: sticky; 
  top: 0;
`;

const SectionTitle = styled.h3`
  margin-bottom: 20px;
  font-weight: bold;
`;

const GenreList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const GenreItem = styled.li`
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const Sidebar = () => {
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/musictest/genre/all')
      .then(response => response.json())
      .then(data => setGenres(data))
      .catch(error => console.error('Error fetching genres:', error));

    fetch('/musictest/artist/all')
      .then(response => response.json())
      .then(data => setArtists(data))
      .catch(error => console.error('Error fetching artists:', error));
  }, []);

  const handleGenreClick = (genreId) => {
    navigate(`/album/genre/${genreId}`);
  };

  const handleArtistClick = (artistId) => {
    navigate(`/album/artist/${artistId}`);
  };
  

  return (
    <Container>
      <SectionTitle>Genres</SectionTitle>
      <GenreList>
        {genres.map((genre) => (
          <GenreItem key={genre.genreId} onClick={() => handleGenreClick(genre.genreId)}>
            {genre.genreName}
          </GenreItem>
        ))}
      </GenreList>

      <SectionTitle>Artists</SectionTitle>
      <GenreList>
        {artists.map((artist) => (
          <GenreItem key={artist.artistId} onClick={() => handleArtistClick(artist.artistId)}>
            {artist.artistName}
          </GenreItem>
        ))}
      </GenreList>
    </Container>
  );
};

export default Sidebar;