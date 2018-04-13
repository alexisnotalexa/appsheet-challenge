/**
 * @jest-environment node
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { shallow, render, mount, configure } from 'enzyme';
configure({ adapter: new Adapter() });

import Card from '../containers/Card';

describe('Card', () => {
  it('should have an image to display users picture', () => {
    const wrapper = shallow(<Card />);
    expect(wrapper.find('img')).to.have.length(1);
  });

  it('should have initial state set', () => {
    const wrapper = shallow(<Card />);
    expect(wrapper.state().bio).to.equal('hidden');
    expect(wrapper.state().profile).to.equal('card__container visible');
  });

  it('should respond to change when bio-btn is clicked', () => {
    const wrapper = shallow(<Card />);
    wrapper.find('.container__btn--bio').simulate('click');
    expect(wrapper.state().bio).to.equal('card__container visible');
    expect(wrapper.state().profile).to.equal('hidden');
  });

  it('should respond to change when back-btn is clicked', () => {
    const wrapper = shallow(<Card />);
    wrapper.find('.container__btn--back-btn').simulate('click');
    expect(wrapper.state().bio).to.equal('hidden');
    expect(wrapper.state().profile).to.equal('card__container visible');
  });
});