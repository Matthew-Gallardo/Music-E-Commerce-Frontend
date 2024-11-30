import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import City from "../ph_provinces_and_cities";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #2C3B55;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 40px auto;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  color: #CAFFB9;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
`;

const FormGroup = styled.div`
  flex: 1 1 45%;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  color: #CAFFB9;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  resize: vertical;
`;

const Select = styled.select`
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
  background-color: teal;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Profile = () => {
  const [user, setUser] = useState({
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

  useEffect(() => {
    axios
      .get("/musictest/profile", { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the user profile!", error);
      });

    const city = new City();
    city.showProvinces("#userState");
    city.showCities("#userCity");
    city.showCountries("#country");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put("/musictest/profile/update", user, { withCredentials: true })
          .then((response) => {
            Swal.fire("Saved!", "", "success");
          })
          .catch((error) => {
            console.error("There was an error updating the profile!", error);
            Swal.fire("Error!", "Profile update failed.", "error");
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <>
      <Announcement />
      <Container>
        <Title>Profile</Title>
        <Form onSubmit={handleUpdate}>
          <FormGroup>
            <Label htmlFor="userFirstname">First Name</Label>
            <Input
              type="text"
              id="userFirstname"
              name="userFirstname"
              value={user.userFirstname}
              onChange={handleChange}
              placeholder="First Name"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="userLastname">Last Name</Label>
            <Input
              type="text"
              id="userLastname"
              name="userLastname"
              value={user.userLastname}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="userEmail">Email</Label>
            <Input
              type="email"
              id="userEmail"
              name="userEmail"
              value={user.userEmail}
              onChange={handleChange}
              placeholder="Email"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="userMobile">Mobile</Label>
            <Input
              type="tel"
              id="userMobile"
              name="userMobile"
              value={user.userMobile}
              onChange={handleChange}
              placeholder="Mobile"
              pattern="[0-9]*"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="userStreet">Street</Label>
            <Input
              type="text"
              id="userStreet"
              name="userStreet"
              value={user.userStreet}
              onChange={handleChange}
              placeholder="Street"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="userState">State</Label>
            <Select
              id="userState"
              name="userState"
              value={user.userState}
              onChange={handleChange}
            >
              <option value="">Select state</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="userCity">City</Label>
            <Select
              id="userCity"
              name="userCity"
              value={user.userCity}
              onChange={handleChange}
            >
              <option value="">Select city</option>
            </Select>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="userZipcode">Zipcode</Label>
            <Input
              type="text"
              id="userZipcode"
              name="userZipcode"
              value={user.userZipcode}
              onChange={handleChange}
              placeholder="Zipcode"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="country">Country</Label>
            <Select
              id="country"
              name="country"
              value={user.country}
              onChange={handleChange}
            >
              <option value="">Select Country</option>
            </Select>
          </FormGroup>
          <FormGroup style={{ flex: "1 1 100%" }}>
            <Label htmlFor="userBillingAddress">Billing Address</Label>
            <TextArea
              id="userBillingAddress"
              name="userBillingAddress"
              value={user.userBillingAddress}
              onChange={handleChange}
              placeholder="Billing Address"
              rows="4"
            />
          </FormGroup>
          <FormGroup style={{ flex: "1 1 100%" }}>
            <Label htmlFor="userShippingAddress">Shipping Address</Label>
            <TextArea
              id="userShippingAddress"
              name="userShippingAddress"
              value={user.userShippingAddress}
              onChange={handleChange}
              placeholder="Shipping Address"
              rows="4"
            />
          </FormGroup>
          <Button type="submit">Update Profile</Button>
        </Form>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;