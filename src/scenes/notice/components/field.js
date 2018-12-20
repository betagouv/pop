import * as React from "react";

export default ({ content, title, separator, join = ", " }) => {
  if (!content || (Array.isArray(content) && content.length === 0)) {
    return <div />;
  }

  let str = Array.isArray(content) ? content.join(join) : content;
  str = str.replace(/\u0092/g, `'`);

  if (separator) {
    str = replaceAll(str, separator, "\n");
  }

  return (
    <div id={title} className="field">
      <h3>{title}</h3>
      <p>{str}</p>
    </div>
  );
};

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}
