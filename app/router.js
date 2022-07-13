const express = require('express');
const router = express.Router();
const controller = require('./controller');

// routing list
router.get('/', controller.boardPage); //page d'accueil
router.post('/command', controller.sendCommand); // send command to Droneio

module.exports = router;