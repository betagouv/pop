import React from 'react';
import { Link } from 'react-router-dom';

import './index.css';

export default class HeaderBase extends React.Component {
    getIcon(collection) {
        switch (this.props.collection) {
            case 'joconde': return require('../../assets/joconde.jpg'); break;
            case 'merimee': return require('../../assets/merimee.jpg'); break;
            case 'mnr': return require('../../assets/mnr.jpg'); break;
            case 'palissy': return require('../../assets/palissy.jpg'); break;
            case 'memoire': return require('../../assets/memoire.jpg'); break;
            default: return '';
        }
    }

    render() {
        return (
            <div className='HeaderBase'>
                <div className='title-zone'>
                    <img className='logo' src={this.getIcon()} />
                    <div className='title'>Vous travaillez dans la base {this.props.collection}</div>
                    <Link to='/'>Changer de base</Link>
                </div>
            </div>
        )
    }
}
