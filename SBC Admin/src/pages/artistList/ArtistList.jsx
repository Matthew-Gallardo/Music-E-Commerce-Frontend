import "./artistList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

export default function ArtistList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/musictest/artist/all")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching artist data:", error));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this artist?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/musictest/artist/delete/${id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              setData(data.filter((item) => item.artistId !== id));
              Swal.fire("Deleted!", "Artist has been deleted.", "success");
            } else {
              console.error(`Error deleting artist: ${response.statusText}`);
              Swal.fire("Error!", `Error deleting artist: ${response.statusText}`, "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting artist:", error);
            Swal.fire("Error!", "Error deleting artist.", "error");
          });
      } else if (result.isDenied) {
        Swal.fire("Cancelled", "Artist was not deleted", "info");
      }
    });
  };
  
  const columns = [
    { field: "artistId", headerName: "ID", width: 90 },
    {
      field: "artistName",
      headerName: "Artist Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="artistListUser">
            {params.row.artistName}
          </div>
        );
      },
    },
    {
      field: "artistNumber",
      headerName: "Artist Number",
      width: 150,
    },
    {
      field: "artistEmail",
      headerName: "Artist Email",
      width: 200,
    },
    {
      field: "artistLocation",
      headerName: "Artist Location",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/artist/" + params.row.artistId}>
              <button className="artistListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="artistListDelete"
              onClick={() => handleDelete(params.row.artistId)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="artistList">
      <h1>Artist</h1>
      <div className="artistCreateButtonContainer">
        <Link to="/newartist">
          <button className="artistCreateButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={data}
        getRowId={(row) => row.artistId}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}