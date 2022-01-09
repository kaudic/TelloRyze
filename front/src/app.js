// const api = require('./api');

const app = {
    init: () => {
        console.log('app init');
        app.addListenerToActions();
    },

    addListenerToActions: () => {

        //event takeoff
        const takeOffBtnElt = document.getElementById('takeoff');
        takeOffBtnElt.addEventListener('click', api.takeoff);

        //event land
        const landBtnElt = document.getElementById('land');
        landBtnElt.addEventListener('click', api.land);

    }
}

document.addEventListener('DOMContentLoaded', app.init);