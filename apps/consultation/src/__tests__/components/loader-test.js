import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Loader from '../../components/loader/index';

describe('Loader suite', () => {
  
  it('should render without throwing an error', () => {
    expect(shallow(<Loader />).contains(<div id="loader"/>)).toBe(true);
  });
});
