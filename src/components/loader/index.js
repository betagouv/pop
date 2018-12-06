import React from 'react';

export default ({isOpen = true}) => isOpen?(
   <div className='loader-container'>
      <div id="loader"/>
  </div>
) : null;



