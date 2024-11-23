import "./genreList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { genreRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function GenreList() {
  const [data, setData] = useState(genreRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "genre",
      headerName: "Genre",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="genreListItem">
            <img className="genreListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "desc", headerName: "Description", width: 250 },
    { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/genre/" + params.row.id}>
              <button className="genreListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="genreListDelete"
              onClick={() => handleDelete(params.row.id)}
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
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
