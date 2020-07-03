import React from "react";
import { Link } from "react-router-dom";
import { bucket_url } from "../../../config.js";


function getMemoireImage(memoire) {
  if (!memoire || !memoire.length || !memoire[0].url) {
    return require("../../../assets/noimage.jpg");
  }
  let image = memoire[0].url;

  image = image.indexOf("www") === -1 ? `${bucket_url}${image}` : image;
  return image;
}

export default ({ data }) => {

  let image = getMemoireImage(data.MEMOIRE);
  
  return (
    <Link style={{ textDecoration: "none" }} className="card" to={`/notice/autor/${data.REF}`}>
      <img src={image} alt="Lien cassé" />
      <div className="content">
        <div style={{ display: "flex" }}>
          <h2>{data.NOM}</h2>
          <span>{data.REF}</span>
        </div>
        <div>
          <p>{data.FONC}</p>
          <p>{data.BIO}</p>
        </div>
      </div>
    </Link>
  );
};
