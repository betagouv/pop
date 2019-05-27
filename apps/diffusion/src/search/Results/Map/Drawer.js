import React, { Component } from "react";
import Link from "next/link";
import { Col, Row } from "reactstrap";
import { image } from "./../../../services/image";
import { getNoticeInfo } from "../../../utils";

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
    const { title, image } = getNoticeInfo(notice);
    return (
      <Row>
        <Col md={3} className="img-col">
          <img src={image} alt={title} />;
        </Col>
        <Col md={9}>
          <div className="drawer-title-mini">{title}</div>
        </Col>
      </Row>
    );
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
          <Link href={`/notice/${notice._type}/${notice._source.REF}`}>
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
  const { title, subtitle, image } = getNoticeInfo(notice);
  const author = joinData([notice.AUTR, notice.ECOL, notice.EPOQ]);
  const peri = notice.PERI;
  const loc = notice.LOCA;
  return (
    <div>
      <div className="drawer-title">{title}</div>
      <img src={image} alt={title} />
      <div className="description">
        <p>{subtitle}</p>
        <p>{author}</p>
        <p>{peri}</p>
        <p>{loc}</p>
      </div>
    </div>
  );
};

const Palissy = ({ notice }) => {
  const { title, subtitle, localisation, image } = getNoticeInfo(notice);
  const author = notice.AUTR ? notice.AUTR.join(", ") : "";
  const siecle = notice.SCLE ? notice.SCLE.join(", ") : "";

  return (
    <div>
      <div className="drawer-title">{title}</div>
      <img src={image} alt={title} />;
      <div className="description">
        <p>{subtitle}</p>
        <p>{author}</p>
        <p>{siecle}</p>
        <p>{localisation}</p>
      </div>
    </div>
  );
};

const Merimee = ({ notice }) => {
  const { title, subtitle, localisation, image } = getNoticeInfo(notice);

  const author = notice.AUTR ? notice.AUTR.join(", ") : "";
  const siecle = notice.SCLE ? notice.SCLE.join(", ") : "";

  return (
    <div>
      <div className="drawer-title">{title}</div>
      <img src={image} alt={title} />;
      <div className="description">
        <p>{subtitle}</p>
        <p>{author}</p>
        <p>{siecle}</p>
        <p>{localisation}</p>
      </div>
    </div>
  );
};
