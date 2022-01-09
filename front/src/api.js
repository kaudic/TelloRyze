const api = {

    baseUrl: 'http://localhost:3000',

    takeoff: async () => {
        console.log('fetch to takeoff');
        const takeoff = await fetch(`${api.baseUrl}/takeoff`).then(response => response.json());
        console.log(takeoff);

    },

    land: async () => {
        console.log('fetch to land');
        const land = await fetch(`${api.baseUrl}/land`).then(response => response.json());
        console.log(land);
    },
}

