import React from "react";
import Mnr from "../../../scenes/import/mnr";
import Importer from "../../../scenes/import/importer";
import ImportTester from "../../setup/ImportTester";
import api from "../../../services/api.js";

const importTester = new ImportTester({ api });
importTester.disableAmplitude();

test("import component renders for Mnr", () => {
  const component = importTester.mount(<Mnr />);
  expect(component.text()).toContain("déposez vos fichiers");
  expect(component.find(Importer)).toHaveLength(1);
});

test("import 1 Mnr notice", async () => {
  importTester.mount(<Mnr />);
  await importTester.dropFiles(["mnr-valid-UTF-8.csv"], "utf-8");
  expect(importTester.summaryPicturesCount()).toBe(0);
  expect(importTester.summaryInvalidDocsCount()).toBe(0);
  expect(importTester.summaryNewDocsCount()).toBe(1);
});

test("import invalid file", async () => {
  const component = importTester.mount(<Mnr />);
  await importTester.dropFiles(["joconde-invalid-UTF-8.txt"], "latin1");
  expect(component.text()).toMatch("Fichier .csv absent");
});
