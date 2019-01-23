import React from "react";
import Inv from "../../../scenes/import/inv";
import ImportTester from "../../setup/ImportTester";
import api from "../../../services/api.js";

const importTester = new ImportTester({ api });
importTester.disableAmplitude();

test("import 13 Merimee notice", async () => {
  importTester.mount(<Inv />);
  await importTester.dropFiles(["GERTRUDE_xmlToMERIMEE_lexicovide.txt"], "latin1");
  expect(importTester.summaryInvalidDocsCount()).toBe(0);
  expect(importTester.summaryNewDocsCount()).toBe(13);
  expect(importTester.notices.map(e => e._errors.length).reduce((a,b) => a + b)).toBe(0);
});
