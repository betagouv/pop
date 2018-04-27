import React from 'react';
import { Row, Col, Input, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import Loader from '../../components/loader'

import API from '../../services/api'

import './index.css';

export default class Notice extends React.Component {

    state = {
        notice : null,
        error : '',
        loading : true
    }

    componentWillMount(){
        API.getNotice(this.props.match.params.id).then((notice) =>{
            this.setState({loading:false,notice})
        })
    }

    render() {
        if(this.state.loading){
            return  <Loader />
        }

        const arr = [];
        for (var key in this.state.notice) {
           if(this.state.notice[key]){
                arr.push(<span key={key}>{`${key}:${this.state.notice[key]}`}</span>)
            }
        }

        return (
                <Container className='notice'>
                        {arr}
                </Container>
        );
    }
}

