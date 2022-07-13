//importation et gestion des modules externes
const http = require('http');
require('dotenv').config();
const WebSocketIo = require('./app/class/webSocketIo');

const app = require('./app');
const port = process.env.PORT ?? 3000;
const server = http.createServer(app);

// initialize a websocket for double communication canal
const websocket = new WebSocketIo(server);

//application à l'écoute d'un port
server.listen(port, () => {
    console.log(`Navigator listenning on port ${port}`);
});
