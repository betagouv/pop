import React from 'react';
import { Row, Col, Input, Container, Button } from 'reactstrap';
import Autocomplete from 'react-autocomplete'

import API from '../../services/api'

import './autocomplete.css';

export default class AutoComplete extends React.Component {

    state = {
        entities: [],
        search: '',
        collection: 'merimeeMH'
    }

    componentWillMount() {

    }

    onSearch() {
        this.props.onSearch(this.state.search)
        this.setState({ entities: [] })
    }

    search(value) {
        if (value) {
            API.search("merimeeMH", value).then((entities) => {
                this.setState({ entities })
            })
        } else {
            this.setState({ entities: [] })
        }
    }

    render() {
        return (
            <div className='search-section'>
                <Autocomplete
                    inputProps={{
                        id: 'autocomplete',
                        placeholder: 'Saississez un auteur, une référence, une localisation, un mot-clé...',
                        onKeyPress: (e) => {
                            if (e.key === 'Enter') {
                                this.onSearch();
                            }
                        }
                    }}
                    className='autocomplete'
                    wrapperStyle={{ position: 'relative', display: 'inline-block' }}
                    value={this.state.search}
                    items={this.state.entities}
                    getItemValue={(item) => {
                        return item.TICO
                    }}
                    onSelect={(value, item) => {
                        this.props.onSelect(item)
                    }}
                    onChange={(event, value) => {
                        this.setState({ search: value })
                        if (value.length >= 3) {
                            this.search(value)
                        } else {
                            this.search('')
                        }
                    }}
                    renderMenu={(children) => {
                        if (!children.length) {
                            return <div />
                        }
                        return (
                            < div className="menu" >
                                {children}
                            </div>
                        )
                    }}
                    renderItem={(item, isHighlighted) => {
                        return (
                            <div
                                className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                                key={item.REF}
                            >
                                {`(${item.REF}) ${item.TICO}`}
                            </div>
                        )
                    }}
                />
                <div>
                    <Button onClick={this.onSearch.bind(this)}                            >
                        Search
                        </Button>
                </div>
            </div>
        );
    }
}

/*
                        <Input
                            className='select'
                            type="select"
                            name="select"
                            value={this.state.collection}
                            onChange={(e) => this.setState({ collection: e.target.value })}
                        >
                            <option>palissyMH</option>
                            <option>palissyINV</option>
                            <option>palissyETAT</option>
                            <option>mnrDMF</option>
                            <option>merimeeMH</option>
                            <option>merimeeINV</option>
                            <option>merimeeETAT</option>
                            <option>memoireSDAP</option>
                            <option>memoireSAP</option>
                            <option>memoireIVR</option>
                            <option>memoireCRMH</option>
                            <option>memoireCAOA</option>
                            <option>memoireARCHEO</option>
                            <option>jocondeMUSEES</option>
                        </Input>
                        */