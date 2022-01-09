const wait = require('wait');
const commandDelays = require('./commandDelays');
const PORT = process.env.TELLO_CMD_PORT;
const HOST = process.env.TELLO_HOST;
const client = require('./client');

const commands = {
    handleError: (err) => {
        if (err) {
            console.log(`HandleError->Error ${err}`);
        }
    },

    takeoff: async () => {
        client.drone.send('takeoff', 0, 7, PORT, HOST, commands.handleError);
        await wait(5000);
    },

    land: async () => {
        client.drone.send('land', 0, 4, PORT, HOST, commands.handleError);
        await wait(5000);
    }
}

module.exports = commands;







