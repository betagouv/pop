import React from 'react';
import { ReactiveComponent } from '@appbaseio/reactivesearch';
import QueryBuilder from './QueryBuilder';

export default class AdvancedSearch extends React.Component {
    render() {
        return (
            <ReactiveComponent
                componentId="advancedSearch"   // a unique id we will refer to later
            >
                <QueryBuilder
                    onQueryChange={(q) => console.log(q)}
                    fields={this.props.fields}
                />
            </ReactiveComponent>
        );
    }
}