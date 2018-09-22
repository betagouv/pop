import * as React from 'react';

const Field = ({content, title}) => {
    if( !content || (Array.isArray(content) && content.length === 0)) {
      return (
        <div />
      );
    }

    return (
      <p id={title} className="field">
        {title}
        <span>
          { Array.isArray(content) ? content.join(", ") : content}
        </span>
      </p>
    )
};
export default Field;
