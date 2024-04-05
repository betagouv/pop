import React from "react";
import renderer from "react-test-renderer";
import Avatar from "../../components/Avatar";

test("Avatar displays two letters (FB)", () => {
	const component = renderer.create(<Avatar email="foo.bar@example.org" />);
	const tree = component.toJSON();
	expect(tree).toMatchSnapshot();
});
