import React from "react";
import { Link } from "react-router-dom";
import { bucket_url } from "../../../config.js";
import mh from "../../../assets/mh.png";
import inv from "../../../assets/inventaire.jpg";

import utils from "./utils";

function getMemoireImage(memoire) {
  if (!memoire.length || !memoire[0].url) {
    return require("../../../assets/noimage.jpg");
  }
  let image = memoire[0].url;
  image = image.indexOf("www") === -1 ? `${bucket_url}${image}` : image;
  return image;
}

export default ({ data }) => {
  const image = getMemoireImage(data.MEMOIRE);

  const productorImage = p => {
    if (p === "Inventaire") {
      return <img src={inv} className="producteur" />;
    } else if (p === "Monuments Historiques") {
      return <img src={mh} className="producteur mh" />;
    }
    return <div />;
  };

  if (data.REF.startsWith("PA") || data.REF.startsWith("PM")) {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/notice/palissy/${data.REF}`}
        className="card"
        key={data.REF}
      >
        <img src={image} alt="Lien cassé" />
        <div className="content">
          <div style={{ display: "flex" }}>
            <h2>{data.TICO}</h2>
            <span>{data.REF}</span>
          </div>
          <div>
            <p>{utils.generateLoca(data)}</p>
            <p>{data.EDIF}</p>
            <p>{data.AUTR.join(" ; ")}</p>
            <p>{data.CATE.join(" ; ")}</p>
            <p>{data.MATR.join(" ; ")}</p>
            <p>{data.SCLE.join(" ; ")}</p>
            <p>{data.DEPL}</p>
            <p>{data.STAT.join(" ; ")}</p>
            <p>{data.DPRO}</p>
            <p>{data.DOMN}</p>
            {productorImage(data.PRODUCTEUR)}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/notice/palissy/${data.REF}`}
      className="card"
      key={data.REF}
    >
      <img src={image} alt="Lien cassé" />
      <div className="content">
        <div style={{ display: "flex" }}>
          <h2>{data.TICO}</h2>
          <span>{data.REF}</span>
        </div>
        <div>
          <p>{data.DOMN}</p>
          <p>{data.DENO.join(" ; ")}</p>
          <p>{utils.generateLoca(data)}</p>
          <p>{data.AUTR.join(" ; ")}</p>
          {productorImage(data.PRODUCTEUR)}
        </div>
      </div>
    </Link>
  );
};
