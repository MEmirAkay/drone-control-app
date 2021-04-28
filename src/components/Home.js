import React, { Component } from 'react';
import socket from './socket';
import DroneState from './DroneState';

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
            <>
              <DroneState />
            </>
            <button className="tstbtnstyle btn btn-success" onClick={sendCommand('command')}>Connect</button>
            <button className="tstbtnstyle btn btn-success" onClick={sendCommand('battery?')}>Battery</button>
            <button className="tstbtnstyle btn btn-success" onClick={sendCommand('takeoff')}>Drone Takeoff</button>
            <button className="tstbtnstyle btn btn-danger" onClick={sendCommand('land')}>Drone Land</button>
            <button className="tstbtnstyle btn btn-dark" onClick={sendCommand('streamon')}>Stream On</button>
            <button className="tstbtnstyle btn btn-dark" onClick={sendCommand('streamoff')}>Stream Off</button>
      </div>
    );
  }
}

export default Home