import React from 'react';
import { shallow } from 'enzyme';
import Field from '../../../scenes/notices/Field';

describe('Field suite', () => {
  
  it('should render a p with title and content', () => {
    const hello = shallow(<Field title="hello" content="mycontent" />);
    expect(hello.find('#hello')).toHaveLength(1);
    expect(hello.find('#hello').text()).toContain('hello');
    expect(hello.find('#hello>p').text()).toContain('mycontent');
  });
});
