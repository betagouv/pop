import React from 'react';
import { shallow } from 'enzyme';
import Logo from '../../components/Logo';
import { Link } from 'react-router-dom';

describe('Logo suite', function() {
  it('should have exactly one Link', () => {
    expect(shallow(<Logo />).find(Link)).toHaveLength(1)
  });
})
