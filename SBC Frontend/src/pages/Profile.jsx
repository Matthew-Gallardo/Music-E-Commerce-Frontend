import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
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
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Profile = () => {
  const [user, setUser] = useState({
    userFirstname: '',
    userLastname: '',
    userEmail: '',
    userMobile: '',
    userStreet: '',
    userCity: '',
    userState: '',
    userZipcode: '',
    userCountry: '',
    userBillingAddress: '',
    userShippingAddress: ''
  });

  useEffect(() => {
    axios.get('/musictest/profile', { withCredentials: true })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user profile!', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('/musictest/profile/update', user, { withCredentials: true })
      .then(response => {
        alert('Profile updated successfully');
      })
      .catch(error => {
        console.error('There was an error updating the profile!', error);
      });
  };

  return (
    <Container>
      <h1>Profile</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="userFirstname"
          value={user.userFirstname}
          onChange={handleChange}
          placeholder="First Name"
        />
        <Input
          type="text"
          name="userLastname"
          value={user.userLastname}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <Input
          type="email"
          name="userEmail"
          value={user.userEmail}
          onChange={handleChange}
          placeholder="Email"
        />
        <Input
          type="text"
          name="userMobile"
          value={user.userMobile}
          onChange={handleChange}
          placeholder="Mobile"
        />
        <Input
          type="text"
          name="userStreet"
          value={user.userStreet}
          onChange={handleChange}
          placeholder="Street"
        />
        <Input
          type="text"
          name="userCity"
          value={user.userCity}
          onChange={handleChange}
          placeholder="City"
        />
        <Input
          type="text"
          name="userState"
          value={user.userState}
          onChange={handleChange}
          placeholder="State"
        />
        <Input
          type="text"
          name="userZipcode"
          value={user.userZipcode}
          onChange={handleChange}
          placeholder="Zipcode"
        />
        <Input
          type="text"
          name="userCountry"
          value={user.userCountry}
          onChange={handleChange}
          placeholder="Country"
        />
        <Input
          type="text"
          name="userBillingAddress"
          value={user.userBillingAddress}
          onChange={handleChange}
          placeholder="Billing Address"
        />
        <Input
          type="text"
          name="userShippingAddress"
          value={user.userShippingAddress}
          onChange={handleChange}
          placeholder="Shipping Address"
        />
        <Button type="submit">Update Profile</Button>
      </Form>
    </Container>
  );
};

export default Profile;