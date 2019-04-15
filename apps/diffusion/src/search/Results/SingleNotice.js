import React from "react";
import Link from "next/link";
import shave from "shave";
import { image } from "../../services/image";

const joinData = f => {
  return f
    .map(x => x && String(x).trim())
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

export default class SingleNotice extends React.Component {
  constructor(props) {
    super(props);
    this.titleRef = React.createRef();
  }

  componentDidMount() {
    shave(this.titleRef.current, 100);
  }

  render() {
    const { data } = this.props;
    let content = {};
    const index = data._index.replace(/[0-9]+/, "");
    switch (index) {
      case "joconde":
        content = {
          title: getJocondeTitle(data),
          ref: data.REF,
          categories: data.DENO ? data.DENO.join(", ") : "",
          author: joinData([data.AUTR, data.ECOL, data.EPOQ]),
          data: data.MILL || data.PERI || data.EPOQ || "",
          loc: data.LOCA
        };
        break;
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
          loc: data.LOCA ? joinData([data.LOCA]) : joinData([data.REG, data.DPT, data.COM]),
          spe: data.DPRO
        };
        break;
      case "memoire":
        content = {
          title: data.TICO,
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
      <div className="map-single-notice">
        {this.props.onClose ? (
          <div onClick={this.props.onClose} className="closeButton">
            X
          </div>
        ) : null}
        <div className="thumbnail">{image(data)}</div>
        <div className="content">
          <div style={{ display: "flex" }}>
            <h2 ref={this.titleRef}>
              {capitalizeFirstLetter(content.title)}
              <br />
              <small>{content.categories}</small>
            </h2>
          </div>
          <p>{content.subtitle}</p>
          <div>
            <p>{content.author}</p>
            <p>{content.data}</p>
            <p>{content.loc}</p>
          </div>
          <div className="bottom">
            <span>
              <span className="base">{bases[index]}</span>
              <br />
              {data.REF}
            </span>
            <Link href={`/notice/${index}/${data.REF}`} key={data.REF}>
              <a style={{ textDecoration: "none" }} className="more">
                Détails
              </a>
            </Link>
          </div>
        </div>
        <style jsx>{`
          .search-map .map-single-notice {
            display: flex;
            flex-direction: column;
            overflow: hidden;
            background-color: white;
          }

          .search-map .map-single-notice .content {
            padding: 0px 10px 0px 10px;
            overflow: hidden;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .search-map .map-single-notice .thumbnail {
            background-color: #f8f8f8;
            display: flex;
            flex-direction: unset;
            justify-content: center;
            align-items: center;
          }

          .search-map .map-single-notice img {
            max-width: 270px;
            max-height: 255px;
            object-fit: cover;
          }

          .search-map .map-single-notice img.no-img {
            width: 190px;
            height: 140px;
          }

          .search-map .map-single-notice .content .categories {
            font-size: 9px;
            color: #808d9e;
            font-weight: 300;
            margin-bottom: 10px;
          }

          .search-map .map-single-notice h2 {
            font-weight: 600;
            color: #2a282b;
            margin-bottom: 0;
            font-size: 1.2rem;
            padding-top: 5px;
          }

          .search-map .map-single-notice h3 {
            font-weight: 600;
            font-size: 16px;
            color: #2a282b;
            margin-bottom: 0;
          }

          .search-map .map-single-notice span {
            font-weight: 400;
            font-size: 12px;
            color: #19414c;
            margin-left: auto;
          }

          .search-map .map-single-notice p {
            color: #2a282b;
            font-weight: 400;
            font-size: 14px;
            margin-bottom: 5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .search-map .map-single-notice .bottom {
            display: flex;
            flex-direction: row-reverse;
          }

          .search-map .map-single-notice .more {
            background-color: #377d87;
            border: 0;
            color: #fff;
            padding: 3px 3px 1px;
            display: block;
            width: 150px;
            text-align: center;
            font-size: 14px;
            font-weight: 400;
            justify-content: space-between;
            box-shadow: 1px 2px 2px 0 rgba(197, 197, 197, 0.5);
            border-radius: 5px;
            height: 26px;
            margin-top: 10px;
          }
        `}</style>
      </div>
    );
  }
}

function getJocondeTitle(notice) {
  if (notice.TITRE) {
    return notice.TITRE;
  }
  if ((notice.DENO || []).length) {
    return notice.DENO.join(", ");
  }

  return (notice.DOMN || []).join(", ");
}
