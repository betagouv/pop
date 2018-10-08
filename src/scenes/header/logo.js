import React from 'react'
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.png';
import './logo.css';

export default () => {
  return <Link to="/" className="logo">
      <img src={Logo} alt="Logo" className="md" />
      <h1>Ministère de la Culture</h1>
    </Link>;
}
