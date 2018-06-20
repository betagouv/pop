import React from 'react';

const ValueEditor = (props) => {
  const {field, operator, value, handleOnChange, title} = props;

  if (operator === 'null' || operator === 'notNull') {
    return null;
  }

  return (
    <input type="text"
           value={value}
           title={title}
           onChange={e=>handleOnChange(e.target.value)} />
  );
};

ValueEditor.displayName = 'ValueEditor';

export default ValueEditor;
