import React from "react";
import Link from "next/link";
import { image } from "../services/image";

class LinkedNotice extends React.Component {
  render() {
    if (!this.props.links || !this.props.links.length) {
      return null;
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
      <Link href={`/notice/${this.props.notice.collection}/${this.props.notice.REF}`}>
        <a style={{ textDecoration: "none" }} className="card">
          {image(this.props.notice)}
          <div className="content">
            <h3>{this.props.notice.TICO}</h3>
            <p className="categories">{this.props.notice.DENO.join(", ")}</p>
            <div>
              <p>{this.props.notice.DOMN}</p>
              <p>{this.props.notice.AUTR}</p>
            </div>
          </div>
          <style jsx>{`
            .links .linked-notice-container {
              overflow-x: auto;
              max-height: 600px;
            }

            .notice .sidebar-section .linked-notice-container h3 {
              color: #025d59;
              font-weight: 500;
              font-size: 14px;
              margin-bottom: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          `}</style>
        </a>
      </Link>
    );
  }
}

export default LinkedNotice;
