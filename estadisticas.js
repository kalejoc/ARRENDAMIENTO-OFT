
const ctxTransferencia = document.getElementById('chartTransferencia').getContext('2d');
const chart1 = new Chart(ctxTransferencia, {
    type: 'line',
    data: {
        labels: ['7', '8', '9', '10', '11', '12', '13', '14'],
        datasets: [{
            label: 'Transferencia de datos',
            data: [20, 30, 25, 40, 38, 50, 45, 81.83],
            borderColor: '#7a5cf2',
            fill: false,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        }
    }
});

const ctxVisitas = document.getElementById('chartVisitas').getContext('2d');
const chart2 = new Chart(ctxVisitas, {
    type: 'line',
    data: {
        labels: ['7', '8', '9', '10', '11', '12', '13', '14'],
        datasets: [{
            label: 'Visitas Únicas',
            data: [100, 120, 110, 180, 220, 150, 200, 272],
            borderColor: '#7a5cf2',
            fill: false,
            tension: 0.3
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false }
        }
    }
});
