import React from "react";
import "./HeaderOption.css";
import { Avatar } from "@material-ui/core";

function HeadOption({ avatar, Icon, title, onClick }) {
  /* curly brackets allows JSX which allows you to write JS in HTML */
  return (
    <div onClick={onClick} className="headerOption">
      {Icon && <Icon className="headerOption__icon" />}
      {avatar && <Avatar className="headerOption__icon" src={avatar} />}
      <h3 className="headerOption__title">{title}</h3>
    </div>
  );
}

export default HeadOption;
