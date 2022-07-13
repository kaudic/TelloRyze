
const app = {
    init: () => {
        console.log('app init');
        app.addListenerToActions();

        // lauching socket.io listenners to get Drone State in real time from Back
        const socket = io();
        socket.on('state', (data) => {
            console.log(data);
        });
    },

    addListenerToActions: () => {

        //  get with querySelectorAll all the buttons sending commands
        const commandBtns = document.querySelectorAll('.board__button');
        commandBtns.forEach((btn) => {
            btn.addEventListener('click', api.sendCommand);
        });

    }
}

document.addEventListener('DOMContentLoaded', app.init);