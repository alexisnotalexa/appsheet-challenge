/**
 * @jest-environment node
 */

import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import { shallow, render, mount, configure } from 'enzyme';
configure({ adapter: new Adapter() });

import Main from '../containers/Main';

describe('Main', () => {
  it('should have initial state set', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.state().filter).to.equal('Name');
    expect(wrapper.state().userList).to.equal(false);
  });
});