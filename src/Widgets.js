import React from "react";
import "./Widgets.css";
import InfoIcon from "@material-ui/icons/Info";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

function Widgets() {
  const newsArticle = (heading, subtitle) => (
    <div className="widgets__article">
      <div className="widget__articleLeft">
        <FiberManualRecordIcon />
      </div>
      <div className="widget__articleRight">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  );
  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>LinkedIn News</h2>
        <InfoIcon />
      </div>

      {newsArticle("Lorem ipsum dolor sit amet", "Lorem ipsum")}
      {newsArticle("Lorem ipsum dolor sit amet", "Lorem ipsum ")}
      {newsArticle("Lorem ipsum dolor sit amet", "Lorem ipsum ")}
      {newsArticle("Lorem ipsum dolor sit amet", "Lorem ipsum ")}
      {newsArticle("Lorem ipsum dolor sit amet", "Lorem ipsum ")}
    </div>
  );
}

export default Widgets;
