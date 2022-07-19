const dgram = require('dgram');
const HOST = process.env.TELLO_HOST ?? '190.168.10.1';
const PORT = process.env.TELLO_CMD_PORT ?? 8889;

class Droneio {
    socket; // will have the udp4 socket from dgram made by the constructor
    port;
    host;

    constructor(port, host) {
        this.port = port;
        this.host = host;

        this.socket = dgram.createSocket('udp4');
        this.socket.bind(port);

        this.socket.on('error', (err) => {
            console.log(`drone error:\n${err.stack}`);
            this.socket.close();
        });

        this.socket.on('message', (msg, rinfo) => {
            console.log(`drone message: ${msg} from ${rinfo.address}:${rinfo.port}`);
        });

        // initialize the drone to accept command
        this.send('command');
        // initialize the video stream
        this.send('streamon');
    };


    async send(command) {
        const commandBuffer = Buffer.from(command, 'utf8');
        console.log(`sending -${command}- to the drone`);
        this.socket.send(commandBuffer, 0, commandBuffer.length, this.port, this.host, this.errorHandler)
        await this.wait(this.delays[command]);
        console.log('drone ready for next command');
        return new Promise((resolve) => resolve());
    }

    errorHandler(err) {
        if (err) throw err;
    };

    wait(timeout) {
        console.log(`waiting ${timeout} milliseconds`);
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('stop waiting');
                return resolve();
            }, timeout);
        })
    }

    delays = {
        'command': 500,
        'takeoff': 5000,
        'up': 7000,
        'down': 7000,
        'left': 5000,
        'right': 5000,
        'cw': 5000,
        'ccw': 5000,
        'flip': 5000,
        'go': 7000,
        'forward': 5000,
        'back': 5000,
        'speed': 3000,
        'land': 5000,
        'battery?': 500,
        'speed?': 500,
        'time': 500
    }

}

// create instance of Drone
const droneio = new Droneio(PORT, HOST);

module.exports = droneio;