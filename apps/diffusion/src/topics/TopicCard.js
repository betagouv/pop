import React from "react";
import Link from "next/link";
import { Card, CardTitle, CardBody } from "reactstrap";
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
              <img src={img} alt={txt} className="card-img" height="220" />
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
            height: 150px;
            object-fit: cover;
          }

          .topic-card :global(.card-title) {
            font-weight: 700;
            padding-top: 10px;
            text-align: center;
            font-size: 16px;
            color: #025d59;
            height: 75px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-bottom: 0px;
            align-items: center;
            padding: 5px;
          }

          .topic-card :global(.card-body) {
            padding: 0px;
          }

          .topic-card :global(.card-title p) {
            font-weight: 500 !important;
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
