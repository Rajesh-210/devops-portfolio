const TYPING_TEXTS = [
    "Building scalable EKS clusters...",
    "Automating with Terraform & Ansible...",
    "Implementing GitOps with ArgoCD...",
    "Monitoring with Prometheus & Grafana...",
    "Reducing deployment time by 83%...",
    "Ensuring zero-downtime releases..."
];

let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;
let deletingSpeed = 100;

const typingElement = document.getElementById('typing');

function type() {
    const currentText = TYPING_TEXTS[typingIndex];
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingIndex = (typingIndex + 1) % TYPING_TEXTS.length;
        typingSpeed = 150;
    } else if (isDeleting) {
        typingSpeed = 100;
    } else {
        typingSpeed = 150;
    }

    setTimeout(type, typingSpeed);
}

// Chart.js implementation for landing page previews
function initLandingCharts() {
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: '#30363d' },
                ticks: { color: '#8b949e' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#8b949e' }
            }
        }
    };

    // Deployment Time Chart (Line)
    const ctxDeploy = document.getElementById('deploymentChart')?.getContext('2d');
    if (ctxDeploy) {
        new Chart(ctxDeploy, {
            type: 'line',
            data: {
                labels: ['Baseline', 'CI/CD Opt', 'GitOps'],
                datasets: [{
                    label: 'Deployment Time (min)',
                    data: [30, 12, 5],
                    borderColor: '#00f7ff',
                    backgroundColor: 'rgba(0, 247, 255, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#00f7ff'
                }]
            },
            options: commonOptions
        });
    }

    // Infra Provisioning Chart (Bar)
    const ctxInfra = document.getElementById('infraChart')?.getContext('2d');
    if (ctxInfra) {
        new Chart(ctxInfra, {
                type: 'bar',
                data: {
                    labels: ['Manual', 'IaC Initial', 'Modular IaC'],
                    datasets: [{
                        label: 'Setup Time (min)',
                        data: [180, 45, 10],
                        backgroundColor: '#00d4ff',
                        borderRadius: 8
                    }]
                },
                options: commonOptions
            });
    }

    // Uptime/Reliability Chart (Doughnut)
    const ctxUptime = document.getElementById('uptimeChart')?.getContext('2d');
    if (ctxUptime) {
        new Chart(ctxUptime, {
            type: 'doughnut',
            data: {
                labels: ['Uptime', 'Downtime'],
                datasets: [{
                    data: [99.9, 0.1],
                    backgroundColor: ['#00f7ff', '#30363d'],
                    borderColor: '#0a0b10',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: { color: '#8b949e' }
                    }
                }
            }
        });
    }
}

// Particle Background
function initParticles() {
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
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2;
            this.color = 'rgba(0, 247, 255, 0.3)';
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, this.color);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, 0, 0);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    // Initialize particles
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }

    // Adjust canvas size on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    animate();
}

document.addEventListener('DOMContentLoaded', () => {
    type();
    initLandingCharts();
    initParticles();
});
