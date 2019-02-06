import React from "react";
import { Link } from "react-router-dom";

export default ({ data }) => {
  return (
    <a
      style={{ textDecoration: "none" }}
      className="card"
      target="_blank"
      href={`http://pop.culture.gouv.fr/museo/${data.REF}`}
    >
      <div className="content">
        <div style={{ display: "flex" }}>
          <h2>{data.NOMOFF}</h2>
          <span>{data.REF}</span>
        </div>
        <div>
          <p>{data.THEMES}</p>
          <p>{data.NOMOFF}</p>
          <p>{data.INV}</p>
        </div>
      </div>
    </a>
  );
};
