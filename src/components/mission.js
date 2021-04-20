import React, { Component } from 'react';
// import socket from './socket';
/*
function sendCommand(command){
  return function(){
    console.log('Sending command : ',command);
    socket.emit('command',command);
  };
}
*/
export class Mission extends Component {
  static displayName = Mission.name;

  render () {
    return (

       <h1>Mission</h1>
    );
  }
}

export default Mission