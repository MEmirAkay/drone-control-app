import React, { Component } from 'react';
import './control.css';
import socket from './socket';
import Webcam from 'react-webcam';
import DroneState from './DroneState';
import Iframe from 'react-iframe'

function sendCommand(command) {
  return function () {
    console.log('Sending command : ', command);
    socket.emit('command', command);
  };
}


window.addEventListener("keypress", check_keypress, false);
function check_keypress(key) {
  if (key.keyCode === 81) { // Q
    sendCommand('flip l');
  }
  if (key.keyCode === 87) { // W
    sendCommand('forward 30');

  }
  if (key.keyCode === 69) { // E
    sendCommand('flip r');
  }
  if (key.keyCode === 65) { // A
    sendCommand('left 30');
  }
  if (key.keyCode === 83) { // S
    sendCommand('back 30');
  }
  if (key.keyCode === 68) { // D
    sendCommand('right 30');
  }
  if (key.keyCode === 82) { // R
    sendCommand('flip f');
  }
  if (key.keyCode === 70) { // F
    sendCommand('flip b');
  }
  if (key.keyCode === 13) { // Enter
    sendCommand('takeoff')
  }
  if (key.keyCode === 32) { // Space
    sendCommand('land');
  }
  if (key.keyCode === 80) { // P (Stream On)
    sendCommand('streamon');
  }
  if (key.keyCode === 76) { // L (Stream Off)
    sendCommand('streamoff');
  }
  if (key.keyCode === 37) { // Left Arrow
    sendCommand('ccw 15');
  }
  if (key.keyCode === 38) { // Up Arrow
    sendCommand('up 20');
  }
  if (key.keyCode === 40) { // Down Arrow
    sendCommand('down 20');
  }
  if (key.keyCode === 39) { // Right Arrow
    sendCommand('cw 15');
  }
}

export class Control extends Component {
  static displayName = Control.name;

  render() {
    return (
      <body>

        <div className="container">
          <h1 className="text-light">Control</h1>
          <DroneState />
          <div className="row">
            {/* Pilot-Cam,Video-Cam and Drone State Section */}
            <div className="row">

              <div className="col" id="webcam">
                <Webcam
                  style={{
                    width: 280,
                    height: 250
                  }} />
                <div className="row justify-content-center">
                  <h3>Pilot Cam</h3>
                </div>
                <div className="row justify-content-center">
                  <div>battery</div>
                </div>

              </div>

              <div className="col" id="dronecam">
                <Iframe url="http://localhost:8090"
                  width="830px"
                  height="500px"
                  display="initial"
                  position="relative" />
              </div>

            </div>
            {/* Pilot-Cam,Video-Cam and Drone State Section */}


            {/* Keyboard Section */}
            <div className="row">
              <div className="col">
                <div className="row">
                  <button id="flip_left" className="col btn remote-btn btn-dark flippers" onClick={sendCommand('flip l')}>Q (Flip Left)</button>
                  <button id="go_forward" className="col btn remote-btn btn-primary" onClick={sendCommand('forward 20')}>W (Forward)</button>
                  <button id="flip_right" className="col btn remote-btn btn-dark flippers" onClick={sendCommand('flip r')}>E (Flip Right)</button>
                  <button id="flip_forward" className="col btn remote-btn btn-dark flippers" onClick={sendCommand('flip f')}>R (Flip Forward)</button>
                </div>
                <div className="row">
                  <button id="go_left" className="col remote-btn btn btn-primary" onClick={sendCommand('left 20')}>A (Left)</button>
                  <button id="go_backward" className="col remote-btn btn btn-primary" onClick={sendCommand('back 20')}>S (Backward)</button>
                  <button id="go_right" className="col remote-btn btn btn-primary" onClick={sendCommand('right 20')}>D (Right)</button>
                  <button id="flip_back" className="col remote-btn btn btn-dark flippers" onClick={sendCommand('flip b')}>F (Flip Back)</button>
                </div>
              </div>

              <div className="col">
                <div className="row">
                  <button className="col btn remote-btn btn-success" onClick={sendCommand('takeoff')}>ENTER (Take Off)</button>
                </div>
                <div className="row">
                  <button className="col btn remote-btn btn-danger" onClick={sendCommand('land')}>Space (Land)</button>
                </div>
              </div>

              <div className="col">
                <div className="row">

                  <button className="col btn remote-btn btn-dark" onClick={sendCommand('streamon')}>Stream On (P)</button>
                  <button id="go_up" className="col btn remote-btn btn-primary" onClick={sendCommand('up 20')}>UP Arrow (Up)</button>
                  <button className="col btn remote-btn btn-dark" onClick={sendCommand('streamoff')}>Stream Off (L)</button>

                </div>
                <div className="row">
                  <button id="rotate_left" className="col btn remote-btn btn-primary" onClick={sendCommand('ccw 45')}>Left Arrow (Rotate Left)</button>
                  <button id="go_down" className="col btn remote-btn btn-primary" onClick={sendCommand('down 20')}>Down Arrow (Down)</button>
                  <button id="rotate_right" className="col remote-btn btn btn-primary" onClick={sendCommand('cw 45')}>Right Arrow (Rotate Right)</button>
                </div>
              </div>
            </div>
            {/* Keyboard Section */}
          </div>


        </div>
      </body>

    );
  }
}

export default Control