const express = require('express');
const router = express.Router();
const controller = require('./controller');
const isClient = require('./isClient');

//liste des routes GET
router.get('/', controller.boardPage); //page d'accueil
router.get('/takeoff', isClient(), controller.takeoff); //takeoff
router.get('/land', isClient(), controller.land); //land
module.exports = router;