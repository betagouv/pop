import React from "react";
import MultiList from "../MultiList";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<MultiList />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly with more options", () => {
  const tree = renderer
    .create(
      <MultiList
        dataField="CONTIENT_IMAGE.keyword"
        title="Contient une image"
        componentId="image"
        placeholder="oui ou non"
        showSearch={false}
        defaultSelected={[]}
        onCollapseChange={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
