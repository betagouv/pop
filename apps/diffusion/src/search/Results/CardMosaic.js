import React from "react";
import Link from "next/link";
import { Col } from "reactstrap";
import { image } from "./../../services/image";

export default ({ data }) => {
  const title = index => {
    if (index === "memoire") {
      const subtitle = data.TICO || data.LEG || `${data.EDIF || ""} ${data.OBJ || ""}`.trim();
      if (data.AUTP) {
        return `${data.AUTP} - ${subtitle}`;
      }
      return subtitle;
    } else if (index === "enluminures") {
      return `${data.TITR} - ${data.SUJET}`;
    } else if (index === "joconde") {
      return getJocondeTitle(data);
    } else if ((index === "merimee" || index === "palissy") && data.AUTR && data.AUTR.length) {
      return `${data.AUTR.filter(e => e).join(" ; ")} - ${data.TICO || data.TITR}`;
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
      <style jsx global>{`
        .mosaique-card {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
          box-shadow: 0 2px 4px 0 rgba(189, 189, 189, 0.5);
          transition: 0.3s;
          height: 110px;
          overflow: hidden;
          background-color: white;
          height: 360px;
          border-radius: 5px;
          min-width: 400px;
        }

        .mosaique-card:hover {
          box-shadow: 0 3px 6px 0 rgba(189, 189, 189, 1);
        }

        .mosaique-card .content {
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          width: 100%;
          font-weight: 700;
          font-size: 16px;
          color: #2a282b;
          text-align: center;
          margin-bottom: 0;
          height: 60px;
          line-height: 60px;
          padding: 15px;
          box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.05);
        }

        .mosaique-card .content span {
          display: inline-block;
          vertical-align: middle;
          line-height: normal;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .mosaique-card .thumbnail {
          width: 100%;
          height: 300px;
          margin-right: 30px;
          background-color: #f8f8f8;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .mosaique-card img {
          max-width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .mosaique-card img.no-img {
          width: 100%;
          height: 100%;
        }

        @media screen and (max-width: 450px) {
          .mosaique-card {
            min-width: auto;
          }
        }
      `}</style>
    </Col>
  );
};

function getJocondeTitle(notice) {
  if (notice.TITR) {
    return notice.TITR;
  }
  if ((notice.DENO || []).length) {
    return notice.DENO.join(", ");
  }

  return (notice.DOMN || []).join(", ");
}
