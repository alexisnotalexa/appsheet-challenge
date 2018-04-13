/**
 * @jest-environment node
 */

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { shallow, render, mount, configure } from 'enzyme';
configure({ adapter: new Adapter() });

import Header from '../components/Header';

describe('Header', () => {
  it('has fontawesome symbol', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('.fa-telegram-plane')).to.have.length(1);
  });

  it('has a header', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('header')).to.have.length(1);
  });
});