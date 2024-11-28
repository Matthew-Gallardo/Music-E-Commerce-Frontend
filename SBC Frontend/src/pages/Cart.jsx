import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  border: ${(props) => (props.type === 'filled' ? 'none' : '1px solid black')};
  background-color: ${(props) => (props.type === 'filled' ? 'black' : 'transparent')};
  color: ${(props) => (props.type === 'filled' ? 'white' : 'black')};
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

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios.get('/musictest/user/session', { withCredentials: true })
      .then(response => {
        const userId = response.data.userId;
        console.log('User ID:', userId); // To check what is the user
        return axios.get(`/musictest/api/carts/user/${userId}`, { withCredentials: true });
      })
      .then(response => {
        setCart(response.data);
        setCartItems(response.data.cartItems);
        console.log('Cart ID:', response.data.cartId); // To check the log
      })
      .catch(error => {
        console.error('There was an error fetching the cart!', error);
      });
  }, []);

  const addItemToCart = (albumId, quantity) => {
    axios.post('/musictest/api/cart-items', {
      cart: { cartId: cart.cartId },
      album: { albumId: albumId },
      cartQuantity: quantity
    }, { withCredentials: true })
      .then(response => {
        setCartItems([...cartItems, response.data]);
        console.log('Added item to cart:', response.data); // Log the added item
      })
      .catch(error => {
        console.error('There was an error adding the item to the cart!', error);
      });
  };

  const updateCartItem = (cartItemId, quantity) => {
    axios.put(`/musictest/api/cart-items/${cartItemId}`, {
      cartQuantity: quantity
    }, { withCredentials: true })
      .then(response => {
        setCartItems(cartItems.map(item => item.cartItemId === cartItemId ? response.data : item));
        console.log('Updated cart item:', response.data); // Log the updated item
      })
      .catch(error => {
        console.error('There was an error updating the cart item!', error);
      });
  };

  const removeCartItem = (cartItemId) => {
    axios.delete(`/musictest/api/cart-items/${cartItemId}`, { withCredentials: true })
      .then(() => {
        setCartItems(cartItems.filter(item => item.cartItemId !== cartItemId));
        console.log('Removed cart item with ID:', cartItemId); // Log the removed item ID
      })
      .catch(error => {
        console.error('There was an error removing the cart item!', error);
      });
  };

  return (
    <Container>
      <Top>
        <TopTexts>
          <TopText>Shopping Bag({cartItems.length})</TopText>
          <TopText>Your Wishlist (0)</TopText>
        </TopTexts>
        <TopButton type="filled">CHECKOUT NOW</TopButton>
      </Top>
      <Bottom>
        <Info>
          {cartItems.map(item => (
            <Product key={item.cartItemId}>
              <ProductDetail>
                <Image src={item.album.imageUrl} />
                <Details>
                  <ProductName>
                    <b>Title:</b> {item.album.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {item.album.albumId}
                  </ProductId>
                  <ProductGenre>
                    <b>Genre:</b> {item.album.genre}
                  </ProductGenre>
                  <ProductTracks>
                    <b>Tracks:</b> {item.album.tracks}
                  </ProductTracks>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <button onClick={() => updateCartItem(item.cartItemId, item.cartQuantity + 1)}>+</button>
                  <ProductAmount>{item.cartQuantity}</ProductAmount>
                  <button onClick={() => updateCartItem(item.cartItemId, item.cartQuantity - 1)}>-</button>
                </ProductAmountContainer>
                <ProductPrice>$ {item.album.price * item.cartQuantity}</ProductPrice>
                <button onClick={() => removeCartItem(item.cartItemId)}>Remove</button>
              </PriceDetail>
            </Product>
          ))}
        </Info>
      </Bottom>
    </Container>
  );
};

export default Cart;