import React from "react";

import { Link } from "react-router-dom";

import { bucket_url } from "../../../config.js";

export default ({ data }) => {
  const image = data.VIDEO.length
    ? `${bucket_url}${data.VIDEO[0]}`
    : require("../../../assets/noimage.jpg");
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/notice/mnr/${data.REF}`}
      className="card"
      key={data.REF}
    >
      <img src={image} alt="Lien cassé" />
      <div className="content">
        <div style={{ display: "flex" }}>
          <h2>{data.TITR}</h2>
          <span>{data.INV}</span>
        </div>
        <div>
          <p>{data.DOMN}</p>
          <p>{data.DENO}</p>
          <p>{data.LOCA}</p>
          <p>{data.AUTR}</p>
        </div>
      </div>
    </Link>
  );
};
