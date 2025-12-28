document.addEventListener('DOMContentLoaded', function () {
    // 1. Employee Data Simulation
    const employees = [
        { id: 'EMP-101', name: 'Ravi Kumar', zone: 'Zone A (Cold Storage)', bpm: 72, temp: 36.6, status: 'Normal' },
        { id: 'EMP-102', name: 'Anitha R', zone: 'Zone B (Sorting)', bpm: 75, temp: 36.8, status: 'Normal' },
        { id: 'EMP-103', name: 'Senthil P', zone: 'Zone A (Cold Storage)', bpm: 110, temp: 35.2, status: 'Warning' } // Simulation of stress
    ];

    // 2. Chart.js Setup (Heart Rate)
    const ctx = document.getElementById('heartRateChart').getContext('2d');
    const heartRateChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array(20).fill(''), // Empty labels for sparkline feel
            datasets: [{
                label: 'Live Heart Rate (BPM)',
                data: Array(20).fill(72), // Initial flat line
                borderColor: '#10b981', // Success Green
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 0 }, // Disable animation for real-time feel
            scales: {
                x: { display: false },
                y: {
                    min: 50,
                    max: 140,
                    grid: { color: '#f3f4f6' }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    // 3. Update Logic
    setInterval(() => {
        // Simulate random BPM
        const currentBpm = 70 + Math.floor(Math.random() * 10);
        const isEmergency = Math.random() > 0.95; // 5% chance of spike

        let displayBpm = isEmergency ? 110 + Math.floor(Math.random() * 10) : currentBpm;

        // Update Chart Data
        const data = heartRateChart.data.datasets[0].data;
        data.shift();
        data.push(displayBpm);

        // Dynamic Styling based on Threshold
        if (displayBpm > 100) {
            heartRateChart.data.datasets[0].borderColor = '#ef4444'; // Red for Alert
            heartRateChart.data.datasets[0].backgroundColor = 'rgba(239, 68, 68, 0.2)';
            document.getElementById('live-status-indicator').className = 'status-badge status-danger glow-anim';
            document.getElementById('live-status-text').textContent = 'CRITICAL ALERT';
        } else {
            heartRateChart.data.datasets[0].borderColor = '#10b981'; // Green for Normal
            heartRateChart.data.datasets[0].backgroundColor = 'rgba(16, 185, 129, 0.1)';
            document.getElementById('live-status-indicator').className = 'status-badge status-success';
            document.getElementById('live-status-text').textContent = 'Normal Monitoring';
        }

        heartRateChart.update();

        // Update Text Numbers
        document.getElementById('live-bpm').textContent = displayBpm;
        document.getElementById('live-temp').textContent = (36.5 + (Math.random() * 0.4)).toFixed(1); // Minor temp fluctuation

    }, 1000); // Update every 1 second
});
