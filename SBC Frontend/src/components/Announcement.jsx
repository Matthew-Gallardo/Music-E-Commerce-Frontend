import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #CAFFB9;
  color: #2C3B55;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
`;

const Announcement = () => {
  return <Container>Black Friday Sale! Up to 50% off on all items! Don't miss out!</Container>;
};

export default Announcement;
