import React, { useState, useEffect } from 'react';
import './control.css';
import socket from '../socket';
import Webcam from 'react-webcam';
import Iframe from 'react-iframe';
import Battery from './battery'
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import * as WiIcons from 'react-icons/wi';

function sendCommand(command) {
    return function () {
        console.log('Sending command : ', command);
        socket.emit('command', command);
    };
}

function useDroneState() {
    const [droneState, updateDroneState] = useState({});
    useEffect(() => {
        socket.on('dronestate', updateDroneState);
        return () => socket.removeListener('dronestate');
    }, []);
    return droneState;
}

function useSocket() {
    const [status, updateStatus] = useState('DISCONNECTED');
    useEffect(() => {
        socket.on('status', updateStatus);
        return () => socket.removeListener('status');
    }, []);
    return status;
}

var rc_a = 0;
var rc_b = 0;
var rc_c = 0;
var rc_d = 0;
var flightSpeed = 60;

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<            K E Y    D O W N     O P T I O N              >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
window.addEventListener("keydown", check_keydown, false);
function check_keydown(key) {

    if (key.keyCode === 87) { // W
        rc_b = `${flightSpeed}`;
    }
    if (key.keyCode === 65) { // A
        rc_a = `-${flightSpeed}`;
    }
    if (key.keyCode === 83) { // S
        rc_b = `-${flightSpeed}`;
    }
    if (key.keyCode === 68) { // D
        rc_a = `${flightSpeed}`;
    }
    if (key.keyCode === 38) { // Up Arrow
        rc_c = `${flightSpeed}`;
    }
    if (key.keyCode === 40) { // Down Arrow
        rc_c = `-${flightSpeed}`;
    }
    if (key.keyCode === 37) { // Left Arrow
        rc_d = `-${flightSpeed}`;
    }
    if (key.keyCode === 39) { // Right Arrow
        rc_d = `${flightSpeed}`;
    }
    socket.emit('command', `rc ${rc_a} ${rc_b} ${rc_c} ${rc_d}`)

    if (key.keyCode === 81) { // Q
        socket.emit('command', 'flip l');
    }
    if (key.keyCode === 69) { // E
        socket.emit('command', 'flip r');
    }
    if (key.keyCode === 82) { // R
        socket.emit('command', 'flip r');
    }
    if (key.keyCode === 70) { // F
        socket.emit('command', 'flip b');
    }
    if (key.keyCode === 13) { // Enter
        socket.emit('command', 'takeoff');
    }
    if (key.keyCode === 32) { // Space
        socket.emit('command', 'land');
    }
    if (key.keyCode === 80) { // P (Stream On)
        socket.emit('command', 'streamon');
    }
    if (key.keyCode === 76) { // L (Stream Off)
        socket.emit('command', 'streamoff');
    }
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<            K E Y     U P      O P T I O N              >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

window.addEventListener("keyup", check_keyup, false);
function check_keyup(key) {

    if (key.keyCode === 87) { // W
        rc_b = 0;
    }
    if (key.keyCode === 65) { // A
        rc_a = 0;
    }
    if (key.keyCode === 83) { // S
        rc_b = 0;
    }
    if (key.keyCode === 68) { // D
        rc_a = 0;
    }
    if (key.keyCode === 38) { // Up Arrow
        rc_c = 0;
    }
    if (key.keyCode === 40) { // Down Arrow
        rc_c = 0;
    }
    if (key.keyCode === 37) { // Left Arrow
        rc_d = 0;
    }
    if (key.keyCode === 39) { // Right Arrow
        rc_d = 0;
    }
    socket.emit('command', `rc ${rc_a} ${rc_b} ${rc_c} ${rc_d}`)
}

const ControlComp = () => {

    const status = useSocket();
    const droneState = useDroneState([]);
    

    var toRoundLow = ((droneState.templ - 32) * 5) / 9;
    var toRoundHig = ((droneState.temph - 32) * 5) / 9;

    var tempLowC = toRoundLow.toFixed(2);
    var tempHigC = toRoundHig.toFixed(2);

    if (status === 'CONNECTED') {
        document.getElementById('status').style.backgroundColor = 'green';
    }

    if (droneState.bat > 40) {
        document.getElementById('flip_left').disabled = false;
        document.getElementById('flip_right').disabled = false;
        document.getElementById('flip_forward').disabled = false;
        document.getElementById('flip_back').disabled = false;
    }

    return (
        <body>
            <div className="content">
                <div className="row">
                    <div className="row justify-content-center status" id="status">
                        <div className="col col-md-12">
                            <h3 className="statusText">{status}</h3>
                        </div>
                    </div>
                    {/* Pilot-Cam,Video-Cam and Drone State Section */}
                    <div className="row" id="cams">
                        <div className="col" id="webcam">
                            <Webcam
                                style={{
                                    width: 280,
                                    height: 250
                                }} />

                            <div className="row justify-content-center col-md-12">
                                <Battery className="col-md-12" battery={droneState.bat} />
                                <p className="col-md-12 pt-3 pl-4 statusP"><FaIcons.FaTemperatureLow className="statusIcons"/><span className="infoBubble">Lowest temprature.</span> : {droneState.templ}°F - {tempLowC}°C</p>
                                <p className="col-md-12 pl-4 statusP"><FaIcons.FaTemperatureHigh className="statusIcons"/><span className="infoBubble">Highest temprature.</span> : {droneState.temph}°F - {tempHigC}°C</p>
                                <p className="col-md-12 ml-0 statusP"><WiIcons.WiBarometer className="statusIcons baro"/><span className="infoBubble">Barometer measurement in cm.</span> : {droneState.baro}mb</p>
                                <p className="col-md-12 pl-4 statusP"><FaIcons.FaRulerVertical className="statusIcons"/><span className="infoBubble">The height in cm.</span> : {droneState.h}cm</p>
                                <p className="col-md-12 statusP"><GiIcons.GiBoatPropeller className="statusIcons" /><span className="infoBubble">The amount of time the motor has been used.</span> : {droneState.time}sec</p>
                                <p className="col-md-12 statusP"><GiIcons.GiDeliveryDrone className="statusIcons" /><span className="infoBubble">The time of flight distance in cm</span> : {droneState.tof}cm</p>
                                <p>Pitch:{droneState.pitch} | Yaw:{droneState.yaw} | Roll:{droneState.roll}</p>
                                <p>Speed On Axis: X-{droneState.vgx} Y-{droneState.vgy} Z-{droneState.vgz}</p>
                                <p>Acceleration of the: X-{droneState.agx} Y-{droneState.agy} Z-{droneState.agz}</p>
                            </div>


                        </div>

                        <div className="col" id="dronecam">
                            <Iframe url="http://localhost:8090"
                                width="1010px"
                                height="650px"
                                display="initial"
                                position="relative" />
                        </div>

                    </div>
                    {/* Pilot-Cam,Video-Cam and Drone State Section */}


                    {/* Keyboard Section */}
                    <div className="row">
                        <div className="col-md-5">
                            <div className="row">
                                <button disabled id="flip_left" className="col btn remote-btn btn-dark flippers" onClick={sendCommand('flip l')}>Q <p>(Flip Left)</p></button>

                                <button id="go_forward" className="col btn remote-btn btn-primary" onMouseDown={sendCommand('rc 0 60 0 0')} onMouseUp={sendCommand('rc 0 0 0 0')} >W <p>(Forward)</p></button>
                                <button disabled id="flip_right" className="col btn remote-btn btn-dark flippers" onClick={sendCommand('flip r')}>E <p>(Flip Right)</p></button>
                                <button disabled id="flip_forward" className="col btn remote-btn btn-dark flippers" onClick={sendCommand('flip f')}>R <p>(Flip Forward)</p></button>
                            </div>
                            <div className="row">
                                <button id="go_left" className="col remote-btn btn btn-primary" onMouseDown={sendCommand('rc -60 0 0 0')} onMouseUp={sendCommand('rc 0 0 0 0')} >A <p>(Left)</p></button>
                                <button id="go_backward" className="col remote-btn btn btn-primary" onMouseDown={sendCommand('rc 0 -60 0 0')} onMouseUp={sendCommand('rc 0 0 0 0')} >S <p>(Backward)</p></button>
                                <button id="go_right" className="col remote-btn btn btn-primary" onMouseDown={sendCommand('rc 60 0 0 0')} onMouseUp={sendCommand('rc 0 0 0 0')} >D <p>(Right)</p></button>
                                <button disabled id="flip_back" className="col remote-btn btn btn-dark flippers" onClick={sendCommand('flip b')}>F <p>(Flip Back)</p></button>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="row">
                                <button className="col btn remote-btn btn-success" onClick={sendCommand('takeoff')}>Enter <p>(Take Off)</p></button>
                            </div>
                            <div className="row">
                                <button className="col btn remote-btn btn-danger" onClick={sendCommand('land')}>Space <p>(Land)</p></button>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="row">

                                <button className="col btn remote-btn btn-dark" onClick={sendCommand('streamon')}>Stream On <p>(P)</p></button>
                                <button id="go_up" className="col btn remote-btn btn-primary" onMouseDown={sendCommand('rc 0 0 60 0')} onMouseUp={sendCommand('rc 0 0 0 0')} >UP Arrow <p>(Up)</p></button>
                                <button className="col btn remote-btn btn-dark" onClick={sendCommand('streamoff')}>Stream Off <p>(L)</p></button>

                            </div>
                            <div className="row">
                                <button id="rotate_left" className="col btn remote-btn btn-primary" onMouseDown={sendCommand('rc 0 0 0 -60')} onMouseUp={sendCommand('rc 0 0 0 0')} >Left Arrow <p>(Rotate Left)</p></button>
                                <button id="go_down" className="col btn remote-btn btn-primary" onMouseDown={sendCommand('rc 0 0 -60 0')} onMouseUp={sendCommand('rc 0 0 0 0')} >Down Arrow <p>(Down)</p></button>
                                <button id="rotate_right" className="col remote-btn btn btn-primary" onMouseDown={sendCommand('rc 0 0 0 60')} onMouseUp={sendCommand('rc 0 0 0 0')} >Right Arrow <p>(Rotate Right)</p></button>
                            </div>
                        </div>
                    </div>
                    {/* Keyboard Section */}
                </div>


            </div>
        </body>

    );
}


export default ControlComp