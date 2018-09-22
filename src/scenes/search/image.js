import React from "react";
import { bucket_url } from "../../config";

export function image(data) {
  if (data.MEMOIRE && data.MEMOIRE.length) {
    const img = data.MEMOIRE[0].url;
    if (img) {
      if (img.match(/^http/)) {
        return <img src={img} alt={data.REF} />;
      } else {
        return <img src={`${bucket_url}${img}`} alt={data.REF} />;
      }
    }
  } else if (data.IMG && data.IMG.length) {
    const img = typeof data.IMG === "string" ? data.IMG : data.IMG[0];
    if (img.match(/^http/)) {
      return <img src={img} alt={data.REF} />;
    } else {
      return <img src={`${bucket_url}${img}`} alt={data.REF} />;
    }
  }
  return (
    <img
      src={require("../../assets/noimage.png")}
      className="no-img"
      alt={data.REF}
    />
  );
}
