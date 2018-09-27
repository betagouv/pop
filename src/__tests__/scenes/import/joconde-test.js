import React from 'react';
import Joconde from '../../../scenes/import/joconde';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { shallow, mount, render } from 'enzyme';
 

const initialState = {
  Auth: {
    user: {
      email: 'foo.bar@example.org'
    }, 
    token: null,
    error: '',
  }
}; 

const mockStore = configureStore();
let store;
beforeEach(() => {
  store = mockStore(initialState)
});
 

test('Joconde import component renders', () => {
  let wrapper = mount(<Provider store={store}><Joconde /></Provider>);
  expect(wrapper.text()).toContain('déposez vos fichiers');
});
