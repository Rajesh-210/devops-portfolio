// Dashboard Charts Initialization
document.addEventListener('DOMContentLoaded', () => {
    initDashboardCharts();
    initParticleBackground();
    initTimeRangeHandler();
});

const CHART_COLORS = {
    primary: '#00f7ff',
    secondary: '#00d4ff',
    success: '#238636',
    warning: '#d29922',
    danger: '#f85149',
    muted: '#30363d',
    text: '#8b949e',
    bg: '#161b22',
    grid: '#30363d'
};

const COMMON_OPTIONS = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: { color: CHART_COLORS.text, font: { size: 11 } }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: { color: CHART_COLORS.grid },
            ticks: { color: CHART_COLORS.text, font: { size: 10 } }
        },
        x: {
            grid: { display: false },
            ticks: { color: CHART_COLORS.text, font: { size: 10 } }
        }
    },
    animation: { duration: 1000, easing: 'easeOutQuart' }
};

function initDashboardCharts() {
    // Deployment Pipeline Performance Chart (Wide)
    const ctxDeploy = document.getElementById('deployPerfChart')?.getContext('2d');
    if (ctxDeploy) {
        window.deployChart = new Chart(ctxDeploy, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
                datasets: [
                    {
                        label: 'Avg Duration (min)',
                        data: [28, 22, 15, 12, 8, 6, 5, 5],
                        borderColor: CHART_COLORS.primary,
                        backgroundColor: 'rgba(0, 247, 255, 0.1)',
                        fill: true,
                        tension: 0.4,
                        yAxisID: 'y',
                        pointRadius: 4
                    },
                    {
                        label: 'Deployments/Week',
                        data: [3, 5, 8, 12, 15, 18, 20, 22],
                        borderColor: CHART_COLORS.secondary,
                        backgroundColor: 'rgba(0, 212, 255, 0.1)',
                        fill: false,
                        tension: 0.4,
                        yAxisID: 'y1',
                        pointRadius: 4,
                        borderDash: [5, 5]
                    },
                    {
                        label: 'Success Rate %',
                        data: [85, 90, 92, 95, 97, 98, 99, 100],
                        borderColor: CHART_COLORS.success,
                        backgroundColor: 'rgba(35, 134, 54, 0.1)',
                        fill: false,
                        tension: 0.4,
                        yAxisID: 'y2',
                        pointRadius: 4
                    }
                ]
            },
            options: {
                ...COMMON_OPTIONS,
                interaction: { mode: 'index', intersect: false },
                scales: {
                    y: { type: 'linear', position: 'left', title: { display: true, text: 'Duration (min)', color: CHART_COLORS.text }, grid: { color: CHART_COLORS.grid }, ticks: { color: CHART_COLORS.text } },
                    y1: { type: 'linear', position: 'right', title: { display: true, text: 'Frequency', color: CHART_COLORS.text }, grid: { drawOnChartArea: false }, ticks: { color: CHART_COLORS.text } },
                    y2: { type: 'linear', position: 'right', offset: true, title: { display: true, text: 'Success %', color: CHART_COLORS.text }, grid: { drawOnChartArea: false }, ticks: { color: CHART_COLORS.text, min: 80, max: 100 } },
                    x: { grid: { color: CHART_COLORS.grid }, ticks: { color: CHART_COLORS.text } }
                }
            }
        });
    }

    // Environment Health (Doughnut)
    const ctxEnv = document.getElementById('envHealthChart')?.getContext('2d');
    if (ctxEnv) {
        new Chart(ctxEnv, {
            type: 'doughnut',
            data: {
                labels: ['Production', 'Staging', 'Development', 'Test'],
                datasets: [{
                    data: [99.9, 99.5, 98.0, 95.0],
                    backgroundColor: ['#00f7ff', '#00d4ff', '#5c4ee5', '#f08a3d'],
                    borderColor: CHART_COLORS.bg,
                    borderWidth: 3,
                    hoverOffset: 8
                }]
            },
            options: {
                ...COMMON_OPTIONS,
                cutout: '65%',
                plugins: {
                    legend: { position: 'bottom', labels: { color: CHART_COLORS.text, padding: 15, font: { size: 11 } } },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => `${ctx.label}: ${ctx.raw}% uptime`
                        }
                    }
                }
            }
        });
    }

    // Infrastructure Provisioning Trend
    const ctxInfra = document.getElementById('infraTrendChart')?.getContext('2d');
    if (ctxInfra) {
        new Chart(ctxInfra, {
            type: 'bar',
            data: {
                labels: ['Manual', 'Early Terraform', 'Modular IaC', 'GitOps + CI'],
                datasets: [{
                    label: 'Provisioning Time (min)',
                    data: [180, 60, 25, 10],
                    backgroundColor: [
                        'rgba(248, 81, 73, 0.6)',
                        'rgba(210, 153, 34, 0.6)',
                        'rgba(0, 212, 255, 0.6)',
                        'rgba(0, 247, 255, 0.8)'
                    ],
                    borderColor: [
                        CHART_COLORS.danger,
                        CHART_COLORS.warning,
                        CHART_COLORS.secondary,
                        CHART_COLORS.primary
                    ],
                    borderWidth: 2,
                    borderRadius: 8
                }]
            },
            options: {
                ...COMMON_OPTIONS,
                indexAxis: 'y',
                plugins: { legend: { display: false } }
            }
        });
    }

    // Cost Optimization
    const ctxCost = document.getElementById('costChart')?.getContext('2d');
    if (ctxCost) {
        new Chart(ctxCost, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Before Optimization',
                        data: [3.8, 3.9, 4.1, 4.0, 4.2, 4.3, 4.1, 4.0, 3.9, 3.8, 3.7, 3.6],
                        borderColor: CHART_COLORS.danger,
                        backgroundColor: 'rgba(248, 81, 73, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 3
                    },
                    {
                        label: 'After Optimization',
                        data: [3.6, 3.4, 3.2, 3.0, 2.9, 2.7, 2.5, 2.4, 2.3, 2.2, 2.3, 2.3],
                        borderColor: CHART_COLORS.success,
                        backgroundColor: 'rgba(35, 134, 54, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 3
                    }
                ]
            },
            options: {
                ...COMMON_OPTIONS,
                scales: {
                    ...COMMON_OPTIONS.scales,
                    y: { ...COMMON_OPTIONS.scales.y, title: { display: true, text: 'Monthly Spend ($K)', color: CHART_COLORS.text } }
                }
            }
        });
    }

    // Incident Response
    const ctxIncident = document.getElementById('incidentChart')?.getContext('2d');
    if (ctxIncident) {
        new Chart(ctxIncident, {
            type: 'bar',
            data: {
                labels: ['Detection', 'Triage', 'Resolution', 'Postmortem'],
                datasets: [
                    {
                        label: 'Before (hours)',
                        data: [4, 2, 8, 24],
                        backgroundColor: 'rgba(248, 81, 73, 0.6)',
                        borderColor: CHART_COLORS.danger,
                        borderWidth: 2,
                        borderRadius: 6
                    },
                    {
                        label: 'After (hours)',
                        data: [0.25, 0.5, 1, 4],
                        backgroundColor: 'rgba(0, 247, 255, 0.8)',
                        borderColor: CHART_COLORS.primary,
                        borderWidth: 2,
                        borderRadius: 6
                    }
                ]
            },
            options: {
                ...COMMON_OPTIONS,
                scales: {
                    ...COMMON_OPTIONS.scales,
                    y: { ...COMMON_OPTIONS.scales.y, title: { display: true, text: 'Time (hours)', color: CHART_COLORS.text } }
                }
            }
        });
    }

    // Cluster Resource Utilization (Area Chart - Wide)
    const ctxCluster = document.getElementById('clusterUtilChart')?.getContext('2d');
    if (ctxCluster) {
        new Chart(ctxCluster, {
            type: 'line',
            data: {
                labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
                datasets: [
                    {
                        label: 'CPU %',
                        data: [35, 28, 25, 45, 52, 48, 55, 40, 38],
                        borderColor: CHART_COLORS.primary,
                        backgroundColor: 'rgba(0, 247, 255, 0.2)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 3
                    },
                    {
                        label: 'Memory %',
                        data: [55, 52, 50, 60, 65, 62, 68, 58, 55],
                        borderColor: CHART_COLORS.warning,
                        backgroundColor: 'rgba(210, 153, 34, 0.2)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 3
                    },
                    {
                        label: 'Network I/O (MB/s)',
                        data: [12, 8, 5, 25, 40, 35, 45, 20, 15],
                        borderColor: CHART_COLORS.secondary,
                        backgroundColor: 'rgba(0, 212, 255, 0.15)',
                        fill: false,
                        tension: 0.4,
                        pointRadius: 3,
                        borderDash: [5, 5],
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                ...COMMON_OPTIONS,
                interaction: { mode: 'index', intersect: false },
                scales: {
                    y: { type: 'linear', position: 'left', title: { display: true, text: 'Utilization %', color: CHART_COLORS.text }, grid: { color: CHART_COLORS.grid }, ticks: { color: CHART_COLORS.text, max: 100 } },
                    y1: { type: 'linear', position: 'right', title: { display: true, text: 'Network (MB/s)', color: CHART_COLORS.text }, grid: { drawOnChartArea: false }, ticks: { color: CHART_COLORS.text } },
                    x: { grid: { color: CHART_COLORS.grid }, ticks: { color: CHART_COLORS.text } }
                }
            }
        });
    }

    // GitHub Activity
    const ctxGithub = document.getElementById('githubChart')?.getContext('2d');
    if (ctxGithub) {
        new Chart(ctxGithub, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Commits',
                        data: [8, 12, 15, 10, 14, 3, 2],
                        backgroundColor: 'rgba(0, 247, 255, 0.8)',
                        borderColor: CHART_COLORS.primary,
                        borderWidth: 1,
                        borderRadius: 4
                    },
                    {
                        label: 'PRs Merged',
                        data: [2, 3, 4, 2, 3, 1, 0],
                        backgroundColor: 'rgba(35, 134, 54, 0.8)',
                        borderColor: CHART_COLORS.success,
                        borderWidth: 1,
                        borderRadius: 4
                    },
                    {
                        label: 'Issues Closed',
                        data: [1, 2, 3, 1, 2, 0, 0],
                        backgroundColor: 'rgba(210, 153, 34, 0.8)',
                        borderColor: CHART_COLORS.warning,
                        borderWidth: 1,
                        borderRadius: 4
                    }
                ]
            },
            options: {
                ...COMMON_OPTIONS,
                scales: {
                    ...COMMON_OPTIONS.scales,
                    x: { ...COMMON_OPTIONS.scales.x, stacked: true },
                    y: { ...COMMON_OPTIONS.scales.y, stacked: true, title: { display: true, text: 'Activity Count', color: CHART_COLORS.text } }
                }
            }
        });
    }
}

function initTimeRangeHandler() {
    const select = document.getElementById('timeRange');
    if (select) {
        select.addEventListener('change', (e) => {
            console.log('Time range changed to:', e.target.value);
            // In a real app, this would fetch new data
            // For demo, just show a notification
            showToast(`Loading data for ${e.target.options[e.target.selectedIndex].text}...`);
        });
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--bg-card);
        border: 1px solid var(--border-color);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: var(--text-main);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Particle Background (same as landing page)
function initParticleBackground() {
    const canvas = document.getElementById('bg-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.radius = Math.random() * 1.5;
            this.color = 'rgba(0, 247, 255, 0.2)';
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    for (let i = 0; i < 60; i++) {
        particles.push(new Particle());
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    animate();
}

// Add slide animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);