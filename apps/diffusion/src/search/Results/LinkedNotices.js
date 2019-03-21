import React from "react";
import shave from "shave";
import { image } from "../../services/image";
import Loader from "../../components/Loader";
import SingleNotice from "./SingleNotice";

export default class LinkedNotices extends React.Component {
  state = {
    singleNotice: null
  };

  onBackClicked = () => {
    this.setState({ singleNotice: null });
  };

  onSmallNoticeClicked = item => {
    this.setState({
      singleNotice: (
        <div>
          <div onClick={this.onBackClicked} className="back">
            <div className="back-text">&lt; retour à la liste</div>
            <div onClick={this.props.onClose}>X</div>
          </div>
          <SingleNotice className="" key={item.REF} data={item} />
        </div>
      )
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.links !== prevProps.links) {
      this.setState({ singleNotice: null });
    }
  }

  render() {
    if (!this.props.links) {
      return <Loader />;
    }

    if (!this.props.links.length) {
      return null;
    }

    if (this.state.singleNotice) {
      return this.state.singleNotice;
    }

    const notices = this.props.links.map(notice => (
      <SmallNotice notice={notice} key={notice.REF} onClicked={this.onSmallNoticeClicked} />
    ));
    return (
      <div className="sidebar-section links">
        <div onClick={this.props.onClose} className="closeButton">
          X
        </div>
        <h6>Ce point est liée aux notices suivantes</h6>
        <div className="linked-notice-container">{notices}</div>
      </div>
    );
  }
}

class SmallNotice extends React.Component {
  constructor(props) {
    super(props);
    this.titleRef = React.createRef();
  }

  componentDidMount() {
    shave(this.titleRef.current, 50);
  }

  render() {
    return (
      <div
        style={{ textDecoration: "none" }}
        className="card"
        onClick={() => this.props.onClicked(this.props.notice)}
      >
        {image(this.props.notice)}
        <div className="content">
          <h2 ref={this.titleRef}>{this.props.notice.TICO}</h2>
          <p className="categories">{this.props.notice.DENO.join(", ")}</p>
          <div>
            <p>{this.props.notice.DOMN}</p>
            <p>{this.props.notice.AUTR}</p>
          </div>
        </div>
        <style jsx>{`
          .search-map .links {
            padding: 15px;
          }

          .search-map .links .linked-notice-container {
            overflow-x: auto;
            max-height: 535px;
          }

          .search-map .links .card {
            display: flex;
            flex-direction: row;
            margin-bottom: 15px;
            box-shadow: 0 2px 4px 0 rgba(189, 189, 189, 0.5);
            transition: 0.3s;
            height: 110px;
            overflow: hidden;
          }

          .search-map .links .card:hover {
            box-shadow: 0 3px 6px 0 rgba(189, 189, 189, 1);
          }

          .search-map .links .card .content {
            padding: 10px 10px 10px 0;
            overflow: hidden;
            width: 100%;
          }

          .search-map .links .card .content h2 {
            font-size: 0.6rem;
            margin-bottom: 0.1rem;
          }

          .search-map .links .card img {
            width: 120px;
            margin-right: 15px;
          }
          .search-map .links .card .content .categories {
            font-size: 10px;
            color: #808d9e;
            font-weight: 300;
            margin-bottom: 5px;
          }
          .search-map .links .card h1 {
            color: #025d59;
            font-weight: 700;
            font-size: 14px;
            margin-bottom: 0;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .search-map .links .card p {
            color: #484848;
            font-weight: 400;
            font-size: 10px;
            line-height: 14px;
            white-space: nowrap;
            margin-bottom: 0;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .search-map .back {
            margin: 15px;
            cursor: pointer;
            display: flex;
            flex-direction: row;
          }

          .search-map .back .back-text {
            flex: 1;
          }
        `}</style>
      </div>
    );
  }
}
