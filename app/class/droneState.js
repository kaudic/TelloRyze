// import native module from Node
const dgram = require('dgram');

// import the websocket initialized from index server file - static property
// const WebSocketIo = require('./webSocketIo');

class DroneState {

    static websocket;
    socket;
    port;
    host;

    constructor(port, host) {
        this.port = port;
        this.host = host;
        this.socket = dgram.createSocket('udp4');
        this.socket.bind(port, host);

        this.socket.on('message', (msg) => {
            // const parsedMessage = this.parseState();
            if (DroneState.websocket) {
                DroneState.websocket.emit('state', msg.toString());
            }
            // console.log(msg.toString());
        });

        console.log('droneState is on');
    }

    // parseState(msg) {
    //     return msg.split
    // }

};



module.exports = DroneState;