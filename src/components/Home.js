import React, { Component } from 'react';
import isUndefined from 'lodash/isUndefined';
import "../backend/fly";
import io from 'socket.io-client'
import '../backend/fly';
const socket = io('http://localhost:6767');

function useDroneState () {
  const [droneState, updateDroneState] = useState()
  useEffect(() => {
    socket.on('dronestate', updateDroneState)
    return () => socket.removeListener('dronestate')
  }, [])
  return droneState
}

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
            <button class="tstbtnstyle btn btn-success" onClick={sendCommand('land')}>Drone Land</button>
      </div>
    );
  }
}

export default Home