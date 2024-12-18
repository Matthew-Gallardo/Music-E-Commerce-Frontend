import { Send } from "@mui/icons-material";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useState } from "react";

const Container = styled.div`
  height: 40vh;
  background-color: #2C3B55;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  color:#CAFFB9;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  color: white;
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleClick = () => {
    if (email) {
      Swal.fire({
        title: 'Success!',
        text: 'You have been subscribed to the newsletter.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter a valid email address.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <Container>
      <Title>You deserve better</Title>
      <Desc>Get updates on our products, promos, events and more!</Desc>
      <InputContainer>
        <Input 
          placeholder="Your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleClick}>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;