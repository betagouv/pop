import React from 'react';
import { shallow } from 'enzyme';
import Title from '../../src/components/Title';

describe('Title suite', function() {
  it('should contain "Patrimoine"', () => {
    expect(shallow(<Title />).text()).toContain('Patrimoine')
  });
})
