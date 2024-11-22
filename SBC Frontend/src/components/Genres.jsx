import styled from "styled-components";

const Container = styled.div`
  width: 20%;
  background-color: #f5f5f5;
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
  margin-bottom: 10px;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    color: #007bff;
    text-decoration: underline;
  }
`;

const Genres = () => {
  const genres = ["Pop", "Rock", "Jazz", "Hip-Hop", "Classical", "Electronic"];
  const topMusic = ["Song A", "Song B", "Song C", "Song D"];

  return (
    <Container>
      <SectionTitle>Genres</SectionTitle>
      <GenreList>
        {genres.map((genre, index) => (
          <GenreItem key={index}>{genre}</GenreItem>
        ))}
      </GenreList>

      <SectionTitle>Top Music</SectionTitle>
      <GenreList>
        {topMusic.map((music, index) => (
          <GenreItem key={index}>{music}</GenreItem>
        ))}
      </GenreList>
    </Container>
  );
};

export default Genres;
