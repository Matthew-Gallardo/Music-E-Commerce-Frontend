import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  ShoppingCartOutlined,
  AttachMoneyOutlined,
  AlbumOutlined,
  MusicNoteOutlined,
  PlayCircleOutlineOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/artist" className="link">
              <li className="sidebarListItem">
                <MusicNoteOutlined className="sidebarIcon" />
                Artist
              </li>
            </Link>
            <Link to="/genre" className="link">
              <li className="sidebarListItem">
                <MusicNoteOutlined className="sidebarIcon" />
                Genre
              </li>
            </Link>
            <Link to="/albums" className="link">
              <li className="sidebarListItem">
                <AlbumOutlined className="sidebarIcon"/>
                Albums
              </li>
            </Link>
            <Link to="/tracks" className="link">
              <li className="sidebarListItem">
                <PlayCircleOutlineOutlined className="sidebarIcon"/>
                Tracks
              </li>
            </Link>
            <li className="sidebarListItem">
              <AttachMoneyOutlined className="sidebarIcon" />
              Orders
            </li>
            <li className="sidebarListItem">
              <ShoppingCartOutlined className="sidebarIcon" />
              Shopping Carts
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
