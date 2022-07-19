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

        // message received from the drone containing state buffer info - it will be forwarded to front using socket.io
        this.socket.on('message', (msg) => {
            const parsedMessage = this.parseState(msg);
            if (DroneState.websocket) {
                DroneState.websocket.emit('state', parsedMessage); // transfor buffer into an array of array
            }
        });

        console.log('droneState is on');
    }

    parseState(msg) {
        const result = (msg.toString().split(';').map(x => x.split(';')).map(x => x[0].split(':')));
        result.forEach(element => {
            element[1] = parseInt(element[1])
        });
        result.pop();
        result.unshift(['Label', 'Value']);
        return result;
    }

};



module.exports = DroneState;