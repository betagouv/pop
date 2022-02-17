import React from "react";
import { screen } from "@testing-library/react";
import Mh from "../../../scenes/import/MH";
import { disableAmplitude, renderImport } from "../../setup/ImportTesterTL";

disableAmplitude();

test("import component renders for MH", () => {
  renderImport(<Mh />);
  expect(screen.getByText(/déposez vos fichiers/i)).toBeInTheDocument();
});
