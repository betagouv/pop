import React from 'react';
import { shallow } from 'enzyme';
import Title from '../../../components/header/Title.js';

describe('Title suite', function() {
  it('should contain "Patrimoine"', () => {
    expect(shallow(<Title />).text()).toContain('Patrimoine')
  });
})
