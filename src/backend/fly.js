const dgram = require('dgram');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http,{
  cors: {
    origin: '*',
  }
});
const throttle = require('lodash/throttle');

const PORT = 8889;
const HOST = '192.168.10.1';

function parseState (state) {
  return state
    .split(';')
    .map(x => x.split(':'))
    .reduce((data, [key, value]) => {
      data[key] = value
      return data
    }, {})
}

const drone = dgram.createSocket('udp4');
drone.bind(PORT);

const droneState = dgram.createSocket('udp4');
droneState.bind(8890);

drone.on('message', message => {
  console.log(`🤖 : ${message}`);
  io.sockets.emit('status', message.toString());
});


droneState.on('message', state => {
  console.log(`Tello_State : ${state}`);
  const formattedState = parseState(state);
  console.log(formattedState);
});

function handleError (err) {
  if (err) {
    console.log('ERROR')
    console.log(err)
  }
}

drone.send('command', 0, 'command'.length, PORT, HOST, handleError);

/*

const commands = ['command', 'battery?'];

  let i = 0;

async function go() {

    const command = commands[i];
    const delay = commandDelays[command];
    console.log('Command: ',command);
    
    drone.send(command, 0, command.length, PORT, HOST, handleError);
  
    await wait(delay);
    i += 1;

    if (i < commands.length) {
        return go();
    }
    console.log('done!');

  }

go();

*/


io.on('connection', socket => {
  socket.on('command', command => {
    console.log('command Sent from browser');
    console.log(command);
    drone.send(command, 0, command.length, PORT, HOST, handleError);
  });

  socket.emit('status', 'CONNECTED');
});

droneState.on(
  'message',
  throttle(state => {
    const formattedState = parseState(state.toString());
    io.sockets.emit('dronestate', formattedState);
  }, 100)
);


http.listen(6767, () => {
  console.log('Socket io server up and running');
});