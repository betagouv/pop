import React from "react";
import Joconde from "../../../scenes/import/joconde";
import Importer from "../../../scenes/import/importer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { shallow, mount, render } from "enzyme";
import api from "../../../services/api.js";
import Dropzone from "../../../scenes/import/importer/dropZone";
import fs from "fs";

const initialState = {
  Auth: {
    user: {
      email: "foo.bar@example.org"
    },
    token: null,
    error: ""
  }
};

const mockStore = configureStore();
let store;
beforeEach(() => {
  store = mockStore(initialState);
});

jest.mock("../../../services/api.js");
window.amplitude = {
  getInstance: jest.fn().mockImplementation(() => ({
    logEvent: jest.fn().mockImplementation(() => {})
  }))
};

test("Joconde import component renders", () => {
  let wrapper = mount(
    <Provider store={store}>
      <Joconde />
    </Provider>
  );
  expect(wrapper.text()).toContain("déposez vos fichiers");
});

test("Joconde importer works", async () => {
  let wrapper = mount(
    <Provider store={store}>
      <Joconde />
    </Provider>
  );
  const importer = wrapper.find(Importer);
  expect(importer).toHaveLength(1);
  return;

  // Zone file
  const contents = new Blob([
    fs.readFileSync(__dirname + "/../../__notices__/joconde-valid-ISO-8859-1.txt", "latin1")
  ]);
  const file = new File([contents], "foo.txt", { type: "text/plain" });
  const imagesFile = filenames =>
    filenames.map(
      f =>
        new File(
          [new Blob([fs.readFileSync(__dirname + "/../../__notices__/image.jpg", "binary")])],
          f,
          { type: "binary" }
        )
    );
  const images = imagesFile(["0016630___LOL.jpg", "0016631.jpg", "0016790.jpg", "0016803.jpg"]);

  api.getNotice.mockResolvedValue(() => null);

  // ----
  const dropzone = wrapper.find(Dropzone);
  await dropzone.instance().props.onFinish(null, [file, ...images], null);

  const text = importer.text();
  console.log(text)
  // expect(errors).toHaveLength(1);
  
});
