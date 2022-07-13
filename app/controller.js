const drone = require('./class/droneio');

// By calling this file I launch the state
require('./class/droneState');

const controller = {
    boardPage: async (_, res) => {
        res.render('index.ejs');
    },

    sendCommand: async (req, res) => {
        const { command, option } = req.body;

        try {
            await drone.send(command);
            return res.status(200).json(`${option ? option : '(no option)'}${command} !`);
        }

        catch (e) {
            return res.status(500).json(e.message);

        }
    },
};

module.exports = controller;



// making the drone servor for getting state info

        // const droneState = dgram.createSocket('udp4');
        // droneState.bind(STATE_PORT, STATE_HOST);



        // droneState.on('message', (msg, rinfo) => {
        //     console.log(`drone state: ${msg} from ${rinfo.address}:${rinfo.port}`);
        // });