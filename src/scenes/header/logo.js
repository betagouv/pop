import React from 'react'
import { Link } from 'react-router-dom';

import LogoImg from '../../assets/logo.png';

import withStyles from "isomorphic-style-loader/lib/withStyles";
import styles from './logo.css';

const Logo = () => {
  return <Link to="/" className="logo">
      <img src={LogoImg} alt="Logo" className="md" />
      <h1>Ministère de la Culture</h1>
    </Link>;
}

export default withStyles(styles)(Logo);
