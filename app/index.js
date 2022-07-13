const express = require('express');
const router = require('./router');
const app = express();


//premiers middlewares
app.set('views', `${process.cwd()}/app/views`);
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.json());//gestion des fetch JSON
app.use(express.urlencoded({ extended: true }));

// calling the router
app.use(router);

module.exports = app;