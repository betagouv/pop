import React from 'react';
import RuleGroup from './RuleGroup';

import './QueryBuilder.css';

export default class QueryBuilder extends React.Component {

    onUpdate(q) {
        const arr = []
        for (var key in q) {
            if (q.hasOwnProperty(key) && key !== "type") {
                arr.push(q[key]);
            }
        }
        if (arr.length === 1) {
            const query = { match: getMatch(arr[0]) };
            this.props.setQuery({ query, value: "hey" });
        } else if (arr.length > 1) {
            //https://www.elastic.co/guide/en/elasticsearch/reference/6.3/query-dsl-bool-query.html

            const must = []
            const must_not = [];
            const should = []
            const should_not = [];

            for (var i = 0; i < arr.length; i++) {
                switch (arr[i].actionSelected) {
                    case "<":
                    case "<=":
                    case ">":
                    case ">=":
                        if (q.type === "ET") {
                            must.push({ range: getRange(arr[i], arr[i].actionSelected) });
                        } else {
                            should.push({ range: getRange(arr[i], arr[i].actionSelected) });
                        }
                        break;
                    case "==":
                        if (q.type === "ET") {
                            must.push({ term: getMatch(arr[i]) });
                        } else {
                            should.push({ term: getMatch(arr[i]) });
                        }
                        break;
                    case "!=":
                        if (q.type === "ET") {
                            must_not.push({ term: getMatch(arr[i]) });
                        } else {
                            should_not.push({ term: getMatch(arr[i]) });
                        }
                        break;
                }
            }



            const query = {
                bool: {
                    must,
                    must_not,
                    should_not,
                    should
                }
            }
            console.log(query)
            this.props.setQuery({ query, value: "hey" });
        }

    }

    render() {
        return (
            <div className="queryBuilder">
                <RuleGroup
                    id='0'
                    onUpdate={this.onUpdate.bind(this)}
                    fields={this.props.fields}
                />
            </div>
        );
    }
}



function getMatch(obj) {
    const selector = obj.valueSelected;
    const result = obj.resultSelected;
    const match = {};
    match[selector + ".keyword"] = result;
    return match;
}

function getRange(obj) {

    let key = ""
    switch (obj.type) {
        case "<": key = "lt"; break;
        case "<=": key = "lte"; break;
        case ">": key = "gt"; break;
        case ">=": key = "gte"; break;
    }

    const selector = obj.valueSelected;
    const result = obj.resultSelected;

    const tmp = {};
    tmp[key] = result;

    const range = {};
    range[selector + ".keyword"] = tmp
    return range;
}
