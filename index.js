//importation et gestion des modules externes
require('dotenv-flow').config();
const express = require('express');
const router = require('./app/router');
const app = express();

app.use(express.static('./front'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.listen(3000, () => console.log('server running and listenning to port 3000'));
