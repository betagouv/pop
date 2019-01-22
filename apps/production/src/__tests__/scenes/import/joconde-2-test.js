import React from "react";
import Joconde from "../../../scenes/import/joconde";
import Importer from "../../../scenes/import/importer";
import ImportTester from "../../setup/ImportTester"
import api from "../../../services/api.js";

const importTester = new ImportTester();
importTester.disableAmplitude();
api.getNotice.mockResolvedValue(() => null);

test("import component renders for Joconde", () => {
  const component = importTester.mount(<Joconde />);
  expect(component.text()).toContain("déposez vos fichiers");
  expect(component.find(Importer)).toHaveLength(1);
});

test("import 3 Jocondes notices with images summary should work", async () => {
  importTester.mount(<Joconde />);
  await importTester.dropFiles([
    "joconde-valid-ISO-8859-1.txt",
    "0016630.jpg", 
    "0016631.jpg", 
    "0016790.jpg", 
    "0016803.jpg"
  ], "latin1");
  expect(importTester.summaryPicturesCount()).toBe(3);
  expect(importTester.summaryInvalidDocsCount()).toBe(0);
  expect(importTester.summaryNewDocsCount()).toBe(3);
});
