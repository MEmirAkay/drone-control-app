import React, { Component } from 'react';
import "../backend/fly";
import io from 'socket.io-client';
const socket = io('http://localhost:6767');

function sendCommand(command){
  return function(){
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