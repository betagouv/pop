import * as React from "react";

export default ({ content, title, separator, join = ", " }) => {
  if (!content || (Array.isArray(content) && content.length === 0)) {
    return null;
  }

  let str = Array.isArray(content) ? content.join(join) : content;
  if (!React.isValidElement(str)) {
    str = str.replace(/\u0092/g, `'`);
    if (separator) {
      str = replaceAll(str, separator, "\n");
    }
  }

  return (
    <div id={title} className="field">
      <h3>{title}</h3>
      <p>{str}</p>
      <style jsx>{`
        .field {
          padding-bottom: 10px;
        }

        .field p {
          font-weight: normal;
          font-size: 1rem;
          word-wrap: break-word;
          white-space: pre-line;
          margin-bottom: 15px;
          text-align: justify;
        }

        .field p::first-letter {
          text-transform: capitalize;
        }

        .field h3 {
          font-size: 1rem;
          font-weight: 700;
          line-height: 1.5;
          color: #19414cd0;
          text-align: left;
          padding-right: 7px;
          margin-bottom: 3px;
        }
      `}</style>
    </div>
  );
};

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}
