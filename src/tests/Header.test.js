import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { shallow, render, mount, configure } from 'enzyme';
configure({ adapter: new Adapter() });

import Header from '../components/Header';

describe('Header', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('has fontawesome symbol', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('.fa-telegram-plane')).to.have.length(1);
  });

  it('has a header', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('header')).to.have.length(1);
  });
});