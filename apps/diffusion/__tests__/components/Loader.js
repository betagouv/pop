import React from 'react';
import { render } from '@testing-library/react';
import Loader from '../../src/components/Loader';

describe('Loader suite', () => {

  it('should render without throwing an error', () => {
    const rendered = render(<Loader />).container;
    expect(rendered.querySelector('#loader')).toBeInTheDocument();
  });
});
