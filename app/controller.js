const fly = require('./fly');

const controller = {
    boardPage: async (req, res) => {
        console.log('coucou');
        res.json('welcome to Tello Ryze');
    },

    takeoff: async (req, res) => {
        console.log('takeoff');
        fly.takeoff();
        res.json('takeoff!');
    },

    land: async (req, res) => {
        console.log('land');
        fly.land();
        res.json('land!');
    }
}

module.exports = controller;