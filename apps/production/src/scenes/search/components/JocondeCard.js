import React from "react";
import { Link } from "react-router-dom";
import { bucket_url } from "../../../config.js";
import mdf from "../../../assets/musee-de-france.jpg";

export default ({ data }) => {
  const image = data.IMG.length
    ? `${bucket_url}${data.IMG[0]}`
    : require("../../../assets/noimage.jpg");

  const loca = joinData([data.VILLE_M, data.NOMOFF]);
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
          <p>{data.AUTR.join("; ")}</p>
          <p>{data.PERI.join(", ")}</p>
          <p>{loca}</p>
          <p>{data.INV}</p>
          <img src={mdf} className="producteur" />
        </div>
      </div>
    </Link>
  );
};

// (witch can be strings, array, array in arrays, etc.)
function withoutEmptyStrings(data) {
  return data
    .map(x => x && (Array.isArray(x) ? x.join(", ").trim() : String(x).trim()))
    .filter(x => x);
}
// Takes `[["foo", "bar"], ["foo"], "bar"]`, returns "foo, bar ; foo ; bar"
function joinData(data) {
  return withoutEmptyStrings(data).join(" ; ");
}
