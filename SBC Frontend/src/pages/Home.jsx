import React from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Products from "../components/Products"; 
import Footer from "../components/Footer";
import Slider from "../components/Slider";



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
      <Slider/>
      <ContentWrapper>
        <Sidebar /> 
        <MainContent>
          <Products /> 
        </MainContent>
      </ContentWrapper>
      <Footer /> 
    </Container>
  );
};

export default Home;
