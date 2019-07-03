import React from "react";
import { Field } from "redux-form";

const InputFiles = ({ name, disabled, input, type, ...rest }) => {
  const arr = getValues(input.value);

  return (
    <div className="field">
      <div>
        {arr.map(e => (
          <div key={e}>{e}</div>
        ))}
      </div>
      <input
        onChange={e => {
          input.onChange(e.target.files);
        }}
        type="file"
        multiple={type === "Array" ? true : false}
      />
    </div>
  );
};

function getValues(value) {
  if (Array.isArray(value)) {
    const arr = [];
    for (let i = 0; i < value.length; i++) {
      arr.push(...getValues(value[0]));
    }
    return arr;
  }

  if (typeof value === "object") {
    return Array.from(value).map(f => f.name);
  }

  if (value) {
    return [value];
  }

  return [];
}

export default ({ name, ...rest }) => (
  <React.Fragment>
    <div>{name}</div>
    <Field component={InputFiles} name={name} {...rest} />
  </React.Fragment>
);
