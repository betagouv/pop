import React from "react";
import { Link } from "react-router-dom";
import { image } from "../../image";
import "./cardList.css";

const joinData = f => {
  return f
    .map(x => {
      return x && String(x).trim();
    })
    .filter(x => x)
    .join(" ; ");
};

const bases = {
  palissy: "Palissy",
  merimee: "Mérimée",
  memoire: "Mémoire",
  joconde: "Joconde",
  mnr: "MNR Rose-Valland"
};

const capitalizeFirstLetter = s => s.charAt(0).toUpperCase() + s.slice(1);

export default ({ data }) => {
  let content = {};
  const index = data._index.replace(/[0-9]+/, "");
  switch (index) {
    case "joconde":
    case "mnr":
      content = {
        title: data.TICO || data.TITR,
        ref: data.REF,
        categories: data.DENO ? data.DENO.join(", ") : "",
        author: joinData([data.AUTR, data.ECOL, data.EPOQ]),
        data: data.PERI,
        loc: data.LOCA
      };
      break;
    case "merimee":
    case "palissy":
      content = {
        title: data.TICO || data.TITR,
        ref: data.REF,
        categories: data.DENO ? data.DENO.join(", ") : "",
        author: data.AUTR,
        data: data.SCLE,
        loc: data.LOCA
          ? joinData([data.LOCA])
          : joinData([data.REG, data.DPT, data.COM]),
        spe: data.DPRO
      };
      break;
    case "memoire":
      content = {
        title: data.TICO || data.LEG,
        subtitle: joinData([
          data.OBJET,
          data.EDIF,
          data.LEG,
          data.DATOEU,
          data.DATOEU ? "" : data.SCLE
        ]),
        ref: data.REF,
        categories: data.TECH,
        author: data.AUTP,
        data: joinData([data.DATPV, data.DATOR]),
        loc: data.LOCA
      };
      break;
  }
  return (
    <Link
      target="_blank"
      style={{ textDecoration: "none" }}
      to={`/notice/${index}/${data.REF}`}
      className="list-card"
      key={data.REF}
    >
      <div className="thumbnail">{image(data)}</div>
      <div className="content">
        <div style={{ display: "flex" }}>
          <h2>
            {capitalizeFirstLetter(content.title)}
            <br />
            <small>{content.categories}</small>
          </h2>
          <span>
            <small className="base">{bases[index]}</small>
            <br />
            {data.REF}
          </span>
        </div>
        <p>{content.subtitle}</p>
        <div>
          <p>{content.author}</p>
          <p>{content.data}</p>
          <p>{content.loc}</p>
        </div>
      </div>
    </Link>
  );
};
