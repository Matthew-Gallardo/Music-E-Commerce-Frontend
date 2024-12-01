import "./cartList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

export default function CartList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/musictest/api/cart-items")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching cart data:", error));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this cart item?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/musictest/api/cart-items/${id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              setData(data.filter((item) => item.cartItemId !== id));
              Swal.fire("Deleted!", "Cart item has been deleted.", "success");
            } else {
              console.error(`Error deleting cart item: ${response.statusText}`);
              Swal.fire("Error!", `Error deleting cart item: ${response.statusText}`, "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting cart item:", error);
            Swal.fire("Error!", "Error deleting cart item.", "error");
          });
      } else if (result.isDenied) {
        Swal.fire("Cancelled", "Cart item was not deleted", "info");
      }
    });
  };

  const columns = [
    { field: "cartItemId", headerName: "Item ID", width: 90 },
    { field: "cartQuantity", headerName: "Quantity", width: 90 },
    { field: "albumName", headerName: "Album Name", width: 150 },
    { field: "albumPrice", headerName: "Price", width: 100 },
    { field: "artistName", headerName: "Artist", width: 150 },
    { field: "genreName", headerName: "Genre", width: 100 },
    { field: "cartId", headerName: "Cart ID", width: 90 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="cartListDelete"
              onClick={() => handleDelete(params.row.cartItemId)}
            />
          </>
        );
      },
    },
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
      <h1>Manage Carts</h1>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </div>
  );
}