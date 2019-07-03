import React from "react";
import { Field } from "redux-form";

import { bucket_url } from "../../../config";

const InputFiles = ({ input, type }) => {
  const arr = showValues(input.value);
  return (
    <div className="field">
      <div>
        {arr.map(e => (
          <div key={e}>{e}</div>
        ))}
      </div>
      <input
        onChange={e => {
          input.onChange([...input.value, ...Array.from(e.target.files)]);
        }}
        type="file"
        multiple={type === "Array"}
      />
    </div>
  );
};

function showValues(value) {
  if (Array.isArray(value)) {
    const arr = [];
    for (let i = 0; i < value.length; i++) {
      arr.push(...showValues(value[i]));
    }
    return arr;
  }

  if (typeof value === "object") {
    return [value.name];
  }

  if (value) {
    return [<a href={`${bucket_url}${value}`}>{value.replace(/^.*[\\\/]/, "")}</a>];
  }

  return [];
}

export default ({ name, ...rest }) => (
  <React.Fragment>
    <div>{name}</div>
    <Field component={InputFiles} name={name} {...rest} />
  </React.Fragment>
);
