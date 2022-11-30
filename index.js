// imports modules
const http = require('http');
require('dotenv').config();
const WebSocket = require('ws');
const spawn = require('child_process').spawn;


// create a server to render the web page (controllers for drone, video player and indicators for Drone State)
const app = require('./app');
const port = process.env.PORT ?? 3000;
const server = http.createServer(app);

// application à l'écoute d'un port
server.listen(port, () => console.log(`Navigator listenning on port ${port}`));

// initialize a websocket for pushing state from Drone
// socket for the Drone state
const WebSocketIo = require('./app/class/webSocketIo');
const websocket = new WebSocketIo(server);

//------------------------------------------------------------------------------------------------------------------------------
// create a second server to stream the video from Drone camera and forward to another webSocket
const streamPort = process.env.STREAM_SERVER_PORT ?? 3001;
const streamServer = http.createServer((req, res) => {

    // Log that a stream connection has come through
    console.log(`Stream Connection on from: ${req.socket.remoteAddress}:${req.socket.remotePort}`);

    // listenning to data event on the stream server - ffmpeg will send data through the spawn child process
    req.on('data', (data) => {
        webSocketStreamServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });

}).listen(streamPort, () => console.log(`Stream port is on and listenning on ${streamPort}`));

// initialize a websocket for pushing video stream from Drone to browser
const webSocketStreamServer = new WebSocket.Server({
    server: streamServer
});

// launching the encoding and piping from the Drone, after a delay of 3seconds
setTimeout(function () {
    var args = [
        "-i", "udp://0.0.0.0:11111",
        "-r", "30",
        "-s", "960x720",
        "-codec:v", "mpeg1video",
        "-b", "800k",
        "-f", "mpegts",
        `http://127.0.0.1:${process.env.STREAM_SERVER_PORT}/stream`
    ];

    // Spawn an ffmpeg instance
    var streamer = spawn('ffmpeg', args);
    // Uncomment if you want to see ffmpeg stream info
    //streamer.stderr.pipe(process.stderr);
    streamer.on("exit", function (errCode) {
        console.log("Failure with code : " + errCode);
    });
}, 3000);





