import "./genreList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function GenreList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/musictest/genre/all")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching genre data:", error));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this genre?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/musictest/genre/delete/${id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              setData(data.filter((item) => item.genreId !== id));
              Swal.fire("Deleted!", "Genre has been deleted.", "success");
            } else {
              console.error(`Error deleting genre: ${response.statusText}`);
              Swal.fire("Error!", `Error deleting genre: ${response.statusText}`, "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting genre:", error);
            Swal.fire("Error!", "Error deleting genre.", "error");
          });
      } else if (result.isDenied) {
        Swal.fire("Cancelled", "Genre was not deleted", "info");
      }
    });
  };

  const columns = [
    { field: "genreId", headerName: "ID", width: 90 },
    {
      field: "genreName",
      headerName: "Genre Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="genreListItem">
            {params.row.genreName}
          </div>
        );
      },
    },
    { field: "genreDesc", headerName: "Description", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/genre/" + params.row.genreId}>
              <button className="genreListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="genreListDelete"
              onClick={() => handleDelete(params.row.genreId)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="genreList">
    <div className="genreListHeader">
      <h1>Genres</h1>
      <Link to="/newgenre">
        <button className="genreAddButton">Create</button>
      </Link>
    </div>
    <DataGrid
      rows={data}
      getRowId={(row) => row.genreId}
      disableSelectionOnClick
      columns={columns}
      pageSize={8}
      checkboxSelection
    />
  </div>
  );
}