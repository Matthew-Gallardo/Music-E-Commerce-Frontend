import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Artist = styled.h2`
  margin: 10px 0;
  font-weight: 300;
`;

const Genre = styled.span`
  font-size: 18px;
  color: gray;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const TracksContainer = styled.div`
  margin: 30px 0;
`;

const TracksTitle = styled.h3`
  font-weight: 500;
  margin-bottom: 10px;
`;

const Track = styled.div`
  margin: 5px 0;
  font-size: 16px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src="https://res.cloudinary.com/do3op0083/image/upload/v1732289023/SBC%20Capstone/Album%20Covers/kdot2.jpg" />
        </ImgContainer>
        <InfoContainer>
          <Title>To Pimp the Butterfly</Title>
          <Artist>Kendrick Lamar</Artist>
          <Genre>Hip-Hop</Genre>
          <Desc>Goated Hiphop Album</Desc>
          <Price>₱300.99</Price>
          <TracksContainer>
            <TracksTitle>Tracks:</TracksTitle>
            <Track>1. Wesley's Theory</Track>
            <Track>2. For Free? (Interlude)</Track>
            <Track>3. King Kunta</Track>
            <Track>4. Institutionalized</Track>
            <Track>5. These Walls</Track>
            <Track>6. u</Track>
            <Track>7. Alright</Track>
            <Track>8. For Sale? (Interlude)</Track>
            <Track>9. Momma</Track>
            <Track>10. You Ain't Gotta Lie (Momma Said)</Track>
          </TracksContainer>
          <AddContainer>
            <AmountContainer>
              <Remove />
              <Amount>1</Amount>
              <Add />
            </AmountContainer>
            <Button>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
