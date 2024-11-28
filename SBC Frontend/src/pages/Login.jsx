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

const Select = styled.select`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Option = styled.option`
  padding: 10px;
`;

const Login = ({ onLogin }) => {
  const [error, setError] = useState(null);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [securityForm, setSecurityForm] = useState({
    username: "",
    securityQuestion: "",
    securityAnswer: ""
  });
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

  const handleForgotPasswordChange = (e) => {
    setSecurityForm({ ...securityForm, [e.target.name]: e.target.value });
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/musictest/user/forgot-password", securityForm);
      if (response.data) {
        onLogin(true);
        alert("Validation successful");
        navigate("/");
      } else {
        alert("Validation failed");
      }
    } catch (err) {
      console.error("Error during validation", err);
      alert("An error occurred during validation");
    }
  };

  return (
    <>
      <Announcement />
      <Container>
        <Wrapper>
          <Title>{forgotPassword ? "FORGOT PASSWORD" : "LOGIN"}</Title>
          {forgotPassword ? (
            <Form onSubmit={handleForgotPasswordSubmit}>
              <Input
                name="username"
                placeholder="Username"
                onChange={handleForgotPasswordChange}
              />
              <Select
                name="securityQuestion"
                value={securityForm.securityQuestion}
                onChange={handleForgotPasswordChange}
              >
                <Option value="" disabled>
                  Select a security question
                </Option>
                <Option value="What is your pet's name?">
                  What is your pet's name?
                </Option>
                <Option value="What is your mother's maiden name?">
                  What is your mother's maiden name?
                </Option>
                <Option value="What was the name of your first school?">
                  What was the name of your first school?
                </Option>
                <Option value="What is your favorite food?">
                  What is your favorite food?
                </Option>
              </Select>
              <Input
                name="securityAnswer"
                placeholder="Answer"
                onChange={handleForgotPasswordChange}
              />
              <Button type="submit">VALIDATE</Button>
            </Form>
          ) : (
            <Form onSubmit={handleLogin}>
              <Input name="username" placeholder="Username" />
              <Input name="password" type="password" placeholder="Password" />
              <Button type="submit">LOGIN</Button>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <Link onClick={() => setForgotPassword(true)}>FORGOT PASSWORD?</Link>
            </Form>
          )}
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Login;