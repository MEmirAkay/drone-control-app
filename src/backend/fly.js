const dgram = require('dgram');
const app = require('express')();
const { Server } = require('socket.io');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const throttle = require('lodash/throttle');

const PORT = 8889;
const HOST = '192.168.10.1';

const drone = dgram.createSocket('udp4');
drone.bind(PORT)

function parseState (state) {
  return state
    .split(';')
    .map(x => x.split(':'))
    .reduce((data, [key, value]) => {
      data[key] = value
      return data
    }, {})
}

const droneState = dgram.createSocket('udp4');
droneState.bind(8890)

drone.on('message', message => {
  console.log(`🤖 : ${message}`);
  io.sockets.emit('status', message.toString());

})

function handleError (err) {
  if (err) {
    console.log('ERROR')
    console.log(err)
  }
}

/*
droneBattery.on(
  'dronebattery'
  io.socket.emit('dronebattery');
)
*/

droneState.on(
  'message',
  throttle(state => {
    const formattedState = parseState(state.toString())
    io.sockets.emit('dronestate', formattedState)
  }, 100)
)

drone.send('command', 0, 'command'.length, PORT, HOST, handleError);

io.on('connection',socket => {
  socket.on('command',command => {
    console.log('Gelen komut: ');
    console.log(command);
  });
})

io.on('connection', socket => { // socket bağlantısı
  socket.on('command', command => {
    console.log('command Sent from browser: ');
    console.log(command);
    drone.send(command, 0, command.length, PORT, HOST, handleError);
  });

  socket.emit('status', 'CONNECTED');
});

http.listen(6767, () => {
  console.log('Socket io server up and running');
});