import React from "react";
import { Link } from "react-router-dom";
import { bucket_url } from "../../../config.js";
import mh from "../../../assets/mh.png";
import map from "../../../assets/map.jpg";
import inv from "../../../assets/inventaire.jpg";

export default ({ data }) => {
  let image = "";
  if (data.IMG && data.IMG.indexOf("memoire") === 0) {
    image = `${bucket_url}${data.IMG}`;
  } else if (data.IMG) {
    image = `${data.IMG}`;
  } else {
    image = require("../../../assets/noimage.jpg");
  }
  const productorImage = p => {
    switch (p) {
      case "CAOA":
      case "CRMH":
        return <img src={mh} className="producteur mh" />;
      case "MAP":
        return <img src={map} className="producteur mh" />;
      case "INV":
        return <img src={inv} className="producteur mh" />;
      default:
        return <div />;
    }
  };

  const joinData = f => {
    return f
      .map(x => x && String(x).trim())
      .filter(x => x)
      .join(" ; ");
  };

  const content = joinData([
    data.OBJET,
    data.EDIF,
    data.LEG
  ]);

  const contentSerieTitre = joinData([
    data.SERIE,
    data.TITRE,
  ]);
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/notice/memoire/${data.REF}`}
      className="card"
      key={data.REF}
    >
      <img src={image} alt="Lien cassé" />
      <div className="content">
        <div style={{ display: "flex" }}>
          <h2>{data.TICO || data.LEG || `${data.EDIF || ""}`.trim()}</h2>
          <span>{data.REF}</span>
        </div>
        <div>
          <p>{content}</p>
          <p> {data.AUTOEU? "Auteur de l’œuvre représentée : "+data.AUTOEU : ""}</p>
          <p>{data.LOCA}</p>
          <p>{data.TYPDOC}</p>
          <p>{data.AUTP.join(', ')}</p>
          <p>{data.DATPV}</p>
          <p>{contentSerieTitre}</p>
          <p>{data.COPY}</p>
          {productorImage(data.PRODUCTEUR)}
        </div>
      </div>
    </Link>
  );
};
