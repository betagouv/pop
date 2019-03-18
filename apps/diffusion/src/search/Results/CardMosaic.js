import React from "react";
import Link from "next/link";
import { Col } from "reactstrap";
import { image } from "./../../services/image";
import "./CardMosaic.css";

export default ({ data }) => {
  const title = index => {
    if (index === "memoire") {
      return data.TICO || data.LEG || `${data.EDIF || ""} ${data.OBJ || ""}`.trim();
    } else if (index === "enluminures") {
      return `${data.TITR} - ${data.SUJET}`;
    }
    return data.TICO || data.TITR;
  };
  return (
    <Col>
      <Link href={`/notice/${data._index.replace(/[0-9]+/, "")}/${data.REF}`} key={data.REF}>
        <a style={{ textDecoration: "none" }} className="mosaique-card">
          <div className="thumbnail">{image(data)}</div>
          <div className="content">
            <span>{title(data._index.replace(/[0-9]+/, ""))}</span>
          </div>
        </a>
      </Link>
    </Col>
  );
};
