import { useState, useEffect } from 'react';
import socket from './socket';

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

function useBattery() {
  var [battery, updateBattery] = useState('0');
  useEffect(() => {
    socket.on('dronebattery', updateBattery);
    return () => socket.removeListener('dronebattery');
  },[]);
  return battery;
}
  
const DroneState = () => {
    const status = useSocket();
    const droneState = useDroneState([]);
    var battery = useBattery();
    return (
        <div>
            <p>Battery : {battery}</p>
            <p>Status : {status} </p>
            <p>Pitch : {droneState.pitch} </p>
            <p>Roll : {droneState.roll} </p>
            <p>Yaw : {droneState.yaw} </p>
            <p>H : {droneState.h} </p>
        </div>
    );
};

export default DroneState;