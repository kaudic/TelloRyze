const telloChart = require('./telloChart');

const app = {
    init: () => {
        console.log('app init');
        app.addListenerToActions();

        // Display the video stream player
        app.initVideoPlayer();

        // Init the charts
        telloChart.init();

        // Socket to get state info from Drone and update the gauges indicators
        app.initSockets();
    },
    addListenerToActions: () => {
        //  get with querySelectorAll all the buttons sending commands
        const commandBtns = document.querySelectorAll('.board__button');
        commandBtns.forEach((btn) => {
            btn.addEventListener('click', api.sendCommand);
        });
    },
    initSockets: () => {
        // lauching socket.io listenners to get Drone State in real time from Back
        const socket = io();
        socket.on('state', (data) => {
            if (telloChart.registeredCharts[0]) { // if one chart exist then we assume they all exist
                telloChart.updateChart(data);
            }
        });
    },
    initVideoPlayer: () => {
        const canvas = document.getElementById('video-canvas');
        const url = 'ws://' + document.location.hostname + ':3001/stream';
        var player = new JSMpeg.Player(url, { canvas: canvas });
    }
};

document.addEventListener('DOMContentLoaded', app.init);