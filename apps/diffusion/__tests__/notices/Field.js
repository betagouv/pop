import React from 'react';
import { render } from '@testing-library/react';
import Field from '../../src/notices/Field';

describe('Field suite', () => {

  it('should render a p with title and content', () => {
    const hello = render(<Field title="hello" content="Mycontent" />);
    expect(hello.getByRole('heading')).toHaveTextContent(/hello/i);
    expect(hello.getByText(/Mycontent/i)).toBeInTheDocument();
  });
});
