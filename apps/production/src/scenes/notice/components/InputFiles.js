import React from "react";
import { Field } from "redux-form";

import { bucket_url } from "../../../config";

const InputFiles = ({ input, type }) => {
  const arr = showValues(input.value);
  return (
    <div className="field">
      <div style={{ minWidth: "50%" }}>
        {arr.map(e => (
          <div key={e} style={{ display: "flex", justifyContent: "space-between" }}>
            {e.value}
            <button
              type="button"
              onClick={() => {
                const n = input.value.filter(f => {
                  if (typeof f === "object") {
                    return f.name !== e.key;
                  } else {
                    return f !== e.key;
                  }
                });
                input.onChange(n);
              }}
            >
              supprimer
            </button>
          </div>
        ))}
      </div>
      <input
        onChange={e => {
          if (type === "Array") {
            input.onChange([...input.value, ...Array.from(e.target.files)]);
          } else {
            input.onChange(e.target.files[0]);
          }
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
    return [{ key: value.name, value: value.name }];
  }

  if (value) {
    return [
      { key: value, value: <a href={`${bucket_url}${value}`}>{value.replace(/^.*[\\\/]/, "")}</a> }
    ];
  }

  return [];
}

export default ({ name, label, ...rest }) => (
  <div className="field">
    <div>{label ? `${label} (${name})` : name}</div>
    <Field component={InputFiles} name={name} {...rest} />
  </div>
);
