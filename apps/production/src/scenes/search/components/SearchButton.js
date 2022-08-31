import React from "react";
import SearchIcon from "../../../assets/icon-search.png";

export default ({title, icon, className, onClick}) => {
  const children = icon ? <img src={SearchIcon} alt={title} /> : title;
  return (
    <button className={className} title={title} onClick={onClick}>
      {children}
    </button>
  );
}
