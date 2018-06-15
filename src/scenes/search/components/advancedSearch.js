import React from 'react';
import brace from 'brace';
import { Button } from 'reactstrap';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/monokai';
import {
    ReactiveComponent,
} from '@appbaseio/reactivesearch';


export default class Search extends React.Component {


    render() {
        return (
            <ReactiveComponent
                componentId="mainSearch"   // a unique id we will refer to later
                className="mainSearch"
                style={{ width: "100%" }}
            >
                <CustomComponent className="mainSearch" />
            </ReactiveComponent>
        );
    }
}


class CustomComponent extends React.Component {

    state = {
        value: '{}',
    }

    setValue() {
        try {
            let query = JSON.parse(this.state.value);
            this.props.setQuery(query);

            console.log('QUERY SETTED ', query)
        } catch (er) {
            console.log('ERR', err)
        };
    }

    render() {
        return (<div >
            <AceEditor
                mode="json"
                theme="monokai"
                name="blah2"
                showGutter={true}
                value={this.state.value}
                onChange={(e) => this.setState({ value: e })}
                width="100%"
                name="queryeditor"
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
            />
            <Button color="primary" onClick={this.setValue.bind(this)}>Executer</Button>
        </div>);
    }
}
