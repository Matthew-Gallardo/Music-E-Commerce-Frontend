import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import "./tracklist.css";

export default function TrackList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/musictest/track/all")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching track data:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`/musictest/track/delete/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setData(data.filter((item) => item.trackId !== id));
        } else {
          console.error("Error deleting track:", response.statusText);
        }
      })
      .catch((error) => console.error("Error deleting track:", error));
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