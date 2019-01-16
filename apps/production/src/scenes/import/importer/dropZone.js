import React, { Component } from "react";
import { Row, Progress } from "reactstrap";
import Dropzone from "react-dropzone";
import JSZip from "jszip";
import Loader from "../../../components/Loader";

import "./dropZone.css";

const MAX_SIZE = 300000000;

export default class ImportDropComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: -1,
      error: "",
      encoding: props.defaultEncoding || "ISO-8859-1",
      message: "",
      loading: false
    };
  }

  onDrop(err, files) {
    const maxSize = files.some(e => e.size > MAX_SIZE);

    if (maxSize) {
      this.props.onFinish(
        `Taille de fichier maximale atteinte (300Mb). Découpez votre import en plusieurs sous-parties pour importer`,
        files,
        this.state.encoding
      );
      return;
    }

    this.setState({ loading: true });
    if (files.length === 1 && getExtension(files[0].name) === "zip") {
      const new_zip = new JSZip();
      this.setState({ progress: 0, loading: false });
      new_zip
        .loadAsync(files[0])
        .then(zip => {
          const total = Object.keys(zip.files).length;
          const arr = [];
          let i = 1;

          zip.forEach(async (path, obj) => {
            const f = await convertToFile(obj);
            arr.push(f);
            this.setState({
              message: "Dé-zipage du fichier",
              progress: Math.floor((i++ * 100) / total)
            });
            if (i > total) {
              this.props.onFinish(err, arr, this.state.encoding);
              this.setState({ message: "", progress: -1 });
            }
          });
        })
        .catch(e => {
          this.props.onFinish(e, files, this.state.encoding);
        });
    } else {
      this.props.onFinish(err, files, this.state.encoding);
    }
  }

  render() {
    const rowstyle = {
      paddingTop: "20px",
      display: "flex",
      flexDirection: "column",
      paddingRight: "50px",
      paddingLeft: "50px"
    };
    const encodings = ["UTF-8", "ISO-8859-1", "WINDOWS-1252"].map(o => (
      <option key={o}>{o}</option>
    ));

    const text =
      this.props.text ||
      "Glissez & déposez vos fichiers ou cliquez ici pour importer";

    if (this.state.progress !== -1) {
      return (
        <div>
          <div>{this.state.message}</div>
          <Progress value={this.state.progress} />
        </div>
      );
    }

    return (
      <div className="dropzone">
        <Dropzone
          className="dropArea"
          onDrop={files => this.onDrop(null, files)}
          onDropRejected={() => {}}
        >
          {this.state.loading ? <Loader /> : <div />}
          <img src={require("../../../assets/upload.png")} />
          <p>{text}</p>
        </Dropzone>
        <Row
          style={{
            ...rowstyle,
            justifyContent: "center",
            alignItems: "center"
          }}
          type="flex"
          gutter={16}
          justify="center"
        >
          {this.state.error ? <div>{this.state.error}</div> : <div />}
        </Row>
        <select
          onChange={e => this.setState({ encoding: e.target.value })}
          value={this.state.encoding}
        >
          {encodings}
        </select>
      </div>
    );
  }
}

function getExtension(name) {
  return ("" + name.split(".").pop()).toLowerCase();
}

function convertToFile(obj) {
  return new Promise(async (resolve, reject) => {
    const ext = getExtension(obj.name);
    const type = ext === "txt" || ext === "csv" ? "text/plain" : "image/jpeg";
    const data = await obj.async("blob");
    let f = null;
    try {
      f = new File([data], obj.name, { type });
    } catch (e) {
      f = new Blob([data], { type: "image/jpeg" });
      f.name = obj.name;
    }
    resolve(f);
  });
}
