import React from 'react';
import { Link } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Nav from './Nav';

configure({adapter: new Adapter()});

describe('<Nav />', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Nav />)
  })

  it('Should render 4 <Link />', () => {
    expect(wrapper.find(Link)).toHaveLength(4);
  });
  it('The first Link should change the route to "/home".', () => {
    expect(wrapper.find(Link).at(0).prop('to')).toEqual('/home');
  });
  it('The second Link must have the text "About" and change the route to "/about"', () => {
    expect(wrapper.find(Link).at(1).prop('to')).toEqual('/about');
    expect(wrapper.find(Link).at(1).text()).toEqual('About');
  });
  it('The third Link must have the text "Favorites" and change the route to "/favorites"', () => {
    expect(wrapper.find(Link).at(2).prop('to')).toEqual('/favorites');
    expect(wrapper.find(Link).at(2).text()).toEqual('Favorites');
  });
  it('The fourth Link must have the text "Create Videogame" and change the route to "/creation"', () => {
    expect(wrapper.find(Link).at(3).prop('to')).toEqual('/creation');
    expect(wrapper.find(Link).at(3).text()).toEqual('Create Videogame');
  });
})