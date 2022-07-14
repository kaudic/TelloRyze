// import native module from Node
const dgram = require('dgram');


class DroneState {

    static websocket; // will be updated on each connection from front (refreshment of page) by the io connection event
    socket;
    port;
    host;

    constructor(port, host) {
        this.port = port;
        this.host = host;
        this.socket = dgram.createSocket('udp4');
        this.socket.bind(port, host);

        this.socket.on('message', (msg) => {
            const parsedMessage = this.parseState(msg);
            if (DroneState.websocket) {
                DroneState.websocket.emit('state', parsedMessage); // transfor buffer into an array of array
            }
        });

        console.log('droneState is on');
    }

    parseState(msg) {
        return msg.toString().split(';').map(x => x.split(';'));
    }

};



module.exports = DroneState;