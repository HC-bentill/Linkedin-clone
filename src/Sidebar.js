import React from "react";
import { Avatar } from "@material-ui/core";
import "./Sidebar.css";
import img1 from "./img1.jpg";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";

function Sidebar() {
  //this selects the user from the store
  //using the redux inspect tool you would notice user is an object with properties after logged in
  const user = useSelector(selectUser);

  const recentItem = (topic) => (
    <div className="sidebar__recentItem">
      <span className="sidebar__hash">#</span>
      <p>{topic}</p>
    </div>
  );

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src={img1} alt="" />
        <Avatar src={user.photoUrl} className="sidebar__avatar">
          {user.email[0]}
        </Avatar>
        <h2>{user.displayName}</h2>
        <h4>{user.email}</h4>
      </div>

      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Who viewed you </p>
          <div className="sidebar__statNumber">2,478</div>
        </div>
        <div className="sidebar__stat">
          <p>Views on post</p>
          <div className="sidebar__statNumber">2,478</div>
        </div>
      </div>

      <div className="sidebar__bottom">
        <p>Recent</p>
        {recentItem("reactjs")}
        {recentItem("programming")}
        {recentItem("web design")}
        {recentItem("software engineering")}
        {recentItem("Developer")}
        {recentItem("Full Stack")}
      </div>
    </div>
  );
}

export default Sidebar;
