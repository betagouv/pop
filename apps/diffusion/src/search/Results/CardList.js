import React from "react";
import Link from "next/link";
import { getNoticeInfo, saveListRef } from "../../utils";
import Mapping from "../../services/mapping";
import BucketButton from "../../components/BucketButton";
import {toUrlQueryString} from "@popproject/pop-react-elasticsearch";
import router from "next/dist/client/router";

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

function addLineBreak(value){
  return (value) ? value.split("#").map( (element) => <p>{element}</p>): null;
}

export const Memoire = ({ data, removeFromBucket, searchParams, listRefs}) => {
  const { title, subtitle, logo, image_preview } = getNoticeInfo(data);

  const LogoComponent = logo ? <img src={logo} className="producteur mh" /> : <div />;
  const ImageComponent = <img src={image_preview} alt={title} />;

  const content = joinData([
    data.EDIF,
    data.LEG
  ]);

  const contentSerieTitre = joinData([
    data.SERIE,
    data.TITRE,
  ]);

  const contentWcomOrCom = data.WCOM && data.WCOM.length > 0 ? data.WCOM : data.COM;
  const contentWadrsOrAdresse = data.WADRS && data.WADRS.length > 0 ? data.WADRS  : data.ADRESSE;

  const contentLoca = joinData([
    data.PAYS,
    data.REG,
    data.DPT_LETTRE,
    contentWcomOrCom,
    contentWadrsOrAdresse,
  ]);

  const author = data.AUTP ? data.AUTP.join(' ; ') : "";

  const date = data.DATPV ? data.DATPV : data.DATOR;
  const loc = contentLoca && contentLoca != "" ? contentLoca : data.LOCA;

  return (
    <a className="list-card" onClick={() => saveListRef(listRefs, searchParams, removeFromBucket)} style={{ textDecoration: "none" }}>
      <div className="list-card-container ">
        <Link href={`/notice/memoire/${data.REF}${searchParams ? "?"+toUrlQueryString(searchParams) : "" }`} key={data.REF}>
          <div className="leftContent">
            <div className="thumbnail">{ImageComponent}</div>
            <div className="content">
              <div className="cardTextContent" style={{ display: "flex" }}>
                <h2>
                  {content}
                  <br />
                </h2>
              </div>
              <p> {data.AUTOEU && data.AUTOEU.length > 0 ? "Auteur de l’œuvre représentée : " + data.AUTOEU.join(' ; ') : "" }</p>
              <p>{loc}</p>
              <p>{data.TYPDOC}</p>
              <p>{author}</p>
              <p>{date}</p>
              <p>{contentSerieTitre}</p>
              <p>{data.COPY}</p>
            </div>
          </div>
        </Link>
        <div className="rightContent">
          <span>
            <small className="base">Mémoire</small>
            <br />
            {data.REF}
          </span>
          <BucketButton base="memoire" reference={data.REF} removeFromBucket={removeFromBucket} />
          {LogoComponent}
        </div>
      </div>
    </a>
  );
};

export const Palissy = ({ data, removeFromBucket, searchParams, listRefs}) => {
  const { title, subtitle, logo, image_preview, localisation } = getNoticeInfo(data);
  const ImageComponent = <img src={image_preview} alt={title} />;

  const LogoComponent = logo ? <img src={logo} className="producteur mh" /> : <div />;

  const line3 = joinData([data.CATE, data.MATR]);
  const line4 = joinData([data.AUTR, data.SCLE]);
  const line5 = joinData([data.STAT, data.DPRO]);

  return (
      <a className="list-card" onClick={() => saveListRef(listRefs, searchParams, removeFromBucket)} style={{ textDecoration: "none" }}>
        <div className="list-card-container ">
          <Link href={`/notice/palissy/${data.REF}${searchParams ? "?"+toUrlQueryString(searchParams) : "" }`} key={data.REF}>
            <div className="leftContent">
              <div className="thumbnail">{ImageComponent}</div>
              <div className="content">
                <div className="cardTextContent" style={{ display: "flex" }}>
                  <h2>
                    {title}
                    <br />
                    <small>{subtitle}</small>
                  </h2>
                  <div>
                    <p>{localisation}</p>
                    <p>{line3}</p>
                    <p>{line4}</p>
                    <p>{line5}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className="rightContent">
            <span>
              <small className="base">Palissy</small>
              <br />
              {data.REF}
            </span>
            <BucketButton base="palissy" reference={data.REF} removeFromBucket={removeFromBucket} />
            {LogoComponent}
          </div>
        </div>
      </a>
  );
};

export const Merimee = ({ data, removeFromBucket, searchParams, listRefs}) => {
  const { title, logo, image_preview, localisation } = getNoticeInfo(data);
  const LogoComponent = logo ? <img src={logo} className="producteur mh" /> : <div />;
  const ImageComponent = <img src={image_preview} alt={title} />;

  const line3 = joinData([data.AUTR, data.SCLE]);
  const line4 = joinData([data.STAT, data.DPRO]);

  return (
    <a className="list-card" onClick={() => saveListRef(listRefs, searchParams, removeFromBucket)} style={{ textDecoration: "none" }}>
      <div className="list-card-container ">
        <Link href={`/notice/merimee/${data.REF}${searchParams ? "?"+toUrlQueryString(searchParams) : "" }`} key={data.REF}>
          <div className="leftContent">
            <div className="thumbnail">{ImageComponent}</div>
            <div className="content">
              <div className="cardTextContent">
                <h2>{title}</h2>
                <div>
                  <p>{localisation}</p>
                  <p>{line3}</p>
                  <p>{line4}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className="rightContent">
          <span>
            <small className="base">Mérimée</small>
            <br />
            {data.REF}
          </span>
          <BucketButton base="merimee" reference={data.REF} removeFromBucket={removeFromBucket} />
          {LogoComponent}
        </div>
      </div>
    </a>
  );
};

export const Mnr = ({ data, removeFromBucket, searchParams, listRefs }) => {
  const { title, subtitle, image_preview, logo, classProducteur } = getNoticeInfo(data);
  const classP = `producteur ${classProducteur}`;
  const LogoComponent = logo ? <img src={logo} className={classP} /> : <div />;
  const ImageComponent = <img src={image_preview} alt={title} />;

  const domn = data.DOMN ? data.DOMN.join(", ") : "";

  return (
      <a className="list-card" onClick={() => saveListRef(listRefs, searchParams, removeFromBucket)} style={{ textDecoration: "none" }}>
        <div className="list-card-container ">
          <Link href={`/notice/mnr/${data.REF}${searchParams ? "?"+toUrlQueryString(searchParams) : "" }`} key={data.REF}>
            <div className="leftContent">
              <div className="thumbnail">{ImageComponent}</div>
              <div className="content">
                <div className="cardTextContent">
                  <p>{data.AUTR.length > 0 ? <p>{ addLineBreak(data.AUTR.join(', '))}</p> : ""}</p>
                  <h2>
                    {addLineBreak(title)}
                    <br />
                    <small>{addLineBreak(subtitle)}</small>
                  </h2>
                  <div>
                    <p>{addLineBreak(domn)}</p>
                    { (data.LOCA && data.LOCA !== "") ? <><p>{Mapping.mnr["LOCA"].label + " : "}</p><>{addLineBreak(data.LOCA)}</></>: null }
                    { (data.AFFE && data.AFFE !== "") ? <><p>{Mapping.mnr["AFFE"].label + " : "}</p><>{addLineBreak(data.AFFE)}</></>: null }
                    <p>{addLineBreak(data.CATE)}</p>
                    <p>{addLineBreak(data.PHOT)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className="rightContent">
            <span>
              <small className="base">{ data.PRODUCTEUR }</small>
              <br />
              {data.INV}
            </span>
            <BucketButton base="mnr" reference={data.REF} removeFromBucket={removeFromBucket} />
            {LogoComponent}
          </div>
        </div>
      </a>
  );
};


export const Joconde = ({ data, removeFromBucket, searchParams, listRefs}) => {
  const { title, subtitle, image_preview } = getNoticeInfo(data);
  const ImageComponent = <img src={image_preview} alt={title} />;
  const author = joinData([data.AUTR, data.ECOL, data.EPOQ]);
  let peri = pickFirst([data.MILL, data.PERI, data.EPOQ]);
  if (peri === author) {
    peri = "";
  }

  const loca = joinData([data.VILLE_M, data.NOMOFF]);

  

  return (
    <div>
      <a className="list-card" onClick={() => saveListRef(listRefs, searchParams, removeFromBucket)} style={{ textDecoration: "none" }}>
        <div className="list-card-container ">
          <Link href={`/notice/joconde/${data.REF}${searchParams ? "?"+toUrlQueryString(searchParams) : "" }`}  key={data.REF}>
            <div className="leftContent">
              <div className="thumbnail">{ImageComponent}</div>
              <div className="content">
                <div className="cardTextContent" style={{ display: "flex" }}>
                  <h2>
                    {addLineBreak(title)}
                    <br />
                    <small>{addLineBreak(subtitle)}</small>
                  </h2>
                  <div>
                    <p>{addLineBreak(author)}</p>
                    <p>{addLineBreak(peri)}</p>
                    <p>{addLineBreak(loca)}</p>
                  </div>
                </div>                
              </div>
            </div>
          </Link>
          <div className="rightContent">
            <span>
              <small className="base">Joconde</small>
              <br />
              {data.REF}
            </span>
            <div>
              <BucketButton base="joconde" reference={data.REF} removeFromBucket={removeFromBucket} />
            </div>
            <img src="/static/musee-de-france.png" className="producteur" />
          </div>
        </div>
      </a>
    </div>
  );
};

export const Museo = ({ data, removeFromBucket, searchParams, listRefs}) => {
  const { title, subtitle, image_preview, localisation } = getNoticeInfo(data);
  const ImageComponent = <img src={image_preview} alt={title} />;

  return (
    <a className="list-card" onClick={() => saveListRef(listRefs, searchParams, removeFromBucket)} style={{ textDecoration: "none" }}>
        <div className="list-card-container ">
          <Link href={`/notice/museo/${data.REF}${searchParams ? "?"+toUrlQueryString(searchParams) : "" }`} key={data.REF}>
            <div className="leftContent">
              <div className="thumbnail">{ImageComponent}</div>
              <div className="content">
                <div className="cardTextContent">
                  <h2>
                    {title}
                    <br />
                    <small>{subtitle}</small>
                  </h2>
                  <div>
                    <p>{data.NOMOFF ? "" : data.NOMUSAGE}</p>
                    <p>{localisation}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className="rightContent">
            <span>
              <small className="base">Museo</small>
              <br />
              {data.REF}
            </span>
            <BucketButton base="museo" reference={data.REF} removeFromBucket={removeFromBucket} />
            <img src="/static/musee-de-france.png" className="producteur" />
          </div>
        </div>
      </a>
  );
};

export const Enluminures = ({ data, removeFromBucket, searchParams, listRefs}) => {
  const REF = data.REF;
  const { title, subtitle, image_preview } = getNoticeInfo(data);
  const ImageComponent = <img src={image_preview} alt={title} />;

  return (
      <a className="list-card" onClick={() => saveListRef(listRefs, searchParams, removeFromBucket)} style={{ textDecoration: "none" }}>
        <div className="list-card-container ">
          <Link href={`/notice/enluminures/${REF}${searchParams ? "?"+toUrlQueryString(searchParams) : "" }`} key={REF}>
            <div className="leftContent">
              <div className="thumbnail">{ImageComponent}</div>
              <div className="content">
                <div className="cardTextContent">
                  <h2>
                    {title}
                    <br />
                    <small>{subtitle}</small>
                  </h2>
                  <div>
                    <p>{data.ATTRIB}</p>
                    <p>{[data.DATE, data.ORIGG, data.ORIGH].filter(d => d).join(", ")}</p>
                    <p>{[data.CONTXT, data.NOMENC.join(", "), data.REFD].filter(d => d).join(", ")}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className="rightContent">
            <span>
              <small className="base">Enluminures</small>
              <br />
              {REF}
            </span>
            <BucketButton base="enluminures" reference={data.REF} removeFromBucket={removeFromBucket} />
          </div>
        </div>
      </a>
  );
};

export const Autor = ({ data, removeFromBucket, searchParams, listRefs}) => {
  const REF = data.REF;
  const { logo, nom, description, fonction, image_preview, symbole } = getNoticeInfo(data);
  const ImageComponent = <img src={image_preview} />;
  const LogoComponent = logo ? <img src={logo} className="producteur mh" /> : <div />;


  return (
      <a className="list-card" onClick={() => saveListRef(listRefs, searchParams, removeFromBucket)} style={{ textDecoration: "none" }}>
        <div className="list-card-container ">
          <Link href={`/notice/autor/${REF}${searchParams ? "?"+toUrlQueryString(searchParams) : "" }`} key={REF}>
            <div className="leftContent">
              <div className="thumbnail">{ImageComponent}</div>
              <div className="content">
                <div className="cardTextContent">
                  <h2>
                    {nom}<br />
                    {description}
                  </h2>
                  <div>
                    <p>{fonction}</p>
                    <p>{symbole}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className="rightContent">
            <span>
              <small className="base">Autor</small>
              <br />
              {REF}
            </span>
            <BucketButton base="autor" reference={data.REF} removeFromBucket={removeFromBucket} />
            {LogoComponent}
          </div>
        </div>
      </a>
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
          justify-content: space-between;
        }

        .list-card .list-card-container:hover {
          box-shadow: 0 3px 6px 0 rgba(189, 189, 189, 1);
        }

        .list-card .content {
          padding: 15px 30px 10px 0;
          overflow: hidden;
          width: 80%;
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
          right: 7px;
          bottom: 7px;
        }
        .list-card img.producteur.mh {
          width: 100px;
        }

        .list-card img.producteur.jdpso{
          width: 80px;
        }

        .leftContent{
          display: flex;
          width: 76%;
        }

        .cardTextContent{
          display: flex;
          flex-direction: column;
          width: 80%;
        }

        .rightContent{
          display: flex;
          flex-direction: column;
          margin-right: 8px;
          margin-top: 8px;
          align-items: flex-end;
          justify-content: space-around;
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

export default ({ data, searchParams, listRefs, idQuery }) => {
  const index = data._index.replace(/[0-9]+/, "");
  searchParams.set("idQuery", idQuery);
  switch (index) {
    case "joconde":
      return withStyle(<Joconde data={data._source} searchParams={searchParams} listRefs={listRefs}/>);
    case "mnr":
      return withStyle(<Mnr data={data._source} searchParams={searchParams} listRefs={listRefs}/>);
    case "merimee":
      return withStyle(<Merimee data={data._source} searchParams={searchParams} listRefs={listRefs}/>);
    case "palissy":
      return withStyle(<Palissy data={data._source} searchParams={searchParams} listRefs={listRefs}/>);
    case "memoire":
      return withStyle(<Memoire data={data._source} searchParams={searchParams} listRefs={listRefs}/>);
    case "museo":
      return withStyle(<Museo data={data._source} searchParams={searchParams} listRefs={listRefs}/>);
    case "enluminures":
      return withStyle(<Enluminures data={data._source} searchParams={searchParams} listRefs={listRefs}/>);
    case "autor":
      return withStyle(<Autor data={data._source} searchParams={searchParams} listRefs={listRefs}/>);
  }
};
