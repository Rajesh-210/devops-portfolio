// Dashboard telemetry charts with Violet/Cyan/Pink theme
const VIOLET = '#bc13fe';
const CYAN = '#00d4ff';
const PINK = '#ff006e';
const EMERALD = '#10b981';

const CHART_CONFIG = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: 'rgba(3, 0, 20, 0.9)',
            borderColor: 'rgba(188, 19, 254, 0.3)',
            borderWidth: 1,
            titleFont: { family: 'Space Grotesk' },
            bodyFont: { family: 'Space Grotesk' }
        }
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: { color: '#64748b', font: { family: 'Space Grotesk', size: 10 } }
        },
        y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#64748b', font: { family: 'Space Grotesk', size: 10 } }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Deploy duration
    const ctxDeploy = document.getElementById('deployChart')?.getContext('2d');
    if (ctxDeploy) {
        new Chart(ctxDeploy, {
            type: 'line',
            data: {
                labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
                datasets: [{
                    data: [30, 24, 18, 12, 8, 6, 5, 5],
                    borderColor: CYAN,
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: CYAN,
                    pointRadius: 4
                }]
            },
            options: CHART_CONFIG
        });
    }

    // 2. Env Doughnut
    const ctxEnv = document.getElementById('envChart')?.getContext('2d');
    if (ctxEnv) {
        new Chart(ctxEnv, {
            type: 'doughnut',
            data: {
                labels: ['Production', 'Staging', 'Dev'],
                datasets: [{
                    data: [99.9, 99.5, 98.2],
                    backgroundColor: [CYAN, VIOLET, PINK],
                    borderColor: '#030014',
                    borderWidth: 3
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    // 3. Infra Provisioning Bar
    const ctxInfra = document.getElementById('infraChart')?.getContext('2d');
    if (ctxInfra) {
        new Chart(ctxInfra, {
            type: 'bar',
            data: {
                labels: ['Manual', 'Basic IaC', 'Modular', 'GitOps'],
                datasets: [{
                    data: [180, 60, 25, 10],
                    backgroundColor: [
                        'rgba(255, 0, 110, 0.6)',
                        'rgba(188, 19, 254, 0.6)',
                        'rgba(0, 212, 255, 0.6)',
                        'rgba(16, 185, 129, 0.8)'
                    ],
                    borderRadius: 6
                }]
            },
            options: CHART_CONFIG
        });
    }

    // 4. Cost Trend Line
    const ctxCost = document.getElementById('costChart')?.getContext('2d');
    if (ctxCost) {
        new Chart(ctxCost, {
            type: 'line',
            data: {
                labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
                datasets: [
                    {
                        label: 'Unoptimized',
                        data: [4.2, 4.0, 3.8, 3.7, 3.8, 3.6],
                        borderColor: PINK,
                        borderDash: [4, 4],
                        fill: false
                    },
                    {
                        label: 'Optimized',
                        data: [3.8, 3.2, 2.7, 2.4, 2.3, 2.3],
                        borderColor: EMERALD,
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: CHART_CONFIG
        });
    }

    // 5. Incident MTTR Bar
    const ctxIncident = document.getElementById('incidentChart')?.getContext('2d');
    if (ctxIncident) {
        new Chart(ctxIncident, {
            type: 'bar',
            data: {
                labels: ['Detect', 'Triage', 'Resolve', 'Postmortem'],
                datasets: [
                    {
                        label: 'Before',
                        data: [4, 2, 8, 24],
                        backgroundColor: 'rgba(255, 0, 110, 0.5)',
                        borderRadius: 4
                    },
                    {
                        label: 'After',
                        data: [0.25, 0.5, 1, 4],
                        backgroundColor: 'rgba(0, 212, 255, 0.8)',
                        borderRadius: 4
                    }
                ]
            },
            options: CHART_CONFIG
        });
    }

    // 6. Cluster Utilization Area
    const ctxUtil = document.getElementById('utilChart')?.getContext('2d');
    if (ctxUtil) {
        new Chart(ctxUtil, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                datasets: [
                    {
                        label: 'CPU %',
                        data: [28, 32, 48, 42, 52, 40],
                        borderColor: CYAN,
                        backgroundColor: 'rgba(0, 212, 255, 0.2)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Memory %',
                        data: [50, 52, 58, 62, 60, 54],
                        borderColor: VIOLET,
                        backgroundColor: 'rgba(188, 19, 254, 0.15)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: CHART_CONFIG
        });
    }

    // Live counter simulation
    const deployEl = document.getElementById('deployTime');
    if (deployEl) {
        const times = ['5.0 min', '4.8 min', '4.5 min', '4.2 min', '5.0 min'];
        let idx = 0;
        setInterval(() => {
            idx = (idx + 1) % times.length;
            deployEl.textContent = times[idx];
        }, 1500);
    }
});