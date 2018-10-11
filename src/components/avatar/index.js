import React from "react";

import "./index.css";

const getInitials = (word = "JP") =>
  word
    .match(/\b(\w)/g)
    .join("")
    .substring(0, 2)
    .toUpperCase();

export default ({ email, photoURL }) => {
  if (!photoURL) {
    return (
      <span className="avatar">
        <div className="Initials">{getInitials(email)}</div>
      </span>
    );
  } else {
    return (
      <span className="avatar">
        <img className="Logo" alt="" src={photoURL} />
      </span>
    );
  }
};
