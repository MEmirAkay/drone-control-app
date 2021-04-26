import React, { Component } from 'react';
import './control.css';
import socket from './socket';

function sendCommand(command) {
  return function () {
    console.log('Sending command : ', command);
    socket.emit('command', command);
  };
}

export class Control extends Component {
  static displayName = Control.name;


  render() {
    return (

      <div className="container">
        <h1>Control</h1>

        <div className="row">


          <div className="col">
            <div className="row">
              <button className="col btn btn-dark" onClick={sendCommand('flip l')}>Q (Flip Left)</button>
              <button className="col btn btn-primary" onClick={sendCommand('forward 20')}>W (Forward)</button>
              <button className="col btn btn-dark" onClick={sendCommand('flip r')}>E (Flip Right)</button>
              <button className="col btn btn-dark" onClick={sendCommand('flip f')}>R (Flip Forward)</button>
            </div>
            <div className="row">
              <button className="col btn btn-primary" onClick={sendCommand('left 20')}>A (Left)</button>
              <button className="col btn btn-primary" onClick={sendCommand('back 20')}>S (Backward)</button>
              <button className="col btn btn-primary" onClick={sendCommand('right 20')}>D (Right)</button>
              <button className="col btn btn-dark" onClick={sendCommand('flip b')}>F (Flip Back)</button>
            </div>
          </div>
          
          <div className="col">
            <div className="row">
              <button className="col btn btn-success" onClick={sendCommand('takeoff')}>ENTER (Take Off)</button>
            </div>
            <div className="row">
              <button className="col btn btn-danger" onClick={sendCommand('land')}>Space (Land)</button>
            </div>
          </div>

          <div className="col">
            <div className="row">
              
              <button className="col btn btn-dark" disabled></button>
              <button className="col btn btn-primary" onClick={sendCommand('up 20')}>UP Arrow (Up)</button>
              <button className="col btn btn-dark" disabled></button>
              
            </div>
            <div className="row">
              <button className="col btn btn-primary" onClick={sendCommand('cow 45')}>Left Arrow (Rotate Left)</button>
              <button className="col btn btn-primary" onClick={sendCommand('down 20')}>Down Arrow (Down)</button>
              <button className="col btn btn-primary" onClick={sendCommand('cw 45')}>Right Arrow (Rotate Right)</button>
            </div>
          </div>

        </div>

      </div>

    );
  }
}

export default Control