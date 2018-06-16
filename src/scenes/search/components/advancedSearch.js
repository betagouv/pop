import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/monokai';
import {
    ReactiveComponent,
} from '@appbaseio/reactivesearch';

import ExportComponent from './export';
import Button from './button'

import './advancedSearch.css'

export default class Search extends React.Component {
    render() {
        return (
            <ReactiveComponent
                componentId="mainSearch"   // a unique id we will refer to later
                className="mainSearch"
                style={{ width: "100%" }}
            >
                <CustomComponent style={{ width: "100%" }} />
            </ReactiveComponent>
        );
    }
}


class CustomComponent extends React.Component {

    state = {
        value: '{}',
        modal: false,
    }

    exec() {
        try {
            let query = JSON.parse(this.state.value);
            this.props.setQuery(query);
        } catch (er) {
            console.log('ERR', err)
        };
    }

    render() {
        return (
            <div className='advancedSearch' >
                <AceEditor
                    mode="json"
                    theme="monokai"
                    name="blah2"
                    height='300px'
                    width='600px'
                    showGutter={true}
                    value={this.state.value}
                    onChange={(e) => this.setState({ value: e })}
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
                <div>
                    <Button icon={require('../../../assets/play.png')} text='Executer' onClick={this.exec.bind(this)} />
                    <Button icon={require('../../../assets/load.png')} text='Charger des scenarios existants' onClick={() => this.setState({ modal: true })} />
                    <ExportComponent />
                </div>
            </div>);
    }
}
