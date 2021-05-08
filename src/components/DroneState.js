import { useState, useEffect } from 'react';
import socket from './socket';
import './DroneState.css'

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
  
const DroneState = () => {
    const status = useSocket();
    const droneState = useDroneState([]);
    return (
        <div className="statusDecoration">
            <p>Status : {status} </p>
            <p>Battery : {droneState.bat}</p>
            <p>Pitch : {droneState.pitch} </p>
            <p>Roll : {droneState.roll} </p>
            <p>Yaw : {droneState.yaw} </p>
            <p>H : {droneState.h} </p>
        </div>
    );
};

export default DroneState;