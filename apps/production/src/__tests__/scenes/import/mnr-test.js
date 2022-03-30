import React from "react";
import { screen } from "@testing-library/react";
import Mnr from "../../../scenes/import/mnr";
import { disableAmplitude, renderImport } from "../../setup/ImportTesterTL";

disableAmplitude();

test("import component renders for Mnr", () => {
  renderImport(<Mnr />);
  expect(screen.getByText(/déposez vos fichiers/i)).toBeInTheDocument();
});
