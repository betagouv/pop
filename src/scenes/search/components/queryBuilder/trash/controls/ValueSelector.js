import React from 'react';

const ValueSelector = (props) => {
  const {value, options, className, handleOnChange, title} = props;

  return (
    <select className={className}
            value={value}
            title={title}
            onChange={e=>handleOnChange(e.target.value)}>
      {
        options.map(option=> {
          return (
            <option key={option.id || option.name} value={option.name}>{option.label}</option>
          );
        })
      }
    </select>
  );
}

ValueSelector.displayName = 'ValueSelector';

export default ValueSelector;
