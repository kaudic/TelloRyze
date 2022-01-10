// Faire une initialisation de connexion au drone
const dgram = require('dgram');
const PORT = process.env.TELLO_CMD_PORT;
const HOST = process.env.TELLO_HOST;

const client = {
    isClient: false,

    init: async () => {
        console.log('init in process');
        client.drone.bind(PORT);
        client.drone.on('message', (message) => {
            console.log(`Drone.on message: ${message}`);
        });
        client.drone.send('command', 0, 7, PORT, HOST, client.handleError);
        client.drone.send('battery?', 0, 8, PORT, HOST, client.handleError);
        client.isClient = true;
    },

    drone: dgram.createSocket('udp4'),

    handleError: (err) => {
        if (err) {
            console.log(`HandleError->Error ${err}`);
        }
    },
}

module.exports = client;