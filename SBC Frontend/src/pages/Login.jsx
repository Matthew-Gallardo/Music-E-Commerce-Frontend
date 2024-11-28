import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import { useState } from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin: 10px 0;
`;

const Login = ({ onLogin }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    setError(null);

    try {
      const response = await axios.post(
        "/musictest/user/login", 
        { username, password },
        { withCredentials: true } 
      );
      if (response.status === 200) {
        onLogin(true);
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Announcement />
      <Container>
        <Wrapper>
          <Title>LOGIN</Title>
          <Form onSubmit={handleLogin}>
            <Input name="username" placeholder="Username" />
            <Input name="password" type="password" placeholder="Password" />
            <Button type="submit">LOGIN</Button>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Link>FORGOT PASSWORD?</Link>
            <Link>CREATE A NEW ACCOUNT</Link>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Login;