import "./widgetSm.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

export default function WidgetSm() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/musictest/profile/all");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user.userId}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              {user.userFirstname.charAt(0)}{user.userLastname.charAt(0)}
            </Avatar>
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{`${user.userFirstname} ${user.userLastname}`}</span>
              <span className="widgetSmUserTitle">{user.userEmail}</span>
              <span className="widgetSmUserMobile">{user.userMobile}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}