const socketio = require('socket.io');
const DroneState = require('./droneState');

const PORT = process.env.TELLO_STATE_PORT ?? 8890;
const HOST = process.env.STATE_HOST;

class WebSocketIo {

    constructor(server) {
        const io = socketio(server);
        // when we create the websocket server, we will create the drone state upd server at the same time
        const droneState = new DroneState(PORT, HOST);


        io.on('connection', socket => {
            // on new connection from client we will update the socket
            DroneState.websocket = socket;

            // sending an info to the front end so that they know socket.io is well initialized
            socket.emit('state', 'connection well established');

        })
    }
};

module.exports = WebSocketIo;