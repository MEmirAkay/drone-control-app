import React, { Component } from 'react';
import socket from './socket';

function sendCommand(command){
  return function(){
    console.log('Sending command : ',command);
    socket.emit('command',command);
  };
}

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div className="container">
            <button class="tstbtnstyle btn btn-success" onClick={sendCommand('takeoff')}>Drone Takeoff</button>
            <button class="tstbtnstyle btn btn-danger" onClick={sendCommand('land')}>Drone Land</button>
      </div>
    );
  }
}

export default Home