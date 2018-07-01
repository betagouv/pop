import React from 'react';
import RuleGroup from './RuleGroup';

import './QueryBuilder.css';

export default class QueryBuilder extends React.Component {

    buildQuery(query) {
        console.log(query);
    }
    render() {
        return (
            <div className="queryBuilder">
                <RuleGroup
                    id='0'
                    updateQuery={this.buildQuery.bind(this)}
                    fields={this.props.fields}
                />
            </div>
        );
    }
}


