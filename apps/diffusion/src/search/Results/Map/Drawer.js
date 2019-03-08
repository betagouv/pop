import React, { Component } from "react";
import Link from "next/link";
import { image } from "./../../../services/image";

export default class Drawer extends Component {
  renderContent(notice) {
    switch (notice._type) {
      case "joconde":
        return <Joconde notice={notice._source} />;
      case "palissy":
        return <Palissy notice={notice._source} />;
      case "merimee":
        return <Merimee notice={notice._source} />;
      default:
        return <div />;
    }
  }
  render() {
    if (!this.props.notice) {
      return <div />;
    }

    return (
      <div className="drawer">
        <div
          className="drawer-back"
          onClick={() => {
            this.props.onClose(null);
          }}
        >
          {"< Retour"}
        </div>
        {this.renderContent(this.props.notice)}
      </div>
    );
  }
}

const joinData = f => {
  return f
    .map(x => x && String(x).trim())
    .filter(x => x)
    .join(" ; ");
};

const Joconde = ({ notice }) => {
  const REF = notice.REF;
  const categories = notice.DENO ? notice.DENO.join(", ") : "";
  const title = notice.TICO || notice.TITR;
  const author = joinData([notice.AUTR, notice.ECOL, notice.EPOQ]);
  const peri = notice.PERI;
  const loc = notice.LOCA;
  const img = image(notice);
  return (
    <div>
      <div className="drawer-title">{title}</div>
      {img}
      <div className="description">
        <p>{categories}</p>
        <p>{author}</p>
        <p>{peri}</p>
        <p>{loc}</p>
      </div>
      <div>
        <Link prefetch href={`/notice/joconde/${REF}`}>
          <a>Voir la notice complète</a>
        </Link>
      </div>
    </div>
  );
};

const Palissy = ({ notice }) => {
  const REF = notice.REF;
  const title = notice.TICO || notice.TITR;
  const categories = notice.DENO ? notice.DENO.join(", ") : "";
  const author = notice.AUTR ? notice.AUTR.join(", ") : "";
  const siecle = notice.SCLE ? notice.SCLE.join(", ") : "";
  const loc =
    notice.LOCA && !notice.INSEE2
      ? joinData([notice.LOCA])
      : joinData([notice.REG, notice.DPT, notice.COM]);
  const img = image(notice);
  return (
    <div>
      <div className="drawer-title">{title}</div>
      {img}
      <div className="description">
        <p>{categories}</p>
        <p>{author}</p>
        <p>{siecle}</p>
        <p>{loc}</p>
      </div>
      <div>
        <Link prefetch href={`/notice/palissy/${REF}`}>
          <a>Voir la notice complète</a>
        </Link>
      </div>
    </div>
  );
};

const Merimee = ({ notice }) => {
  const REF = notice.REF;
  const title = notice.TICO || notice.TITR;
  const categories = notice.DENO ? notice.DENO.join(", ") : "";
  const author = notice.AUTR ? notice.AUTR.join(", ") : "";
  const siecle = notice.SCLE ? notice.SCLE.join(", ") : "";
  const loc =
    notice.LOCA && !notice.INSEE2
      ? joinData([notice.LOCA])
      : joinData([notice.REG, notice.DPT, notice.COM]);
  const img = image(notice);
  return (
    <div>
      <div className="drawer-title">{title}</div>
      {img}
      <div className="description">
        <p>{categories}</p>
        <p>{author}</p>
        <p>{siecle}</p>
        <p>{loc}</p>
      </div>
      <div>
        <Link prefetch href={`/notice/merimee/${REF}`}>
          <a>Voir la notice complète</a>
        </Link>
      </div>
    </div>
  );
};
