import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  background-color: #2c3b55;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.img`
 width: 150px;
`;
const Desc = styled.p`
  margin: 20px 0px;
  color: #EFF1F4;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  color: #EFF1F4;
`;

const Title = styled.h3`
  margin-bottom: 30px;
  color: #CAFFB9;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
   color: #EFF1F4;
`;
const Payment = styled.img`
  margin-top: -20px;
  width: 20%;
  height: auto;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo
          src="https://res.cloudinary.com/do3op0083/image/upload/v1732948213/sbcmusic/zcxlg1pefbdvy86tetgt.jpg"
          alt="SBC Music Logo"
        />
        <Desc>
          Your one-stop destination for all your music needs. Follow us on
          social media for the latest updates and offers.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Genres</ListItem>
          <ListItem>Top Hits</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px",color: "white" }} /> Keyland Arnaiz Building, 849
          Antonio Arnaiz Ave, Legazpi Village, Makati, Metro Manila
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px",color: "white" }} /> +1 234 56 78
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px",color: "white" }} />{" "}
          MGallardo@securitybank.com.ph
        </ContactItem>
        <Payment src="https://res.cloudinary.com/do3op0083/image/upload/f_auto,q_auto/v1/SBC%20Capstone/stripe" />
      </Right>
    </Container>
  );
};

export default Footer;
