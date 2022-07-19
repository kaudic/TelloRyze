
const Chart = require('chart.js');
const Gauge = require('chartjs-gauge');

const telloChart = {
    init: () => {
        console.log('Chart management is on');
        telloChart.drawTemperatureChart();
        telloChart.drawDistanceChart();
        telloChart.drawRadarChart();
    },
    // with the gauge module
    drawTemperatureChart: () => {
        const ctx1 = document.getElementById("temperatureChart").getContext("2d");

        const temperatureChart = new Gauge(ctx1, {
            type: 'gauge',
            data: {
                datasets: [{
                    value: 0,
                    minValue: 0,
                    maxValue: 120,
                    data: [30, 60, 90, 120],
                    backgroundColor: ['green', 'yellow', 'orange', 'red'],
                }]
            },
            options: {
                aspectRatio: 1,
                // title: {
                //     display: true,
                //     text: 'Temperature',
                // },
                responsive: true,
                needle: {
                    radiusPercentage: 2,
                    widthPercentage: 3.2,
                    lengthPercentage: 80,
                    color: 'rgba(0, 0, 0, 1)'
                },
                valueLabel: {
                    display: true,
                    formatter: (value) => {
                        return Math.round(value) + '°';
                    },
                    color: 'rgba(255, 255, 255, 1)',
                    backgroundColor: 'rgba(0, 0, 0, 1)',
                    borderRadius: 5,
                    fontSize: 20,
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                }
            }
        });

        // save the temperature Chart in attribute chart
        telloChart.registeredCharts = [];
        telloChart.registeredCharts.push(temperatureChart);
    },
    // without the gauge module
    drawDistanceChart: () => {
        const ctx2 = document.getElementById("distanceChart");

        const distanceChart = new Chart(ctx2, {
            type: "doughnut",
            data: {
                labels: ["Red", "Blue"],
                datasets: [{
                    label: "Gauge",
                    data: [10, 190],
                    backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)"
                    ]
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'TOF Distance',
                },
                responsive: true,
                circumference: 180,
                rotation: 270,
                cutout: '70%', // precent
                aspectRatio: 2,
                plugins: {
                    datalabels: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        borderColor: '#ffffff',
                        color: function (context) {
                            return context.dataset.backgroundColor;
                        },
                        font: function (context) {
                            var w = context.chart.width;
                            return {
                                size: w < 512 ? 18 : 20
                            }
                        },
                        align: 'start',
                        anchor: 'start',
                        offset: 10,
                        borderRadius: 4,
                        borderWidth: 1,
                        formatter: function (value, context) {
                            var i = context.dataIndex;
                            var len = context.dataset.data.length - 1;
                            if (i == len) {
                                return null;
                            }
                            return value + ' mph';
                        }
                    }
                },
                legend: {
                    display: false
                },
                tooltips: {
                    enabled: false
                }
            }
        });

        // save the distance Chart in attribute chart
        telloChart.registeredCharts.push(distanceChart);

    },
    updateChart: (data) => {
        // temperature Chart
        const tempChart = telloChart.registeredCharts[0];
        tempChart.data.datasets[0].value = ((data[7][1] + data[8][1]) / 2);
        tempChart.update();

        // distance Chart
        const distChart = telloChart.registeredCharts[1];
        if (JSON.stringify(distChart.data.datasets[0].data) !== JSON.stringify([data[9][1], 200 - data[9][1]])) {
            distChart.data.datasets[0].data = [data[9][1], 200 - data[9][1]];
            distChart.update();
        }

        // Radar Chart
        const radarChart = telloChart.registeredCharts[2];

        const newAngleData = [data[1][1], data[2][1], data[3][1]];
        if (JSON.stringify(radarChart.data.datasets[0].data) !== JSON.stringify(newAngleData)) {
            console.log('updating radar chart...');
            radarChart.data.datasets[0].data = newAngleData;
            radarChart.update();
        }

        // battery chart
        const batteryChart = document.getElementById('batteryLevel');
        if (batteryChart.textContent !== data[11][1] + '%') {
            console.log('updating battery chart...');
            batteryChart.textContent = data[11][1] + '%';
            batteryChart.style.width = ((data[11][1] / 100) * 250) + 'px';
        }

    },
    drawRadarChart: () => {
        const ctx3 = document.getElementById("radarChart").getContext("2d");

        const radarChart = new Chart(ctx3, {
            type: 'radar',
            data: {
                labels: ['Picth', 'Roll', 'Yaw'],
                datasets: [{
                    label: 'Pitch Roll Yaw angles from Drone',
                    backgroundColor: "rgba(0,0,200,0.2)",
                    data: [0, 0, 51]
                }]
            },
            options: {
                responsive: true,
                elements: {
                    line: {
                        borderWidth: 4
                    }
                },
                legend: {
                    display: false //This will do the task
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: -180,
                        suggestedMax: 180
                    }
                }
            },

        });

        // save the distance Chart in attribute chart
        telloChart.registeredCharts.push(radarChart);
    }
};

module.exports = telloChart;