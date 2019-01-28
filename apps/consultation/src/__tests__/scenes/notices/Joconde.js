import React from "react";
import { shallow } from "enzyme";
import Joconde from "../../../scenes/notices/Joconde";
import Title from "../../../scenes/notices/Title";
import Field from "../../../scenes/notices/Field";
import sampleNotice from "../../__notices__/joconde-1";

const placeholderParams = {
  params: { ref: "x" },
  isExact: true,
  path: "",
  url: ""
};

const headingText = wrapper => wrapper.find(".heading").text();

describe("Joconde suite", () => {

  it("should work with a real notice", () => {
    Joconde.prototype.load = jest.fn(function(_ref) {
      this.setState({ loading: false, notice: sampleNotice });
    });
    let wrapper = shallow(<Joconde match={placeholderParams} />);
    expect(headingText(wrapper)).toContain(sampleNotice.TICO);
    expect(wrapper.find(Title)).toHaveLength(4);
    expect(
      wrapper
        .find(Field)
        .filterWhere(f => f.props().content === sampleNotice.BIBL)
    ).toHaveLength(1);
    expect(
      wrapper
        .find(Field)
        .filterWhere(f => f.props().content === sampleNotice.LOCA)
    ).toHaveLength(1);
    const htmlRenderedComponent = wrapper.html();
    expect(htmlRenderedComponent).toContain(
      "joconde/000PE001028/96de11977.jpg"
    );
    expect(htmlRenderedComponent).toContain("Van Ouwenhuysen Constant");
  });
});
