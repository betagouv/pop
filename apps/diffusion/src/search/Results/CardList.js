import React from "react";
import Link from "next/link";
import { getNoticeInfo } from "../../utils";
import Mapping from "../../services/mapping";

// These 3 helpers functions helps to build strings with data
// (witch can be strings, array, array in arrays, etc.)
function withoutEmptyStrings(data) {
  return data
    .map(x => x && (Array.isArray(x) ? x.join(", ").trim() : String(x).trim()))
    .filter(x => x);
}
// Takes `[["foo", "bar"], ["foo"], "bar"]`, returns "foo, bar ; foo ; bar"
function joinData(data) {
  return withoutEmptyStrings(data).join(" ; ");
}
// Takes `[["foo", "bar"], ["foo"], "bar"]`, returns "foo, bar"
function pickFirst(data) {
  let [first] = withoutEmptyStrings(data);
  return first;
}

const Memoire = ({ data }) => {
  const { title, subtitle, logo, image_preview } = getNoticeInfo(data);

  const LogoComponent = logo ? <img src={logo} className="producteur mh" /> : <div />;
  const ImageComponent = <img src={image_preview} alt={title} />;

  const content = joinData([
    data.OBJET,
    data.EDIF,
    data.LEG,
    data.DATOEU,
    data.DATOEU ? "" : data.SCLE
  ]);

  const author = data.AUTP;
  const date = joinData([data.DATPV, data.DATOR]);
  const loc = data.LOCA;

  return (
    <Link href={`/notice/memoire/${data.REF}`} key={data.REF}>
      <a className="list-card" style={{ textDecoration: "none" }}>
        <div className="list-card-container ">
          <div className="thumbnail">{ImageComponent}</div>
          <div className="content">
            <div style={{ display: "flex" }}>
              <h2>
                {title}
                <br />
                <small>{subtitle}</small>
              </h2>
              <span>
                <small className="base">Mémoire</small>
                <br />
                {data.REF}
              </span>
            </div>
            <p>{content}</p>
            {LogoComponent}
            <div>
              <p>{author}</p>
              <p>{date}</p>
              <p>{loc}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

const Palissy = ({ data }) => {
  const { title, subtitle, logo, image_preview, localisation } = getNoticeInfo(data);
  const ImageComponent = <img src={image_preview} alt={title} />;

  const LogoComponent = logo ? <img src={logo} className="producteur mh" /> : <div />;

  const line3 = joinData([data.CATE, data.MATR]);
  const line4 = joinData([data.AUTR, data.SCLE]);
  const line5 = joinData([data.STAT, data.DPRO]);

  return (
    <Link href={`/notice/palissy/${data.REF}`} key={data.REF}>
      <a className="list-card" style={{ textDecoration: "none" }}>
        <div className="list-card-container ">
          <div className="thumbnail">{ImageComponent}</div>
          <div className="content">
            <div style={{ display: "flex" }}>
              <h2>
                {title}
                <br />
                <small>{subtitle}</small>
              </h2>
              <span>
                <small className="base">Palissy</small>
                <br />
                {data.REF}
              </span>
            </div>
            {LogoComponent}
            <div>
              <p>{localisation}</p>
              <p>{line3}</p>
              <p>{line4}</p>
              <p>{line5}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

const Merimee = ({ data }) => {
  const { title, logo, image_preview, localisation } = getNoticeInfo(data);
  const LogoComponent = logo ? <img src={logo} className="producteur mh" /> : <div />;
  const ImageComponent = <img src={image_preview} alt={title} />;

  const line3 = joinData([data.AUTR, data.SCLE]);
  const line4 = joinData([data.STAT, data.DPRO]);

  return (
    <Link href={`/notice/merimee/${data.REF}`} key={data.REF}>
      <a className="list-card" style={{ textDecoration: "none" }}>
        <div className="list-card-container ">
          <div className="thumbnail">{ImageComponent}</div>
          <div className="content">
            <div style={{ display: "flex" }}>
              <h2>{title}</h2>
              <span>
                <small className="base">Mérimée</small>
                <br />
                {data.REF}
              </span>
            </div>
            {LogoComponent}
            <div>
              <p>{localisation}</p>
              <p>{line3}</p>
              <p>{line4}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

const Mnr = ({ data }) => {
  const { title, subtitle, image_preview } = getNoticeInfo(data);
  const ImageComponent = <img src={image_preview} alt={title} />;

  const domn = data.DOMN ? data.DOMN.join(", ") : "";
  const author = String(data.AUTR).replace("#", " ");

  return (
    <Link href={`/notice/mnr/${data.REF}`} key={data.REF}>
      <a className="list-card" style={{ textDecoration: "none" }}>
        <div className="list-card-container ">
          <div className="thumbnail">{ImageComponent}</div>
          <div className="content">
            <p>{author}</p>
            <div style={{ display: "flex" }}>
              <h2>
                {title}
                <br />
                <small>{subtitle}</small>
              </h2>
              <span>
                <small className="base">Mnr</small>
                <br />
                {data.INV}
              </span>
            </div>
            <img src="/static/mnr.png" className="producteur" />
            <div>
              <p>{domn}</p>
              <p>{Mapping.mnr["LOCA"].label + " : " + data.LOCA}</p>
              <p>{Mapping.mnr["AFFE"].label + " : " + data.AFFE}</p>
              <p>{data.CATE}</p>
              <p>{data.PHOT}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

const Joconde = ({ data }) => {
  const { title, subtitle, image_preview } = getNoticeInfo(data);
  const ImageComponent = <img src={image_preview} alt={title} />;
  const author = joinData([data.AUTR, data.ECOL, data.EPOQ]);
  let peri = pickFirst([data.MILL, data.PERI, data.EPOQ]);
  if (peri === author) {
    peri = "";
  }

  const loca = joinData([data.VILLE_M, data.NOMOFF]);

  return (
    <Link href={`/notice/joconde/${data.REF}`} key={data.REF}>
      <a className="list-card" style={{ textDecoration: "none" }}>
        <div className="list-card-container ">
          <div className="thumbnail">{ImageComponent}</div>
          <div className="content">
            <div style={{ display: "flex" }}>
              <h2>
                {title}
                <br />
                <small>{subtitle}</small>
              </h2>
              <span>
                <small className="base">Joconde</small>
                <br />
                {data.REF}
              </span>
            </div>
            <img src="/static/musee-de-france.png" className="producteur" />
            <div>
              <p>{author}</p>
              <p>{peri}</p>
              <p>{loca}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

const Museo = ({ data }) => {
  const { title, subtitle, image_preview } = getNoticeInfo(data);
  const ImageComponent = <img src={image_preview} alt={title} />;

  return (
    <Link href={`/notice/museo/${data.REF}`} key={data.REF}>
      <a className="list-card" style={{ textDecoration: "none" }}>
        <div className="list-card-container ">
          <div className="thumbnail">{ImageComponent}</div>
          <div className="content">
            <div style={{ display: "flex" }}>
              <h2>
                {title}
                <br />
                <small>{subtitle}</small>
              </h2>
              <span>
                <small className="base">Museo</small>
                <br />
                {data.REF}
              </span>
            </div>
            <img src="/static/musee-de-france.png" className="producteur" />
            <div>
              <p>{data.NOMUSAGE}</p>
              <p>{data.VILLE_M}</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

const Enluminures = ({ data }) => {
  const REF = data.REF;
  const { title, subtitle, image_preview } = getNoticeInfo(data);
  const ImageComponent = <img src={image_preview} alt={title} />;

  return (
    <Link href={`/notice/enluminures/${REF}`} key={REF}>
      <a className="list-card" style={{ textDecoration: "none" }}>
        <div className="list-card-container ">
          <div className="thumbnail">{ImageComponent}</div>
          <div className="content">
            <div style={{ display: "flex" }}>
              <h2>
                {title}
                <br />
                <small>{subtitle}</small>
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

const withStyle = component => {
  return (
    <React.Fragment>
      {component}
      <style jsx global>{`
        .list-card {
          width: 100%;
        }

        .list-card .list-card-container {
          display: flex;
          flex-direction: row;
          box-shadow: 0 2px 4px 0 rgba(189, 189, 189, 0.5);
          transition: 0.3s;
          height: 110px;
          overflow: hidden;
          background-color: white;
          height: auto;
          margin: 7px 0px 7px 0px;
          border-radius: 5px;
        }

        .list-card .list-card-container:hover {
          box-shadow: 0 3px 6px 0 rgba(189, 189, 189, 1);
        }

        .list-card .content {
          padding: 15px 30px 10px 0;
          overflow: hidden;
          width: 100%;
          position: relative;
        }
        .list-card .thumbnail {
          width: 290px;
          margin-right: 30px;
          background-color: #f8f8f8;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .list-card img {
          width: 100%;
          height: 200px;
          object-fit: contain;
        }

        .list-card img.no-img {
          width: 190px;
          height: 140px;
        }

        .list-card .content .categories {
          font-size: 18px;
          color: #808d9e;
          font-weight: 300;
          margin-bottom: 10px;
        }

        .list-card h2 {
          font-weight: 600;
          font-size: 18px;
          color: #2a282b;
          margin-bottom: 0;
        }

        .list-card span {
          font-weight: 400;
          font-size: 16px;
          color: #19414c;
          margin-left: auto;
          text-align: right;
        }

        .list-card p {
          color: #2a282b;
          font-weight: 400;
          font-size: 16px;
          margin-bottom: 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .list-card .base {
          float: right;
        }

        .list-card img.producteur {
          width: 50px;
          height: auto;
          position: absolute;
          right: 7px;
          bottom: 7px;
        }
        .list-card img.producteur.mh {
          width: 100px;
        }

        @media screen and (max-width: 767px) {
          .list-card {
            height: 110px;
          }

          .list-card .thumbnail {
            width: 150px;
            margin-right: 10px;
          }

          .list-card img.no-img {
            width: 80px;
            height: 80px;
          }
          .list-card h2 {
            font-size: 15px;
          }
          .list-card p,
          .list-card span {
            font-size: 11px;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

export default ({ data }) => {
  const index = data._index.replace(/[0-9]+/, "");
  switch (index) {
    case "joconde":
      return withStyle(<Joconde data={data._source} />);
    case "mnr":
      return withStyle(<Mnr data={data._source} />);
    case "merimee":
      return withStyle(<Merimee data={data._source} />);
    case "palissy":
      return withStyle(<Palissy data={data._source} />);
    case "memoire":
      return withStyle(<Memoire data={data._source} />);
    case "museo":
      return withStyle(<Museo data={data._source} />);
    case "enluminures":
      return withStyle(<Enluminures data={data._source} />);
  }
};
