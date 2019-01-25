import React from "react";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { image } from "../search/image";
import "./LinkedNotices.css";
class LinkedNotice extends React.Component {
  render() {
    if (!this.props.links) {
      return <Loader />;
    }

    if (!this.props.links.length) {
      return <div />;
    }
    const notices = this.props.links.map(notice => (
      <SmallNotice notice={notice} key={notice.REF} />
    ));
    return (
      <div className="sidebar-section links">
        <h2>Notices liées</h2>
        <div className="linked-notice-container">{notices}</div>
      </div>
    );
  }
}

class SmallNotice extends React.Component {
  render() {
    return (
      <Link
        style={{ textDecoration: "none" }}
        to={`/notice/${this.props.notice.collection}/${this.props.notice.REF}`}
        className="card"
      >
        {image(this.props.notice)}
        <div className="content">
          <h3>{this.props.notice.TICO}</h3>
          <p className="categories">{this.props.notice.DENO.join(", ")}</p>
          <div>
            <p>{this.props.notice.DOMN}</p>
            <p>{this.props.notice.AUTR}</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default LinkedNotice;
