import React from "react";
import { Link } from "react-router-dom";
import { bucket_url } from "../../../config.js";
import mh from "../../../assets/mh.png";
import inv from "../../../assets/inventaire.jpg";

import utils from "./utils";

function getMemoireImage(memoire) {
  console.log(memoire);
  if (!memoire.length || !memoire[0] || !memoire[0].url) {
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

  const line3 = [];
  if (data.CATE && data.CATE.length) {
    line3.push(data.CATE.join(", "));
  }
  if (data.MATR && data.MATR.length) {
    line3.push(data.MATR.join(", "));
  }

  const line4 = [];
  if (data.AUTR && data.AUTR.length) {
    line4.push(data.AUTR.join(", "));
  }
  if (data.SCLE && data.SCLE.length) {
    line4.push(data.SCLE.join(", "));
  }

  const line5 = [];
  if (data.STAT && data.STAT.length) {
    line5.push(data.STAT.join(", "));
  }
  if (data.DPRO) {
    line5.push(data.DPRO);
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
          <h2>{data.TICO || data.TITR}</h2>
          <span>{data.REF}</span>
        </div>
        <div>
          <p>{utils.generateLoca(data)}</p>
          <p>{data.DENO.join(", ")}</p>
          <p>{line3.join(" ; ")}</p>
          <p>{line4.join(" ; ")}</p>
          <p>{line5.join(" ; ")}</p>
          {productorImage(data.PRODUCTEUR)}
        </div>
      </div>
    </Link>
  );
};
