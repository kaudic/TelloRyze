
const app = {
    init: () => {
        console.log('app init');
        app.addListenerToActions();
        app.initGauges();
        app.initSockets();
    },

    addListenerToActions: () => {
        //  get with querySelectorAll all the buttons sending commands
        const commandBtns = document.querySelectorAll('.board__button');
        commandBtns.forEach((btn) => {
            btn.addEventListener('click', api.sendCommand);
        });
    },
    initGauges: () => {
        google.charts.load('current', { 'packages': ['gauge'] });
        google.charts.setOnLoadCallback(() => {
            var data = google.visualization.arrayToDataTable([
                ['Label', 'Value'],
                ['pitch', 80],
                ['roll', 55],
                ['yaw', 68],
                ['vgx', 55],
                ['vgy', 55],
                ['vgz', 55],
                ['templ', 55],
                ['temph', 55],
                ['tof', 55],
                ['h', 55],
                ['bat', 55],
                ['baro', 55],
                ['time', 55],
                ['agx', 55],
                ['agy', 55],
                ['agz', 55],
            ]);

            app.options = {
                width: 2000, height: 450,
                redFrom: 90, redTo: 100,
                yellowFrom: 75, yellowTo: 90,
                minorTicks: 5
            };

            var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
            app.chart = chart;

            chart.draw(data, app.options);
        });


    },
    initSockets: () => {
        // lauching socket.io listenners to get Drone State in real time from Back
        const socket = io();
        socket.on('state', (data) => {
            if (app.chart) {
                chart.draw(data, app.options);
            }
            // console.log(data);
        });
    }


}

document.addEventListener('DOMContentLoaded', app.init);