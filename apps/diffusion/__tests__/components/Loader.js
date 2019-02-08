import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../../src/components/Loader';

describe('Loader suite', () => {
  
  it('should render without throwing an error', () => {
    expect(shallow(<Loader />).contains(<div id="loader"/>)).toBe(true);
  });
});
