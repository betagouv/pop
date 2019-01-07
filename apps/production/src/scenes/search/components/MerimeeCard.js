import React from "react";
import { Link } from "react-router-dom";
import { bucket_url } from "../../../config.js";

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
        </div>
      </div>
    </Link>
  );
};
