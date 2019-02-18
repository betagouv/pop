import React from "react";
import Link from "next/link";
import { Card, CardImg, CardTitle, CardBody } from "reactstrap";
import queryString from "query-string";
import "./TopicCard.css";

const toReactiveSearchParams = params => {
  return Object.assign(...Object.entries(params).map(([k, v]) => ({ [k]: JSON.stringify(v) })));
};

class TopicCard extends React.Component {
  render() {
    const { img, txt } = this.props;
    const params = { ...this.props.params, image: ["oui"] };
    const href = `/search/mosaic?${queryString.stringify({
      view: "mosaic",
      mode: "simple",
      ...toReactiveSearchParams(params)
    })}`;
    const alias = `/search/mosaic?${queryString.stringify(toReactiveSearchParams(params))}`;
    
    return (
      <div className="topic-card">
        <Link href={href} as={alias}>
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
