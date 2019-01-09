import React from "react";
import { Link } from "react-router-dom";
import { bucket_url } from "../../../config.js";
import mh from "../../../assets/mh.png";
import inv from "../../../assets/inventaire.jpg";

function getMemoireImage(memoire) {
  if (!memoire.length || !memoire[0].url) {
    return require("../../../assets/noimage.jpg");
  }
  let image = memoire[0].url;

  image = image.indexOf("www") === -1 ? `${bucket_url}${image}` : image;
  return image;
}

export default ({ data }) => {
  let image = getMemoireImage(data.MEMOIRE);

  const productorImage = p => {
    if (p === "Inventaire") {
      return <img src={inv} className="producteur" />;
    } else if (p === "Monuments Historiques") {
      return <img src={mh} className="producteur mh" />;
    }
    return <div />;
  };

  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/notice/merimee/${data.REF}`}
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
          <p>{data.DENO.join(", ")}</p>
          <p>{data.LOCA}</p>
          <p>{data.AUTR.join(", ")}</p>
          {productorImage(data.PRODUCTEUR)}
        </div>
      </div>
    </Link>
  );
};
