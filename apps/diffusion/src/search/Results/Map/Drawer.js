import React, { Component } from "react";
import Link from "next/link";
import { Col, Row } from "reactstrap";
import { image } from "./../../../services/image";

export default class Drawer extends Component {
  state = {
    selectedNotice: null
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps && this.props) {
      this.setState({ selectedNotice: null });
    }
  }

  renderNoticeContent(notice) {
    switch (notice._type) {
      case "joconde":
        return <Joconde notice={notice._source} />;
      case "palissy":
        return <Palissy notice={notice._source} />;
      case "merimee":
        return <Merimee notice={notice._source} />;
      default:
        return null;
    }
  }

  renderNoticeMini(notice) {
    switch (notice._type) {
      case "joconde":
        return <JocondeMini notice={notice._source} />;
      case "palissy":
        return <PalissyMini notice={notice._source} />;
      case "merimee":
        return <MerimeeMini notice={notice._source} />;
      default:
        return null;
    }
  }

  renderNotice(notice) {
    return (
      <div className="drawer">
        <div
          className="drawer-back"
          onClick={() => {
            if (this.state.selectedNotice) {
              this.setState({ selectedNotice: null });
              return;
            }
            this.props.onClose(null);
          }}
        >
          x
        </div>
        <div className="drawer-content">{this.renderNoticeContent(notice)}</div>
        <div>
          <Link prefetch href={`/notice/${notice._type}/${notice._source.REF}`}>
            <a target="_blank">Voir la notice complète</a>
          </Link>
        </div>
      </div>
    );
  }

  renderNotices(notices) {
    let message = "";
    if (notices.length == 100) {
      message = "Seules les 100 premières notices sont affichées";
    }

    const arr = notices.map(notice => (
      <div
        className="mini"
        onClick={() => {
          this.setState({ selectedNotice: notice });
        }}
      >
        {this.renderNoticeMini(notice)}
      </div>
    ));
    return (
      <div className="drawer">
        <div
          className="drawer-back"
          onClick={() => {
            this.props.onClose(null);
          }}
        >
          x
        </div>
        <p className="legend">{message}</p>
        <div className="drawer-content">{arr}</div>
      </div>
    );
  }
  render() {
    if (!this.props.notices) {
      return null;
    }

    if (this.state.selectedNotice) {
      return this.renderNotice(this.state.selectedNotice);
    }

    if (this.props.notices.length === 1) {
      return this.renderNotice(this.props.notices[0]);
    }

    return this.renderNotices(this.props.notices);
  }
}

const joinData = f => {
  return f
    .map(x => x && String(x).trim())
    .filter(x => x)
    .join(" ; ");
};

const Joconde = ({ notice }) => {
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
    </div>
  );
};

const JocondeMini = ({ notice }) => {
  const title = notice.TICO || notice.TITR;
  const img = image(notice);
  return (
    <Row>
      <Col md={3} className="img-col">
        {img}
      </Col>
      <Col md={9}>
        <div className="drawer-title-mini">{title}</div>
      </Col>
    </Row>
  );
};

const PalissyMini = ({ notice }) => {
  const title = notice.TICO || notice.TITR;
  const img = image(notice);
  return (
    <Row>
      <Col md={3} className="img-col">
        {img}
      </Col>
      <Col md={9}>
        <div className="drawer-title-mini">{title}</div>
      </Col>
    </Row>
  );
};

const Palissy = ({ notice }) => {
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
    </div>
  );
};

const MerimeeMini = ({ notice }) => {
  const title = notice.TICO || notice.TITR;
  const img = image(notice);
  return (
    <Row>
      <Col md={3} className="img-col">
        {img}
      </Col>
      <Col md={9}>
        <div className="drawer-title-mini">{title}</div>
      </Col>
    </Row>
  );
};

const Merimee = ({ notice }) => {
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
    </div>
  );
};
