import React from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardTitle, CardBody } from "reactstrap";
import "./index.css";

class TopicCard extends React.Component {
  render() {
    const img =
      this.props.img ||
      "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97270&w=318&h=270&bg=333333&txtclr=666666";
    const txt = this.props.txt;
    const url = this.props.url || "#";
    return (
      <div className="topic-card">
        <Link to={url}>
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
