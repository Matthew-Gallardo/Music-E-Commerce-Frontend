import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 50%;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: teal;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: teal;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #004d4d;
  }
`;

const Profile = () => {
  return (
    <>
      <Navbar />
      <Announcement />
      <Container>
        <Wrapper>
          <Title>Manage Profile</Title>
          <Form>
            <div>Details:</div>
            <Input type="text" placeholder="First Name" />
            <Input type="text" placeholder="Last Name" />
            <Input type="text" placeholder="Telephone" />
            <Input type="email" placeholder="Email" />
            <div>Address:</div>
            <Input type="text" placeholder="Street Address" />
            <Input type="text" placeholder="City" />
            <Input type="text" placeholder="State" />
            <Input type="text" placeholder="ZIP Code" />
            <Input type="text" placeholder="Country" />
            <Input type="text" placeholder="Billing Address" />
            <Input type="text" placeholder="Shipping Address" />
            <ButtonContainer>
              <Button>Save Changes</Button>
            </ButtonContainer>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
