import React from 'react';

const ActionElement = (props) => {
  const {label, className, handleOnClick, title} = props;

  return (
    <button className={className}
            title={title}
            onClick={e=>handleOnClick(e)}>
      {label}
    </button>
  );
}

ActionElement.displayName = 'ActionElement';

export default ActionElement;
