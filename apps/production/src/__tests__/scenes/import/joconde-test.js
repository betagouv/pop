import React from "react";
import Joconde from "../../../scenes/import/joconde";
import Importer from "../../../scenes/import/importer";
import ImportTester from "../../setup/ImportTester";
import api from "../../../services/api.js";
import Mapping from "../../../services/Mapping.js";

const importTester = new ImportTester({ api });
importTester.disableAmplitude();

test("import component renders for Joconde", () => {
  const component = importTester.mount(<Joconde />);
  expect(component.text()).toContain("déposez vos fichiers");
  expect(component.find(Importer)).toHaveLength(1);
});

test("import 3 Jocondes notices with images", async () => {
  importTester.mount(<Joconde />);
  await importTester.dropFiles(
    ["joconde-valid-ISO-8859-1.txt", "0016630.jpg", "0016631.jpg", "0016790.jpg", "0016803.jpg"],
    "latin1"
  );
  expect(importTester.summaryPicturesCount()).toBe(3);
  expect(importTester.summaryInvalidDocsCount()).toBe(0);
  expect(importTester.summaryNewDocsCount()).toBe(3);
  expect(importTester.notices.reduce((a, b) => a + b.IMG.length, 0)).toBe(4);
});

test("import 3 Jocondes notices without required images", async () => {
  importTester.mount(<Joconde />);
  await importTester.dropFiles(["joconde-valid-ISO-8859-1.txt"], "latin1");
  expect(importTester.summaryPicturesCount()).toBe(0);
  expect(importTester.summaryInvalidDocsCount()).toBe(3);
  expect(importTester.summaryNewDocsCount()).toBe(0);
});

test("import invalid file", async () => {
  const component = importTester.mount(<Joconde />);
  await importTester.dropFiles(["mnr-valid-UTF-8.csv"], "latin1");
  expect(component.text()).toMatch("Fichier .txt absent");
});

test("import file with not all required fields (only REF)", async () => {
  importTester.mount(<Joconde />);
  await importTester.dropFiles(["joconde-invalid-UTF-8.txt"]);
  expect(importTester.summaryInvalidDocsCount()).toBe(1);
  const errors = importTester.notices[0]._errors;
  const requiredFields = Object.entries(Mapping.joconde).filter(([k, v]) => v.required);
  expect(errors).toHaveLength(requiredFields.length - 1);
  errors.map(e => {
    expect(e).toMatch(/Le champ [A-Z]+ ne doit pas être vide/);
  });
});
