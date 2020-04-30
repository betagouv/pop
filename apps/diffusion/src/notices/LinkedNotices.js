import React from "react";
import Link from "next/link";
import { getNoticeInfo } from "../utils";

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
    const { title, image_preview } = getNoticeInfo(this.props.notice);
    return (
      <Link href={`/notice/${this.props.notice.collection}/${this.props.notice.REF}`}>
        <a style={{ textDecoration: "none" }} className="card">
          <img src={image_preview} alt={title} />
          <div className="content">
            <h3>{title}</h3>
            {this.props.notice.DENO ? 
            <p className="categories">{this.props.notice.DENO.join(", ")}</p>
            : <p className="categories">{this.props.notice.CATEG}</p>}
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

            .content h3 {
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
