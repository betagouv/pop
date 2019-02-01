import React from "react";
import Link from "next/link";
import { Card, CardImg, CardTitle, CardBody } from "reactstrap";
import queryString from "query-string";
import "./TopicCard.css";

class TopicCard extends React.Component {
  searchUrl = data => {
    const jsonData = Object.assign(
      ...Object.entries(data).map(([k, v]) => ({ [k]: JSON.stringify(v) }))
    );
    const qsData = queryString.stringify(jsonData);
    return `/search/mosaic?${qsData}&image=["oui"]`;
  };

  render() {
    const { img, txt, url } = this.props;
    return (
      <div className="topic-card">
        <Link href={this.searchUrl(url)}>
          <a>
            <Card>
              <CardImg src={img} alt={txt} className="card-img" />
              <CardBody>
                <CardTitle>{txt}</CardTitle>
              </CardBody>
            </Card>
          </a>
        </Link>
      </div>
    );
  }
}

export default TopicCard;
