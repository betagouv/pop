import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount } from "enzyme";
import Dropzone from "../../scenes/import/importer/dropZone";
import fs from "fs";

export default class ImportTester {
  props = {};
  component = null;
  constructor(props) {
    this.props = props;
    this.props.api.getNotice.mockResolvedValue(() => null);
  }

  get store() {
    const mockStore = configureStore();
    return mockStore({
      Auth: { user: { email: "foo.bar@example.org" }, token: null, error: "" }
    });
  }

  disableAmplitude() {
    window.amplitude = {
      getInstance: jest.fn().mockImplementation(() => ({
        logEvent: jest.fn().mockImplementation(() => {})
      }))
    };
  }

  mount(component) {
    this.component = mount(<Provider store={this.store}>{component}</Provider>);
    return this.component;
  }

  dropFiles(files, encoding = "utf-8") {
    return new Promise(async resolve => {
      const isImage = f => f.match(/jpg$|png$/);
      const images = files.filter(isImage).map(f => {
        const dummyImage = fs.readFileSync(__dirname + "/../__notices__/image.jpg", "binary");
        return new File([new Blob([dummyImage])], f, { type: "binary" });
      });
      const data = files
        .filter(f => !isImage(f))
        .map(f => {
          const doc = fs.readFileSync(__dirname + "/../__notices__/" + f, encoding);
          return new File([new Blob([doc])], f, { type: "text/plain" });
        });
      const dropzone = this.component.find(Dropzone);
      await dropzone.instance().props.onFinish(null, [...data, ...images], null);
      resolve();
    });
  }

  countFromRegex(r) {
    return Number(this.component.text().replace(r, "$1"));
  }

  summaryPicturesCount(c) {
    return this.countFromRegex(/.*([0-9]+) sont illustrées.*/);
  }

  summaryNewDocsCount(c) {
    return this.countFromRegex(/.*([0-9]+) sont des nouvelles notices.*/);
  }

  summaryInvalidDocsCount(c) {
    return this.countFromRegex(/.*([0-9]+) notices ne peuvent être importées.*/);
  }
}
