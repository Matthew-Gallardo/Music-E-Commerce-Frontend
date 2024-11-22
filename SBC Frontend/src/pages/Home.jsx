import React from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Genres from "../components/Genres"; 
import Products from "../components/Products"; 
import Footer from "../components/Footer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1; 
`;

const MainContent = styled.div`
  flex: 4;
  padding: 20px;
`;

const Home = () => {
  return (
    <Container>
      <Announcement />
      <Navbar />
      <ContentWrapper>
        <Genres /> 
        <MainContent>
          <Products /> 
        </MainContent>
      </ContentWrapper>
      <Footer /> 
    </Container>
  );
};

export default Home;
