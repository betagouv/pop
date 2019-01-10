import React from "react";
import { Link } from "react-router-dom";
import { bucket_url } from "../../../config.js";
import mdf from "../../../assets/musee-de-france.jpg";

export default ({ data }) => {
  const image = data.IMG.length
    ? `${bucket_url}${data.IMG[0]}`
    : require("../../../assets/noimage.jpg");
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/notice/joconde/${data.REF}`}
      className="card"
      key={data.REF}
    >
      <img src={image} alt="Lien cassé" />
      <div className="content">
        <div style={{ display: "flex" }}>
          <h2>{data.TITR}</h2>
          <span>{data.REF}</span>
        </div>
        <div>
          <p>{data.DOMN.join(", ")}</p>
          <p>{data.DENO.join(", ")}</p>
          <p>{data.AUTR}</p>
          <p>{data.PERI.join(", ")}</p>
          <p>{data.LOCA}</p>
          <p>{data.INV}</p>
          <img src={mdf} className="producteur" />
        </div>
      </div>
    </Link>
  );
};
