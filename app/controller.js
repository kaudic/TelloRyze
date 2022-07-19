const drone = require('./class/droneio');

// By calling this file I launch the state
require('./class/droneState');

const controller = {
    boardPage: async (_, res) => {
        res.render('index.ejs');
    },

    sendCommand: async (req, res) => {
        let { command, option } = req.body;

        if (option) {
            command = command + ' ' + option;
        }

        try {
            console.log('----------------------: ' + command);
            await drone.send(command);
            return res.status(200).json(`${option ? option : '(no option)'}${command} !`);
        }

        catch (e) {
            return res.status(500).json(e.message);

        }
    },
};

module.exports = controller;
