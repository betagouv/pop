import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardTitle, CardBody } from "reactstrap";
import queryString from "query-string";
import "./TopicCard.css";

class TopicCard extends React.Component {
  searchUrl = data => {
    const jsonData = Object.assign(
      ...Object.entries(data).map(([k, v]) => ({ [k]: JSON.stringify(v) }))
    );
    const qsData = queryString.stringify(jsonData);
    return `/search/mosaique?${qsData}&image=["oui"]`;
  }

  render() {
    const { img, txt, url } = this.props;
    return (
      <div className="topic-card">
        <Link to={this.searchUrl(url)}>
          <Card>
            <CardImg src={img} alt={txt} className="card-img" />
            <CardBody>
              <CardTitle>{txt}</CardTitle>
            </CardBody>
          </Card>
        </Link>
      </div>
    );
  }
}

export default TopicCard;
