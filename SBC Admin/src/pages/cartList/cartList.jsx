import "./cartList.css";
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react";

export default function CartList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/musictest/api/cart-items")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching cart data:", error));
  }, []);

  const columns = [
    { field: "cartItemId", headerName: "Item ID", width: 90 },
    { field: "cartQuantity", headerName: "Quantity", width: 90 },
    { field: "albumName", headerName: "Album Name", width: 150 },
    { field: "albumPrice", headerName: "Price", width: 100 },
    { field: "artistName", headerName: "Artist", width: 150 },
    { field: "genreName", headerName: "Genre", width: 100 },
    { field: "cartId", headerName: "Cart ID", width: 90 },
  ];

  const rows = data.map(item => ({
    id: item.cartItemId,
    cartItemId: item.cartItemId,
    cartQuantity: item.cartQuantity,
    albumName: item.album.albumName,
    albumPrice: item.album.albumPrice,
    artistName: item.album.artist.artistName,
    genreName: item.album.genre.genreName,
    cartId: item.cart.cartId,
  }));

  return (
    <div className="cartList">
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </div>
  );
}