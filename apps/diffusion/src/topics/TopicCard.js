import React from "react";
import Link from "next/link";
import { Card, CardImg, CardTitle, CardBody } from "reactstrap";
import queryString from "query-string";

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
        <style jsx>{`
          .topic-card {
            padding-left: 15px;
            padding-right: 15px;
          }
          .topic-card :global(.card-img) {
            width: 100%;
            height: 220px;
            object-fit: cover;
          }

          .topic-card :global(.card-title) {
            font-weight: 700;
            padding-top: 10px;
            text-align: center;
            font-size: 16px;
            color: #025d59;
          }

          .topic-card :global(a:hover) {
            text-decoration: none;
          }

          .topic-card :global(.card:hover) {
            box-shadow: 0 2px 4px 2px #025d592a;
          }
        `}</style>
      </div>
    );
  }
}

export default TopicCard;
