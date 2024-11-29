import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import "./tracklist.css";
import Swal from 'sweetalert2';

export default function TrackList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/musictest/track/all")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching track data:", error));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this track?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/musictest/track/delete/${id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              setData(data.filter((item) => item.trackId !== id));
              Swal.fire("Deleted!", "Track has been deleted.", "success");
            } else {
              console.error(`Error deleting track: ${response.statusText}`);
              Swal.fire("Error!", `Error deleting track: ${response.statusText}`, "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting track:", error);
            Swal.fire("Error!", "Error deleting track.", "error");
          });
      } else if (result.isDenied) {
        Swal.fire("Cancelled", "Track was not deleted", "info");
      }
    });
  };

  const columns = [
    { field: "trackId", headerName: "ID", width: 90 },
    { field: "trackName", headerName: "Track Name", width: 200 },
    { field: "trackMusic", headerName: "Track Music", width: 300 },
    { field: "artistName", headerName: "Artist Name", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/track/" + params.row.trackId}>
              <button className="productListEdit">Edit</button>
            </Link>
            <IconButton
              color="secondary"
              onClick={() => handleDelete(params.row.trackId)}
            >
              <DeleteOutline />
            </IconButton>
          </>
        );
      },
    },
  ];

  const rows = data.map((track) => ({
    id: track.trackId,
    trackId: track.trackId,
    trackName: track.trackName,
    trackMusic: track.trackMusic,
    artistName: track.artist.artistName,
  }));

  return (
    <div className="trackList">
      <div className="trackListHeader">
        <h1>Tracks</h1>
        <Link to="/newtrack">
          <button className="trackAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={rows}
        getRowId={(row) => row.trackId}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}