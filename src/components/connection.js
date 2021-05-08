import React, { Component } from 'react';
import './connection/connection.css';
import ConnectionComp from './connection/ConnectionComp';

export class Connection extends Component {
  static displayName = Connection.name;

  render() {
    return (
      <ConnectionComp />
    );
  }
}

export default Connection