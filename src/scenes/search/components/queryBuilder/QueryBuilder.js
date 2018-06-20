import React from 'react';
import RuleGroup from './RuleGroup';

export default class QueryBuilder extends React.Component {
    render() {
        return (
            <div className="queryBuilder">
                <RuleGroup onUpdateQuery={() =>{
                    console.log('update')
                }}/>
            </div>
        );
    }
}


