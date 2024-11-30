import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import Announcement from "../components/Announcement";

const Container = styled.div`
  padding: 20px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => (props.type === "filled" ? "none" : "1px solid black")};
  background-color: ${(props) =>
    props.type === "filled" ? "teal" : "transparent"};
  color: ${(props) => (props.type === "filled" ? "white" : "black")};
`;

const TopTexts = styled.div``;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductGenre = styled.span``;

const ProductTracks = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const Button = styled.button`
  background-color: #f0f0f0;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;

  &:hover {
    background-color: #e0e0e0;
  }

  &:active {
    background-color: #d0d0d0;
  }
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Summary = styled.div`
  flex: 1;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  margin-top: 20px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => (props.type === "total" ? "500" : "400")};
  font-size: ${(props) => (props.type === "total" ? "24px" : "18px")};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartId, setCartId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    console.log("Fetching cart items...");
    axios
      .get("/musictest/user/session", { withCredentials: true })
      .then((response) => {
        const { userId, cartId } = response.data;
        console.log("User ID:", userId);
        console.log("Cart ID:", cartId);
        setCartId(cartId);
        return axios.get(`/musictest/api/carts/${cartId}`, {
          withCredentials: true,
        });
      })
      .then((response) => {
        const aggregatedItems = aggregateCartItems(
          response.data.cartItems || []
        );
        setCartItems(aggregatedItems);
        console.log("Aggregated Cart Items:", aggregatedItems);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the cart items!", error);
        setError("There was an error fetching the cart items.");
        setLoading(false);
      });
  };

  const aggregateCartItems = (items) => {
    const itemMap = new Map();
    items.forEach((item) => {
      const albumId = item.album.albumId;
      if (itemMap.has(albumId)) {
        itemMap.get(albumId).cartQuantity += item.cartQuantity;
      } else {
        itemMap.set(albumId, { ...item });
      }
    });
    return Array.from(itemMap.values());
  };

  const handleCheckout = () => {
    const totalPrice = calculateSubtotal() + 150;
    navigate("/checkout", { state: { totalPrice } });
  };

  const updateCartItem = (cartItemId, updatedItem) => {
    console.log("Updating cart item:", cartItemId, updatedItem);
    if (updatedItem.cartQuantity === 0) {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.cartItemId !== cartItemId)
      ); 
      removeCartItem(cartItemId); 
    } else {
      axios
        .put(`/musictest/api/cart-items/${cartItemId}`, updatedItem, {
          withCredentials: true,
        })
        .then((response) => {
          setCartItems((prevItems) =>
            prevItems.map((item) =>
              item.cartItemId === cartItemId ? response.data : item
            )
          );
        })
        .catch((error) => {
          console.error("There was an error updating the cart item!", error);
          setError("There was an error updating the cart item.");
        });
    }
  };

  const removeCartItem = (cartItemId) => {
    console.log("Removing cart item:", cartItemId);
    axios
      .delete(`/musictest/api/cart-items/${cartItemId}`, {
        withCredentials: true,
      })
      .then(() => {
        console.log("Cart item removed:", cartItemId);
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.cartItemId !== cartItemId)
        );
      })
      .catch((error) => {
        console.error("There was an error removing the cart item!", error);
        setError("There was an error removing the cart item.");
      });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.album.albumPrice * item.cartQuantity,
      0
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Top>
        <TopTexts>
          <TopText>Shopping Bag({cartItems.length})</TopText>
        </TopTexts>
        <TopButton type="filled" onClick={handleCheckout}>
          CHECKOUT NOW
        </TopButton>
      </Top>
      <Bottom>
        <Info>
          {cartItems.map((item) => (
            <Product key={item.cartItemId}>
              <ProductDetail>
                <Image src={item.album.albumImage} />
                <Details>
                  <ProductName>
                    <b>Title:</b> {item.album.albumName}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {item.album.albumId}
                  </ProductId>
                  <ProductGenre>
                    <b>Genre:</b> {item.album.genre.genreName}
                  </ProductGenre>
                  <ProductTracks>
                    <b>Tracks:</b>{" "}
                    {item.album.tracks
                      .map((track) => track.trackName)
                      .join(", ")}
                  </ProductTracks>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Button
                    onClick={() =>
                      updateCartItem(item.cartItemId, {
                        ...item,
                        cartQuantity: item.cartQuantity - 1,
                      })
                    }
                  >
                    -
                  </Button>
                  <ProductAmount>{item.cartQuantity}</ProductAmount>
                  <Button
                    onClick={() =>
                      updateCartItem(item.cartItemId, {
                        ...item,
                        cartQuantity: item.cartQuantity + 1,
                      })
                    }
                  >
                    +
                  </Button>
                </ProductAmountContainer>
                <ProductPrice>
                  ₱ {(item.album.albumPrice * item.cartQuantity).toFixed(2)}
                </ProductPrice>
              </PriceDetail>
            </Product>
          ))}
        </Info>
        <Summary>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem>
            <SummaryItemText>Subtotal</SummaryItemText>
            <SummaryItemPrice>
              ₱ {calculateSubtotal().toFixed(2)}
            </SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Shipping</SummaryItemText>
            <SummaryItemPrice>₱ 150.00</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem type="total">
            <SummaryItemText>Total</SummaryItemText>
            <SummaryItemPrice>
              ₱ {(parseFloat(calculateSubtotal()) + 150).toFixed(2)}
            </SummaryItemPrice>
          </SummaryItem>
        </Summary>
      </Bottom>
    
    </Container>


  );
};

export default Cart;