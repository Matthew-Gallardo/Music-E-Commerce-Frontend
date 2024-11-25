import React from "react";
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
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TrackName = styled.span`
  flex: 1;
`;

const AudioPlayer = styled.audio`
  flex: 1;
  margin-left: 10px;
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
  const tracks = [
    { name: "Wesley's Theory", audio: "https://res.cloudinary.com/do3op0083/video/upload/f_auto:video,q_auto/v1/SBC%20Capstone/songs/tfab/falelsxfbih0czyadnbb" },
    { name: "For Free? (Interlude)", audio: "https://res.cloudinary.com/do3op0083/video/upload/f_auto:video,q_auto/v1/SBC%20Capstone/songs/tfab/falelsxfbih0czyadnbb" },
    { name: "King Kunta", audio: "https://res.cloudinary.com/do3op0083/video/upload/f_auto:video,q_auto/v1/SBC%20Capstone/songs/tfab/falelsxfbih0czyadnbb3" },
    { name: "Institutionalized", audio: "https://res.cloudinary.com/do3op0083/video/upload/f_auto:video,q_auto/v1/SBC%20Capstone/songs/tfab/falelsxfbih0czyadnbb" },
    { name: "These Walls", audio: "https://res.cloudinary.com/do3op0083/video/upload/f_auto:video,q_auto/v1/SBC%20Capstone/songs/tfab/falelsxfbih0czyadnbb" },
    { name: "u", audio: "https://res.cloudinary.com/do3op0083/video/upload/f_auto:video,q_auto/v1/SBC%20Capstone/songs/tfab/falelsxfbih0czyadnbb" },
    { name: "Alright", audio: "https://res.cloudinary.com/do3op0083/video/upload/f_auto:video,q_auto/v1/SBC%20Capstone/songs/tfab/falelsxfbih0czyadnbb" },
    { name: "For Sale? (Interlude)", audio: "https://res.cloudinary.com/do3op0083/video/upload/f_auto:video,q_auto/v1/SBC%20Capstone/songs/tfab/falelsxfbih0czyadnbb" },
    { name: "Momma", audio: "https://res.cloudinary.com/do3op0083/video/upload/f_auto:video,q_auto/v1/SBC%20Capstone/songs/tfab/falelsxfbih0czyadnbb" },
    { name: "You Ain't Gotta Lie (Momma Said)", audio: "https://res.cloudinary.com/do3op0083/video/upload/f_auto:video,q_auto/v1/SBC%20Capstone/songs/tfab/falelsxfbih0czyadnbb" },
  ];

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
            {tracks.map((track, index) => (
              <Track key={index}>
                <TrackName>{`${index + 1}. ${track.name}`}</TrackName>
                <AudioPlayer controls>
                  <source src={track.audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </AudioPlayer>
              </Track>
            ))}
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
