
const api = {

    baseUrl: 'http://localhost:3000',

    sendCommand: async (e) => {
        e.preventDefault();
        // get command and option if any info from dataset of the button clicked
        const { command, option } = e.target.dataset;

        // informing User with a logger on screen
        const logger = document.getElementById('flightLogger');
        logger.textContent += `\nSending to API the command -${command}- \n--------------------------------\n`;
        if (option) {
            logger.textContent += `option -${option}- sent along the command\n--------------------------------\n`;
        }
        logger.scrollTop = logger.scrollHeight;

        // sending details to back
        const resultFromCommand = await fetch(`${api.baseUrl}/command`, {
            method: 'POST',
            body: JSON.stringify({
                command,
                option
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .catch(error => console.log(error));

        console.log('info from Drone: ' + resultFromCommand);

    },

}

