import React from 'react';

import withStyles from "isomorphic-style-loader/lib/withStyles";
import styles from './title.css';

const Title = () => (
    <div className="company-title">
        <span>Plateforme</span>
        <span>Ouverte du</span>
        <span>Patrimoine</span>
    </div>
);

export default withStyles(styles)(Title);
