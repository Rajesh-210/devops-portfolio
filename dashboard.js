// Dashboard Charts for Rajesh Chilukuri DevOps Portfolio

const CHART_COLORS = {
    cyan: '#06b6d4',
    blue: '#3b82f6',
    emerald: '#10b981',
    slate: '#64748b',
    glass: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.1)'
};

const BASE_OPTIONS = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            titleColor: '#fff',
            bodyColor: '#e0e0e0',
            bordercolor: 'rgba(255,255,255,0.1)',
            borderWidth: 1
        }
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: { color: '#888', font: { size: 10 } }
        },
        y: {
            grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false },
            ticks: { color: '#888', font: { size: 10 } }
        }
    }
};

// Initialize all charts
document.addEventListener('DOMContentLoaded', () => {
    initDeployChart();
    initEnvChart();
    initInfraChart();
    initCostChart();
    initIncidentChart();
    initUtilChart();
    initParticles();
    startTypingAnimation();
});

// 1. Deployment Performance Chart
function initDeployChart() {
    const ctx = document.getElementById('deployChart');
    if (ctx) new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
            datasets: [{
                label: 'Deployment (min)',
                data: [30, 25, 18, 12, 8, 6, 5, 5],
                backgroundColor: 'rgba(6, 182, 212, 0.7)',
                borderColor: '#06b6d4',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            ...BASE_OPTIONS,
            plugins: { ...BASE_OPTIONS.plugins, legend: { display: false } },
            scales: {
                ...BASE_OPTIONS.scales,
                y: { min: 0, max: 35, ticks: { stepSize: 5 }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
        }
    });
}

// 2. Environment Health Doughnut
function initEnvChart() {
    const ctx = document.getElementById('envChart');
    if (ctx) new Chart(ctx.getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Production', 'Staging', 'Dev'],
            datasets: [{
                data: [99.9, 99.5, 98.0],
                backgroundColor: [CHART_COLORS.cyan, CHART_COLORS.blue, CHART_COLORS.slate],
                borderColor: '#111111',
                borderWidth: 2
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// 3. Infrastructure Provisioning Trend
function initInfraChart() {
    const ctx = document.getElementById('infraChart');
    if (ctx) new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Manual', 'Early IaC', 'Modern IaC', 'GitOps'],
            datasets: [{
                label: 'Time (min)',
                data: [180, 60, 25, 10],
                backgroundColor: 'rgba(16, 185, 129, 0.7)',
                borderColor: CHART_COLORS.emerald,
                borderRadius: 4
            }]
        },
        options: {
            ...BASE_OPTIONS,
            scales: { y: { min: 0, max: 200, grid: { display: false } } }
        }
    });
}

// 4. Cost Optimization Line Chart
function initCostChart() {
    const ctx = document.getElementById('costChart');
    if (ctx) new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    label: 'Before',
                    data: [4.2, 4.1, 4.0, 3.9, 3.8, 3.7, 3.6, 3.7, 3.8, 3.7, 3.6, 3.5],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'After',
                    data: [3.8, 3.5, 3.2, 2.9, 2.7, 2.5, 2.4, 2.3, 2.4, 2.4, 2.3, 2.3],
                    borderColor: '#06b6d4',
                    backgroundColor: 'rgba(6, 182, 212, 0.15)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            ...BASE_OPTIONS,
            interaction: { mode: 'index', intersect: false }
        }
    });
}

// 5. Incident Response Comparison
function initIncidentChart() {
    const ctx = document.getElementById('incidentChart');
    if (ctx) new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Detection', 'Triage', 'Resolution', 'Postmortem'],
            datasets: [
                {
                    label: 'Before (hrs)',
                    data: [4, 2, 8, 24],
                    backgroundColor: 'rgba(239, 68, 68, 0.7)',
                    borderRadius: 4
                },
                {
                    label: 'After (hrs)',
                    data: [0.25, 0.5, 1, 4],
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                    borderRadius: 4
                }
            ]
        },
        options: {
            ...BASE_OPTIONS,
            scales: { y: { min: 0, max: 26, grid: { color: 'rgba(255,255,255,0.05)' } } }
        }
    });
}

// 6. Cluster Utilization Area Chart
function initUtilChart() {
    const ctx = document.getElementById('utilChart');
    if (ctx) new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
            datasets: [
                {
                    label: 'CPU %',
                    data: [25, 30, 45, 42, 38, 50, 42],
                    borderColor: CHART_COLORS.cyan,
                    backgroundColor: 'rgba(6, 182, 212, 0.15)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Memory %',
                    data: [50, 55, 60, 58, 62, 55, 55],
                    borderColor: CHART_COLORS.blue,
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            ...BASE_OPTIONS,
            interaction: { mode: 'index', intersect: false }
        }
    });
}

// Animated background particles
function initParticles() {
    const canvas = document.getElementById('bg-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#10b981'];

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.reset();
            if (this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 80; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

// Typing animation on KPI values
function startTypingAnimation() {
    const element = document.getElementById('kpi-deploy');
    const values = ['5min', '4.5min', '4.2min', '4.0min', '3.5min', '3.0min', '2.5min', '2.0min', '1.5min', '1.0min', '5min'];
    let i = 0;
    setInterval(() => {
        i = (i + 1) % values.length;
        element.textContent = values[i];
    }, 1200);
}