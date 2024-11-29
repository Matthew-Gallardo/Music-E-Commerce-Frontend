import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import axios from "axios";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import Swal from 'sweetalert2';

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
  margin: 0 5px;
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
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/musictest/album/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchCartId = async () => {
      try {
        const response = await axios.get('/musictest/user/session', { withCredentials: true });
        const userId = response.data.userId;
        console.log('User ID:', userId); // Log the user ID
        const cartResponse = await axios.get(`/musictest/api/carts/user/${userId}`, { withCredentials: true });
        setCartId(cartResponse.data.cartId);
        console.log('Cart ID:', cartResponse.data.cartId); // Log the cart ID
      } catch (error) {
        console.error("Error fetching cart ID:", error);
      }
    };

    fetchProduct();
    fetchCartId();
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === "inc") {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  const handleAddToCart = async () => {
    try {
      const data = {
        cart: { cartId: cartId },
        album: { albumId: product?.albumId },
        cartQuantity: quantity,
      };
      console.log("Sending data to server:", data);
  
      const response = await axios.post("/musictest/api/cart-items", data, { withCredentials: true });
      console.log("Item added to cart:", response.data);
      console.log("Full server response:", response);
      Swal.fire({
        title: 'Success!',
        text: 'Item has been added to your cart.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      } catch (error) {
        console.error("Error adding to cart:", error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to add item to cart.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }

  if (!product) return <div>Loading...</div>;

  return (
    <Container>
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product?.albumImage} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product?.albumName}</Title>
          <Artist>{product?.artist?.artistName}</Artist>
          <Genre>{product?.genre?.genreName}</Genre>
          <Desc>{product?.albumDesc}</Desc>
          <Price>₱{product?.albumPrice}</Price>
          <TracksContainer>
            <TracksTitle>Tracks:</TracksTitle>
            {product?.tracks?.map((track, index) => (
              <Track key={index}>
                <TrackName>{`${index + 1}. ${track.trackName}`}</TrackName>
                <AudioPlayer controls>
                  <source src={track.trackMusic} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </AudioPlayer>
              </Track>
            ))}
          </TracksContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantityChange("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantityChange("inc")} />
            </AmountContainer>
            <Button onClick={handleAddToCart}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;