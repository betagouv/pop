import React from "react";
import { screen } from "@testing-library/react";
import Joconde from "../../../scenes/import/joconde";
import { disableAmplitude, renderImport } from "../../setup/ImportTesterTL";

disableAmplitude();

test("import component renders for Joconde", () => {
  renderImport(<Joconde />);
  expect(screen.getByText(/déposez vos fichiers/i)).toBeInTheDocument();
});
