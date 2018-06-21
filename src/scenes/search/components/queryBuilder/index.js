import React from 'react';
import { ReactiveComponent} from '@appbaseio/reactivesearch';
import QueryBuilder from './QueryBuilder';

const fields = [
    {name: 'firstName', label: 'First Name'},
    {name: 'lastName', label: 'Last Name'},
    {name: 'age', label: 'Age'},
    {name: 'address', label: 'Address'},
    {name: 'phone', label: 'Phone'},
    {name: 'email', label: 'Email'},
    {name: 'twitter', label: 'Twitter'},
    {name: 'isDev', label: 'Is a Developer?', value: false},
];

export default class AdvancedSearch extends React.Component {
    render() {
        return (
            <ReactiveComponent
                componentId="advancedSearch"   // a unique id we will refer to later
            >
                <QueryBuilder
                    fields={fields}
                    onQueryChange={(q) => console.log(q)}
                />
            </ReactiveComponent>
        );
    }
}