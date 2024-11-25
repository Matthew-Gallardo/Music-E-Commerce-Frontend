import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import { useState } from "react";
import axios from "axios";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Select = styled.select`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Option = styled.option`
  font-size: 14px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "",
    securityAnswer: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/musictest/user/register", form);
      if (response.data) {
        alert("Registration successful");
      } else {
        alert("Registration failed");
      }
    } catch (err) {
      console.error("Error during registration", err);
      alert("An error occurred during registration");
    }
  };

  return (
    <>
    <Navbar/>
    <Announcement/>
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input name="username" placeholder="username" onChange={handleChange} />
          <Input name="email" placeholder="email" onChange={handleChange} />
          <Input name="password" placeholder="password" type="password" onChange={handleChange} />
          <Input name="confirmPassword" placeholder="confirm password" type="password" onChange={handleChange} />
          <Select name="securityQuestion" onChange={handleChange}>
            <Option disabled selected>
              Select a security question
            </Option>
            <Option>What is your pet's name?</Option>
            <Option>What is your mother's maiden name?</Option>
            <Option>What was the name of your first school?</Option>
            <Option>What is your favorite food?</Option>
          </Select>
          <Input name="securityAnswer" placeholder="Answer" onChange={handleChange} />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit">CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
    <Footer/>
    </>
  );
};

export default Register;
