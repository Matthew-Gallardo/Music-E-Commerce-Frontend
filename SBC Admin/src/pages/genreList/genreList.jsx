import "./genreList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function GenreList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/musictest/genre/all")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching genre data:", error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/musictest/genre/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setData(data.filter((item) => item.genreId !== id));
        console.log("Genre deleted successfully");
      } else {
        console.error("Error deleting genre");
      }
    } catch (error) {
      console.error("Error deleting genre:", error);
    }
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