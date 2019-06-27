import React from "react";
import { Link } from "react-router-dom";

export default ({ data }) => {
  let img = null;
  if (data.VIDEO && Array.isArray(data.VIDEO) && data.VIDEO.length) {
    img = <img src={data.VIDEO[0]} />;
  }
  return (
    <Link
      style={{ textDecoration: "none" }}
      className="card"
      to={`/notice/enluminures/${data.REF}`}
    >
      {img}
      <div className="content">
        <div style={{ display: "flex" }}>
          <h2>{data.TITR}</h2>
          <span>{data.REF}</span>
        </div>
        <div>
          <p>
            <strong>{data.SUJET}</strong>
          </p>
          <p>{[data.DATE, data.ORIGG, data.ORIGH].filter(d => d).join(", ")}</p>
          <p>{data.ATTRIB}</p>
          <p>{[data.CONTXT, data.NOMENC.join(", "), data.REFD].filter(d => d).join(", ")}</p>
        </div>
      </div>
    </Link>
  );
};
