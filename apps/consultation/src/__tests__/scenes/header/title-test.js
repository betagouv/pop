import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Title from '../../../scenes/header/title.js';

describe('Title suite', function() {
  it('should contain "Patrimoine"', () => {
    expect(shallow(<Title />).text()).toContain('Patrimoine')
  });
})
