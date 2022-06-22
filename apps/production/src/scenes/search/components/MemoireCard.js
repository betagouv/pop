import React from "react";
import { Link } from "react-router-dom";
import { bucket_url } from "../../../config.js";
import mh from "../../../assets/mh.png";
import mpp from "../../../assets/mpp.png";
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
      case "MPP":
        return <img src={mpp} className="producteur mh" />;
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
    data.LEG,
    data.EDIF
  ]);

  const contentWcomOrCom = data.WCOM && data.WCOM.length > 0 ? data.WCOM : data.COM;
  const contentWadrsOrAdresse = data.WADRS && data.WADRS.length > 0 ? data.WADRS  : data.ADRESSE;

  const contentLoca = joinData([
    data.PAYS,
    data.REG,
    data.DPT_LETTRE,
    contentWcomOrCom,
    contentWadrsOrAdresse,
  ]);

  const contentSerieTitre = joinData([
    data.SERIE,
    data.TITRE,
  ]);

  const loc = contentLoca && contentLoca != "" ? contentLoca : data.LOCA;

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
          <h2>{content}</h2>
          <span>{data.REF}</span>
        </div>
        <div style={{ maxWidth: "80%" }}>
          <p style={{ whiteSpace: "initial" }}> {data.AUTOEU && data.AUTOEU != "" ? "Auteur de l’œuvre représentée : "+data.AUTOEU : ""}</p>
          <p style={{ whiteSpace: "initial" }}>{loc}</p>
          <p style={{ whiteSpace: "initial" }}>{data.TYPDOC}</p>
          <p style={{ whiteSpace: "initial" }}>{data.AUTP.join(', ')}</p>
          <p style={{ whiteSpace: "initial" }}>{data.DATPV}</p>
          <p style={{ whiteSpace: "initial" }}>{contentSerieTitre}</p>
          <p style={{ whiteSpace: "initial" }}>{data.COPY}</p>    
        </div>
        <span>{productorImage(data.PRODUCTEUR)}</span>
      </div>
    </Link>
  );
};
