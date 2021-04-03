import styled from 'styled-components';
import socket from './socket';

function sendCommand(command) {
    return function() {
        console.log('Sending the command: ${command}');
        socket.emit('command',command);
    };
}

const CommandGrid = styled.div;

const Commands = () => (
    <CommandGrid>
        <button className="takeoff" onClick={sendCommand('takeoff')}>
            Take Off
        </button>
    </CommandGrid>
);

export default Commands;