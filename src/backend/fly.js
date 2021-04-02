const dgram = require('dgram');
const wait = require('waait');
const commandDelays = require('./commandDelays');

const PORT = 8889;
const HOST = '192.168.10.1';
/*
function parseState(state) {
  return state.split(';').map(x => x.spilt(':'));

}
*/

const drone = dgram.createSocket('udp4');
drone.bind(PORT);

const droneState = dgram.createSocket('udp4');
droneState.bind(8890);

drone.on('message', message => {
  console.log(`🤖 : ${message}`);
});

droneState.on('message', message => {
  console.log(`Tello_State : ${message}`);
});

function handleError (err) {
  if (err) {
    console.log('ERROR')
    console.log(err)
  }
}

const commands = ['command', 'battery?','time?','speed?'];

  let i = 0;

async function go() {

    const command = commands[i];
    const delay = commandDelays[command];
    console.log('Command: ',command);
    
    drone.send(command, 0, command.length, PORT, HOST, handleError);
    droneState.send('command', 0, 7, 8890, HOST, handleError);
    await wait(delay);
    i += 1;

    if (i < commands.length) {
        return go();
    }
    console.log('done!');

  }

go();