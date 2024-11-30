import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Products from "../components/Products"; 
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";

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

const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
`;

const MainContent = styled.div`
  padding: 20px;
`;

const FilterContainer = styled.div`
  margin: 20px;
  align-self: flex-end;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;

const Option = styled.option``;

const Home = () => {
  const [sortOrder, setSortOrder] = useState("");

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <Container>
        <Announcement/>
      <ContentWrapper>
        <Sidebar />
        <MainContentWrapper>
          <FilterContainer>
            <Select onChange={handleSortChange} value={sortOrder}>
              <Option value="">Sort by</Option>
              <Option value="asc">Price (asc)</Option>
              <Option value="desc">Price (desc)</Option>
            </Select>
          </FilterContainer>
          <MainContent>
            <Products sortOrder={sortOrder} />
          </MainContent>
        </MainContentWrapper>
      </ContentWrapper>
      <Footer />
    </Container>
  );
};

export default Home;