import React from "react";
import { Link } from "react-router-dom";
import { image } from "../../image";
import "./CardList.css";
import mdf from '../../../../assets/musee-de-france.jpg';

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
      return <Joconde data={data} />;
      break;
    case "mnr":
      return <Mnr data={data} />;
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

const Mnr = ({ data, index }) => {
  const REF = data.REF;
  const INV = data.INV;
  const categories = data.DENO ? data.DENO.join(", ") : "";
  const title = data.TICO || data.TITR;
  // const author = joinData([data.AUTR, data.ECOL, data.EPOQ]);
  const domn = data.DOMN ? data.DOMN.join(", ") : "";
  const author = String(data.AUTR).replace("#", " ");
  const loc = data.LOCA;
  const affe = data.AFFE;
  const cate = data.CATE;
  const phot = data.PHOT;

  const img = image(data);

  return (
    <Link
      target="_blank"
      style={{ textDecoration: "none" }}
      to={`/notice/mnr/${REF}`}
      className="list-card"
      key={REF}
    >
      <div className="thumbnail">{img}</div>
      <div className="content">
        <p>{author}</p>
        <div style={{ display: "flex" }}>
          <h2>
            {capitalizeFirstLetter(title)}
            <br />
            <small>{categories}</small>
          </h2>
          <span>
            <small className="base">Mnr</small>
            <br />
            {INV}
          </span>
        </div>
        <div>
          <p>{domn}</p>
          <p>{loc}</p>
          <p>{affe}</p>
          <p>{cate}</p>
          <p>{phot}</p>
        </div>
      </div>
    </Link>
  );
};

const Joconde = ({ data, index }) => {
  const REF = data.REF;
  const categories = data.DENO ? data.DENO.join(", ") : "";
  const title = data.TICO || data.TITR;
  const author = joinData([data.AUTR, data.ECOL, data.EPOQ]);
  const peri = data.PERI;
  const loc = data.LOCA;
  const img = image(data);

  return (
    <Link
      target="_blank"
      style={{ textDecoration: "none" }}
      to={`/notice/joconde/${REF}`}
      className="list-card"
      key={REF}
    >
      <div className="thumbnail">{img}</div>
      <div className="content">
        <div style={{ display: "flex" }}>
          <h2>
            {capitalizeFirstLetter(title)}
            <br />
            <small>{categories}</small>
          </h2>
          <span>
            <small className="base">Joconde</small>
            <br />
            {REF}
          </span>
        </div>
        <img src={mdf} className="mdf" />
        <div>
          <p>{author}</p>
          <p>{peri}</p>
          <p>{loc}</p>
        </div>
      </div>
    </Link>
  );
};
