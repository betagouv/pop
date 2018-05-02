import React from 'react'
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.png';
import './logo.css';

export default (props) => {
  return (
    <Link to="/" className="Logo">
      <img src={Logo} alt="Epicurio-logo" className="md" />
    </Link>
  )
}