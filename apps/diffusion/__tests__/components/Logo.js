import React from 'react';
import { shallow } from 'enzyme';
import Logo from '../../components/Logo';

describe('Logo suite', function() {
  it('should have exactly one Link', () => {
    expect(shallow(<Logo />).find(".logo")).toHaveLength(1)
  });
})
