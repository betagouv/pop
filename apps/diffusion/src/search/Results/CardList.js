import React from "react";
import Link from "next/link";
import { image } from "./../../services/image";
import "./CardList.css";

const joinData = f => {
  return f
    .map(x => x && String(x).trim())
    .filter(x => x)
    .join(" ; ");
};

const capitalizeFirstLetter = s => {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export default ({ data }) => {
  const index = data._index.replace(/[0-9]+/, "");
  switch (index) {
    case "joconde":
      return <Joconde data={data} />;
    case "mnr":
      return <Mnr data={data} />;
    case "merimee":
      return <Merimee data={data} />;
    case "palissy":
      return <Palissy data={data} />;
    case "memoire":
      return <Memoire data={data} />;
    case "museo":
      return <Museo data={data} />;
    case "enluminures":
      return <Enluminures data={data} />;
  }
};

const Memoire = ({ data }) => {
  const content = {
    title: data.TICO || data.LEG || `${data.EDIF || ""} ${data.OBJ || ""}`.trim(),
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
  const productorImage = p => {
    if (p === "CRMH") {
      return <img src="/static/mh.png" className="producteur mh" />;
    }
    return null;
  };
  return (
    <Link href={`/notice/memoire/${data.REF}`} key={data.REF}>
      <a className="list-card" target="_blank" style={{ textDecoration: "none" }}>
        <div className="list-card-container ">
          <div className="thumbnail">{image(data)}</div>
          <div className="content">
            <div style={{ display: "flex" }}>
              <h2>
                {capitalizeFirstLetter(content.title)}
                <br />
                <small>{content.categories}</small>
              </h2>
              <span>
                <small className="base">Mémoire</small>
                <br />
                {data.REF}
              </span>
            </div>
            <p>{content.subtitle}</p>
            {productorImage(data.PRODUCTEUR)}
            <div>
              <p>{content.author}</p>
              <p>{content.data}</p>
              <p>{content.loc}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

const Palissy = ({ data }) => {
  const title = data.TICO || data.TITR;
  const ref = data.REF;
  const categories = data.DENO ? data.DENO.join(", ") : "";
  const author = data.AUTR ? data.AUTR.join(", ") : "";
  const siecle = data.SCLE ? data.SCLE.join(", ") : "";
  const loc =
    data.LOCA && !data.INSEE2 ? joinData([data.LOCA]) : joinData([data.REG, data.DPT, data.COM]);

  const productorImage = p => {
    if (p === "Inventaire") {
      return <img src="/static/inventaire.jpg" className="producteur" />;
    } else if (p === "Monuments Historiques") {
      return <img src="/static/mh.png" className="producteur mh" />;
    }
    return null;
  };

  return (
    <Link href={`/notice/palissy/${ref}`} key={ref}>
      <a className="list-card" target="_blank" style={{ textDecoration: "none" }}>
        <div className="list-card-container ">
          <div className="thumbnail">{image(data)}</div>
          <div className="content">
            <div style={{ display: "flex" }}>
              <h2>
                {capitalizeFirstLetter(title)}
                <br />
                <small>{categories}</small>
              </h2>
              <span>
                <small className="base">Palissy</small>
                <br />
                {ref}
              </span>
            </div>
            {productorImage(data.PRODUCTEUR)}
            <div>
              <p>{author}</p>
              <p>{siecle}</p>
              <p>{loc}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

const Merimee = ({ data }) => {
  const title = data.TICO || data.TITR;
  const ref = data.REF;
  const categories = data.DENO ? data.DENO.join(", ") : "";
  const author = data.AUTR ? data.AUTR.join(", ") : "";
  const siecle = data.SCLE ? data.SCLE.join(", ") : "";
  const loc = data.LOCA ? joinData([data.LOCA]) : joinData([data.REG, data.DPT, data.COM]);

  const productorImage = p => {
    if (p === "Inventaire") {
      return <img src="/static/inventaire.jpg" className="producteur" />;
    } else if (p === "Monuments Historiques") {
      return <img src="/static/mh.png" className="producteur mh" />;
    }
    return null;
  };

  return (
    <Link href={`/notice/merimee/${ref}`} key={ref}>
      <a className="list-card" target="_blank" style={{ textDecoration: "none" }}>
        <div className="list-card-container ">
          <div className="thumbnail">{image(data)}</div>
          <div className="content">
            <div style={{ display: "flex" }}>
              <h2>
                {capitalizeFirstLetter(title)}
                <br />
                <small>{categories}</small>
              </h2>
              <span>
                <small className="base">Mérimée</small>
                <br />
                {ref}
              </span>
            </div>
            {productorImage(data.PRODUCTEUR)}
            <div>
              <p>{author}</p>
              <p>{siecle}</p>
              <p>{loc}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

const Mnr = ({ data }) => {
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
    <Link href={`/notice/mnr/${REF}`} key={REF}>
      <a className="list-card" target="_blank" style={{ textDecoration: "none" }}>
        <div className="list-card-container ">
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
        </div>
      </a>
    </Link>
  );
};

const Joconde = ({ data }) => {
  const REF = data.REF;
  const categories = data.DENO ? data.DENO.join(", ") : "";
  const title = data.TICO || data.TITR;
  const author = joinData([data.AUTR, data.ECOL, data.EPOQ]);
  const peri = data.PERI;
  const loc = data.LOCA;
  const img = image(data);
  return (
    <Link href={`/notice/joconde/${REF}`} key={REF}>
      <a className="list-card" target="_blank" style={{ textDecoration: "none" }}>
        <div className="list-card-container ">
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
            <img src="/static/musee-de-france.png" className="producteur" />
            <div>
              <p>{author}</p>
              <p>{peri}</p>
              <p>{loc}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

const Museo = ({ data }) => {
  return (
    <Link href={`/museo/${data.REF}`} key={data.REF}>
      <a className="list-card" target="_blank" style={{ textDecoration: "none" }}>
        <div className="list-card-container">
          <div className="content">
            <div style={{ display: "flex" }}>
              <h2>
                {capitalizeFirstLetter(data.NOMOFF || data.NOMANC || data.NOMUSAGE)}
                <br />
                {data.VILLE_M}
              </h2>
              <span>
                <small className="base">MuseoFile</small>
                <br />
                {data.REF}
              </span>
            </div>
            <div>
              <p>{data.ATOUT && data.ATOUT.replace(/#/g, " ; ")} - </p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

const Enluminures = ({ data }) => {
  const REF = data.REF;
  const title = `${data.TITR} - ${data.SUJET}`;
  const img = image(data);

  return (
    <Link href={`/notice/enluminures/${REF}`} key={REF}>
      <a className="list-card" target="_blank" style={{ textDecoration: "none" }}>
        <div className="list-card-container ">
          <div className="thumbnail">{img}</div>
          <div className="content">
            <div style={{ display: "flex" }}>
              <h2>
                {capitalizeFirstLetter(title)}
                <br />
                <small>{data.SUJET}</small>
              </h2>
              <span>
                <small className="base">Enluminures</small>
                <br />
                {REF}
              </span>
            </div>
            <div>
              <p>{data.ATTRIB}</p>
              <p>{[data.DATE, data.ORIGG, data.ORIGH].filter(d => d).join(", ")}</p>
              <p>{[data.CONTXT, data.NOMENC.join(", "), data.REFD].filter(d => d).join(", ")}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};
