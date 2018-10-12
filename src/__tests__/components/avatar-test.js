import React from "react";
import Avatar from "../../components/avatar";
import renderer from "react-test-renderer";

test("Avatar displays two letters (FB)", () => {
  const component = renderer.create(<Avatar email="foo.bar@example.org" />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
