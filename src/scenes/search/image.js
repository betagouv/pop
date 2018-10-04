import React from "react";
import { bucket_url } from "../../config";

export function image(data) {
  const alt = data.TICO || data.TITR || data.REF;

  if (data.MEMOIRE && data.MEMOIRE.length) {
    const img = data.MEMOIRE[0].url;
    if (img) {
      if (img.match(/^http/)) {
        return <img src={img} alt={alt} />;
      } else {
        return <img src={`${bucket_url}${img}`} alt={alt} />;
      }
    }
  } else if (data.IMG && data.IMG.length) {
    const img = typeof data.IMG === "string" ? data.IMG : data.IMG[0];
    if (img.match(/^http/)) {
      return <img src={img} alt={alt} />;
    } else {
      return <img src={`${bucket_url}${img}`} alt={alt} />;
    }
  }


  return (
    <img
      src={require("../../assets/noimage.png")}
      className="no-img"
      alt={alt}
    />
  );
}
