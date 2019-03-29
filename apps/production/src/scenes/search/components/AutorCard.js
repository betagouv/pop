import React from "react";
import { Link } from "react-router-dom";

export default ({ data }) => {
  return (
    <Link style={{ textDecoration: "none" }} className="card" to={`/notice/autor/${data.REF}`}>
      <div className="content">
        <div style={{ display: "flex" }}>
          <h2>{data.NOM}</h2>
          <span>{data.REF}</span>
        </div>
        <div>
          <p>{data.FONC}</p>
          <p>{data.BIO}</p>
        </div>
      </div>
    </Link>
  );
};
