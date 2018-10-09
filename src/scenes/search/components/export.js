import React from 'react';
import { ReactiveComponent } from '@appbaseio/reactivesearch';
import { Button } from 'reactstrap';

export default class ExportComponent extends React.Component {
  state = {
    page: 0,
    run: false,
    res: []
  };

  renderButton() {
    if (this.state.run) {
      return <div />;
    }
    return (
      <Button color="primary" onClick={this.run}>
        Exporter les résultats
      </Button>
    );
  }

  run = () => {
    this.setState({ res: [], page: 0, run: true });
  };

  exec(res) {
    exportData(this.props.filename, this.props.columns, res);
    this.setState({ res: [], page: 0, run: false });
  }

  renderExporting() {
    if (!this.state.run) {
      return <div />;
    }
    return (
      <ReactiveComponent
        componentId="export"
        react={{ and: this.props.FILTER }}
        onAllData={(results, streamResults, loadMoreData) => {
          const res = this.state.res.concat(results);
          if (!results.length || res.length === 10000) {
            this.exec(res);
          } else {
            this.setState({ page: (this.state.page += 1), res });
          }
        }}
        defaultQuery={() => ({
          size: 20,
          from: this.state.page * 20,
          aggs: {}
        })}
      >
        <Exp len={this.state.res.length} />
      </ReactiveComponent>
    );
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
      <div>Récuperation des notices... {len}</div>
    </div>
  );
};

async function exportData(fileName, columns, entities) {
  let csv = columns.join(',') + '\n';
  for (let j = 0; j < entities.length; j++) {
    const arr = [];
    for (let i = 0; i < columns.length; i++) {
      let value = entities[j][columns[i]];
      if (Array.isArray(value)) {
        value = value.join(';');
      }
      if (!value) value = '';
      value = ('' + value).replace(/"/g, '""');
      arr.push('"' + value + '"');
    }
    csv += arr.join(',') + '\n';
  }

  initiateFileDownload(csv, fileName);
}

function initiateFileDownload(csv, fileName) {
  let blob = new Blob([csv]);
  if (window.navigator.msSaveOrOpenBlob)
    // IE hack; see http://msdn.microsoft.com/en-us/library/ie/hh779016.aspx
    window.navigator.msSaveBlob(blob, fileName);
  else {
    let a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(blob, {
      type: 'text/plain;charset=UTF-8'
    });
    a.download = fileName;
    document.body.appendChild(a);
    a.click(); // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
    document.body.removeChild(a);
  }
}
