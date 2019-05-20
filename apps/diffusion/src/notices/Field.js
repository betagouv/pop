import * as React from "react";

export default ({ content, title, separator, join = ", " }) => {
  // Don't render empty elements.
  const isEmptyArray = c => Array.isArray(c) && c.length === 0;
  const isEmptyString = s => typeof s === "string" && !s.trim();
  if (!content || isEmptyArray(content) || isEmptyString(content)) {
    return null;
  }

  // Transform array to string, by joining with a character.
  let str = Array.isArray(content) ? content.join(join) : content;

  // Don't apply transformations on React components
  if (!React.isValidElement(str)) {
    // Fix simple quotes and capitalize first letter (only if it's a string)
    str = str.replace(/\u0092/g, `'`).replace(/^./, str => str.toUpperCase());
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
          margin-bottom: 0px;
          text-align: justify;
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
