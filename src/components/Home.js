import React, { Component } from 'react';
import Homecomponents from './home/Homecomponents';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <Homecomponents />
    );
  }
}

export default Home