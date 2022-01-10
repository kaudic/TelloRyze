const client = require('./client');

const initClient = () => {

    if (!client.isClient) {
        client.init();
    }

    return (req, res, next) => {
        next();
    };

}

module.exports = initClient;