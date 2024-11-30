import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ sortOrder }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/musictest/album/all");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.albumPrice - b.albumPrice;
    } else if (sortOrder === "desc") {
      return b.albumPrice - a.albumPrice;
    } else {
      return 0;
    }
  });

  return (
    <Container>
      {sortedProducts.map((item) => (
        <Product item={item} key={item.albumId} />
      ))}
    </Container>
  );
};

export default Products;