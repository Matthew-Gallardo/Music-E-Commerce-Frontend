import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 50%;
  padding: 20px;
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
  const [form, setForm] = useState({
    userFirstname: "",
    userLastname: "",
    userEmail: "",
    userMobile: "",
    userStreet: "",
    userCity: "",
    userState: "",
    userZipcode: "",
    userCountry: "",
    userBillingAddress: "",
    userShippingAddress: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", form);
    try {
      const response = await axios.post("/musictest/profile/add", form);
      if (response.status === 200) {
        alert("User profile added successfully.");
      } else {
        alert("Error adding user profile.");
      }
    } catch (err) {
      console.error("Error adding user profile", err);
      if (err.response) {
        console.error("Response data:", err.response.data); // Log response data
      }
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <Announcement />
      <Container>
        <Wrapper>
          <Title>User Profile</Title>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="userFirstname"
              value={form.userFirstname}
              onChange={handleChange}
              placeholder="First Name"
            />
            <Input
              type="text"
              name="userLastname"
              value={form.userLastname}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <Input
              type="email"
              name="userEmail"
              value={form.userEmail}
              onChange={handleChange}
              placeholder="Email"
            />
            <Input
              type="text"
              name="userMobile"
              value={form.userMobile}
              onChange={handleChange}
              placeholder="Mobile"
            />
            <Input
              type="text"
              name="userStreet"
              value={form.userStreet}
              onChange={handleChange}
              placeholder="Street"
            />
            <Input
              type="text"
              name="userCity"
              value={form.userCity}
              onChange={handleChange}
              placeholder="City"
            />
            <Input
              type="text"
              name="userState"
              value={form.userState}
              onChange={handleChange}
              placeholder="State"
            />
            <Input
              type="text"
              name="userZipcode"
              value={form.userZipcode}
              onChange={handleChange}
              placeholder="Zipcode"
            />
            <Input
              type="text"
              name="userCountry"
              value={form.userCountry}
              onChange={handleChange}
              placeholder="Country"
            />
            <Input
              type="text"
              name="userBillingAddress"
              value={form.userBillingAddress}
              onChange={handleChange}
              placeholder="Billing Address"
            />
            <Input
              type="text"
              name="userShippingAddress"
              value={form.userShippingAddress}
              onChange={handleChange}
              placeholder="Shipping Address"
            />
            <ButtonContainer>
              <Button type="submit">Submit</Button>
            </ButtonContainer>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;