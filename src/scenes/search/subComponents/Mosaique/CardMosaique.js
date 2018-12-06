import React from "react";
import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import { image } from "../../image";

export default ({ data }) => (
  <Col l={4}>
    <Link
      style={{ textDecoration: "none" }}
      to={`/notice/${data._index.replace(/[0-9]+/, '')}/${data.REF}`}
      className="mosaique-card"
      key={data.REF}
    >
      <div className="thumbnail">{image(data)}</div>
      <div className="content">
        <span>{data.TICO || data.LEG}</span>
      </div>
    </Link>
  </Col>
);
