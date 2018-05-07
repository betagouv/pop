import React from 'react';
import { Row, Col, Input, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import Autocomplete from './autocomplete'

import { history } from '../../redux/store';
import API from '../../services/api'

export default async function exportData(fileName, columns, opt) {

    let csv = columns.join(';') + '\n';
    let offset = 0;
    let entities = [];
    let res = await (API.search(opt.collection, opt.value, 100, offset));
    console.log(res)
    while (res.docs.length > 0) {
        entities = entities.concat(res.docs)
        offset += 100;
        res = await (API.search(opt.collection, opt.value, 100, offset));
    }

    for (var key in entities) {
        const arr = []
        for (var i = 0; i < columns.length; i++) {
            arr.push(entities[key][columns[i]]);
        }
        csv += arr.join(';') + '\n'
    }

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName;
    hiddenElement.click();
}

