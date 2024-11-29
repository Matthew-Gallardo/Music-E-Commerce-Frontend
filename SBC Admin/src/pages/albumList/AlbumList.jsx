import "./albumList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

export default function AlbumList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/musictest/album/all")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching album data:", error));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this album?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/musictest/album/delete/${id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              setData(data.filter((item) => item.albumId !== id));
              Swal.fire("Deleted!", "Album has been deleted.", "success");
            } else {
              console.error(`Error deleting album: ${response.statusText}`);
              Swal.fire("Error!", `Error deleting album: ${response.statusText}`, "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting album:", error);
            Swal.fire("Error!", "Error deleting album.", "error");
          });
      } else if (result.isDenied) {
        Swal.fire("Cancelled", "Album was not deleted", "info");
      }
    });
  };

  const columns = [
    { field: "albumId", headerName: "ID", width: 90 },
    {
      field: "albumName",
      headerName: "Album Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.albumImage} alt="" />
            {params.row.albumName}
          </div>
        );
      },
    },
    { field: "albumDesc", headerName: "Description", width: 250 },
    { field: "albumPrice", headerName: "Price", width: 150 },
    { field: "albumQty", headerName: "Quantity", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/album/" + params.row.albumId}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.albumId)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="albumList">
    <div className="albumListHeader">
      <h1>Albums</h1>
      <Link to="/newalbum">
        <button className="albumAddButton">Create</button>
      </Link>
    </div>
    <DataGrid
      rows={data}
      getRowId={(row) => row.albumId}
      disableSelectionOnClick
      columns={columns}
      pageSize={8}
      checkboxSelection
    />
  </div>
  );
}