import React, { Component } from 'react';
import './control.css';
import socket from './socket';

let battery_level = 10;

function sendCommand(command) {
  return function () {
    console.log('Sending command : ', command);
    socket.emit('command', command);
  };
}

socket.on('image',(image) => {
  const imageElm = document.getElementById('image');
  imageElm.src = `data:image/jpeg;base64 ${image}`;
});

const flip_button = document.getElementsByClassName('flippers');

if (battery_level < 20) {
  flip_button.disabled = true;
}else{
  flip_button.disabled = false;
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
              <button id="flip_left" className="col btn btn-dark flippers" onClick={sendCommand('flip l')}>Q (Flip Left)</button>
              <button id="go_forward" className="col btn btn-primary" onClick={sendCommand('forward 20')}>W (Forward)</button>
              <button id="flip_right" className="col btn btn-dark flippers" onClick={sendCommand('flip r')}>E (Flip Right)</button>
              <button id="flip_forward" className="col btn btn-dark flippers" onClick={sendCommand('flip f')}>R (Flip Forward)</button>
            </div>
            <div className="row">
              <button id="go_left" className="col btn btn-primary" onClick={sendCommand('left 20')}>A (Left)</button>
              <button id="go_backward" className="col btn btn-primary" onClick={sendCommand('back 20')}>S (Backward)</button>
              <button id="go_right" className="col btn btn-primary" onClick={sendCommand('right 20')}>D (Right)</button>
              <button id="flip_back" className="col btn btn-dark flippers" onClick={sendCommand('flip b')}>F (Flip Back)</button>
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
              <button id="go_up" className="col btn btn-primary" onClick={sendCommand('up 20')}>UP Arrow (Up)</button>
              <button className="col btn btn-dark" disabled></button>
              
            </div>
            <div className="row">
              <button id="rotate_left" className="col btn btn-primary" onClick={sendCommand('ccw 45')}>Left Arrow (Rotate Left)</button>
              <button id="go_down" className="col btn btn-primary" onClick={sendCommand('down 20')}>Down Arrow (Down)</button>
              <button id="rotate_right" className="col btn btn-primary" onClick={sendCommand('cw 45')}>Right Arrow (Rotate Right)</button>
            </div>
          </div>

        </div>

      </div>

    );
  }
}

export default Control