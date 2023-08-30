import React from "react";

import { Link } from "react-router-dom";

import { bucket_url } from "../../../config.js";

import Mapping from "../../../services/mapping";

export default ({ data }) => {
  const image = data.VIDEO.length
    ? `${bucket_url}${data.VIDEO[0]}`
    : require("../../../assets/noimage.jpg");
  const subtitle = !data.TITR && data.DENO ? "" : data.DENO.join(", ");
  const author = String(data.AUTR).replace("#", " ");
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
          <h2>
            <span>{author}</span>
            <br />
            {data.TITR}
            <br />
            <small>{subtitle}</small>
          </h2>
          <span>{data.INV}</span>
        </div>
        <div>
          <p>{data.DOMN}</p>
          { (data.LOCA && data.LOCA !== "") ? <p>{Mapping.mnr["LOCA"].label + " : " + data.LOCA}</p> : null }
          { (data.AFFE && data.AFFE !== "") ? <p>{Mapping.mnr["AFFE"].label + " : " + data.AFFE}</p> : null }
          <p>{data.CATE}</p>
          <p>{data.PHOT}</p>
          { (data.HIST4 && data.HIST4 !== "") ? <p>{Mapping.mnr["HIST4"].label + " : " + data.HIST4}</p> : null }
        </div>
      </div>
    </Link>
  );
};
