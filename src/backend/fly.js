const dgram = require('dgram');
const wait = require('waait');
const commandDelays = require('./commandDelays');

const PORT = 8889;
const HOST = '192.168.10.1';

const drone = dgram.createSocket('udp4');
drone.bind(PORT);

drone.on('message', message => {
    console.log(`Tello : ${message}`);
  });

function handleError (err) {
    if (err) {
      console.log('ERROR')
      console.log(err)
    }
  }

  const commands = ['command', 'takeoff', 'up', 'down','land',];

  let i = 0;

async function go() {
    const command = commands[i];
    const delay = commandDelays[command];
    console.log('Command: ',command);
    
    drone.send(command, 0, command.length, PORT, HOST, handleError);

    await wait(delay);
    i += 1;

    if (i < command.length) {
        return go();
    }
    console.log('done!');


  }

go();