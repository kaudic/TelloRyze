const req = require('express/lib/request');
const client = require('./client');

const initClient = () => {

    if (!req.session.initClient) {
        req.session.initClient = false;
    }

    if (req.session.initClient === false) {
        client.init();
        req.session.initClient = true;
    }

    return (req, res, next) => {
        next();
    };


}

module.exports = initClient;