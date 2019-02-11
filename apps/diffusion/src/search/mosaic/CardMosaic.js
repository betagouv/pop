import React from "react";
import Link from "next/link";
import { Col } from "reactstrap";
import { image } from "./../../services/image";
import "./CardMosaic.css";
export default ({ data }) => (
  <Col>
    <Link
      href={`/notice/${data._index.replace(/[0-9]+/, "")}/${data.REF}`}
      key={data.REF}
    >
      <a style={{ textDecoration: "none" }} className="mosaique-card">
        <div className="thumbnail">{image(data)}</div>
        <div className="content">
          <span>{data.TICO || data.LEG}</span>
        </div>
      </a>
    </Link>
  </Col>
);
