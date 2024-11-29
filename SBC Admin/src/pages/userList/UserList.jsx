import "./userList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

export default function UserList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/musictest/profile/all")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this user?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/musictest/profile/delete/${id}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              setData(data.filter((item) => item.userId !== id));
              Swal.fire("Deleted!", "User has been deleted.", "success");
            } else {
              console.error(`Error deleting user: ${response.statusText}`);
              Swal.fire("Error!", `Error deleting user: ${response.statusText}`, "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            Swal.fire("Error!", "Error deleting user.", "error");
          });
      } else if (result.isDenied) {
        Swal.fire("Cancelled", "User was not deleted", "info");
      }
    });
  };

  const columns = [
    { field: "userId", headerName: "ID", width: 90 },
    {
      field: "userFirstname",
      headerName: "First Name",
      width: 150,
    },
    {
      field: "userLastname",
      headerName: "Last Name",
      width: 150,
    },
    { field: "userEmail", headerName: "Email", width: 200 },
    { field: "userMobile", headerName: "Mobile", width: 150 },
    { field: "userCity", headerName: "City", width: 150 },
    { field: "userCountry", headerName: "Country", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.userId}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.userId)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <div className="userListHeader">
        <h1>Users</h1>
      </div>
      <DataGrid
        rows={data}
        getRowId={(row) => row.userId}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}