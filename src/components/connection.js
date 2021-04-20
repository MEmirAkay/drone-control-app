import React, { Component } from 'react';
import socket from './socket';

function sendCommand(command){
    return function(){
      console.log('Sending command : ',command);
      socket.emit('command',command);
    };
}

export class Connection extends Component {
    static displayName = Connection.name;
  
    render () {
      return (
          <div className="container">
              <h1>CONNECTION</h1>
              <button className="tstbtnstyle btn btn-success" onClick={sendCommand('command')}>Connect</button>
              <button className="tstbtnstyle btn btn-success" onClick={sendCommand('battery?')}>Battery</button>
              <button className="tstbtnstyle btn btn-success" onClick={sendCommand('takeoff')}>Drone Takeoff</button>
              <button className="tstbtnstyle btn btn-danger" onClick={sendCommand('land')}>Drone Land</button>
              <h1>CONNECTION</h1>
        </div>
      );
    }
  }
  
  export default Connection