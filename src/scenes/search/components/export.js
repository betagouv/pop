import React from 'react';
import { ReactiveComponent } from '@appbaseio/reactivesearch';
import Button from './button';

export default class ExportComponent extends React.Component {

    state = {
        page: 0,
        run: false,
        res: []
    }

    renderButton() {
        if (this.state.run) {
            return <div />
        }
        return (<Button icon={require('../../../assets/export.png')} text='Exporter les résultats' to='' onClick={() => { this.setState({ run: true }) }} />)
    }

    exec(res) {
        exportData(this.props.filename, this.props.columns, res)
        this.setState({ res: [], run: false })
    }

    renderExporting() {
        if (!this.state.run) {
            return <div />
        }
        return (
            <ReactiveComponent
                componentId='export'
                react={{ and: this.props.FILTER }}
                onAllData={(results, streamResults, loadMoreData) => {
                    const res = this.state.res.concat(results);
                    if (!results.length || res.length === 10000) {
                        this.exec(res);
                    } else {
                        this.setState({ page: this.state.page += 1, res })
                    }
                }}
                defaultQuery={() => ({
                    size: 20,
                    from: this.state.page * 20,
                    aggs: {},
                })}
            >
                <Exp
                    len={this.state.res.length}
                />
            </ReactiveComponent>
        )
    }

    render() {
        return (
            <div>
                {this.renderButton()}
                {this.renderExporting()}
            </div>
        );
    }
}

const Exp = ({ len }) => {
    return (
        <div>
            <div>Recuperation des notices... {len}</div>
        </div>
    );
}

async function exportData(fileName, columns, entities) {
    let csv = columns.join(',') + '\n';
    for (var j = 0; j < entities.length; j++) {
        const arr = []
        for (var i = 0; i < columns.length; i++) {
            let value = entities[j][columns[i]]
            if (Array.isArray(value)) {
                value = value.join(';')
            }
            value = value.replace(/"/g, '""')
            arr.push('"' + value + '"');
        }
        csv += arr.join(',') + '\n'
    }

    initiateFileDownload(csv, fileName);
}

function initiateFileDownload(str, fileName) {

    let fileBytes = new TextEncoder("utf-8").encode(str);
    var octetStreamMimeType = "application/octet-stream";

    var blob;    //trySaveAsDownload
    if (window.saveAs) {
        blob = new Blob([fileBytes], { type: octetStreamMimeType });
        saveAs(blob, fileName);
        return true;
    }

    var chArray = Array.prototype.map.call(fileBytes, function (byte) { return String.fromCharCode(byte); });
    let base64 = window.btoa(chArray.join(""));

    var aElement = document.createElement("a");    //tryAnchorDownload
    var event;
    if ("download" in aElement) {
        aElement.setAttribute("download", fileName);
        aElement.href = "data:" + octetStreamMimeType + ";base64," + base64;
        document.body.appendChild(aElement);
        event = document.createEvent("MouseEvents");
        event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        aElement.dispatchEvent(event);
        document.body.removeChild(aElement);
        return true;
    }
    return false;
}

