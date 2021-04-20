/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import socket from './socket';
import tello_img from './img/tello_drone.jpg';
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
            <img src={tello_img}/>
            <p>Connection : {DroneState.state}</p>
            <p>Battery : {DroneState.battery}</p>
            <button className="tstbtnstyle btn btn-success" onClick={sendCommand('command')}>Connect</button>
            <button className="tstbtnstyle btn btn-success" onClick={sendCommand('battery?')}>Battery</button>
            <button className="tstbtnstyle btn btn-success" onClick={sendCommand('takeoff')}>Drone Takeoff</button>
            <button className="tstbtnstyle btn btn-danger" onClick={sendCommand('land')}>Drone Land</button>
      </div>
    );
  }
}

export default Home