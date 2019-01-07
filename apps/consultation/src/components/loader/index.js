import React from 'react';
import './index.css';

export default ({isOpen = true}) => isOpen?(
   <div className='loader-container'>
      <div id="loader"/>
  </div>
) : null;



