// ============================================
// RAJESH CHILUKURI - DEVOPS PORTFOLIO
// Advanced Interactive Script
// ============================================

// ---- TOOL DATA WITH SKILLICONS ----
const toolCategories = {
    cloud: [
        { name: 'AWS', icon: 'aws' },
        { name: 'EC2', icon: 'amazonec2' },
        { name: 'S3', icon: 'amazons3' },
        { name: 'VPC', icon: 'amazonvpc' },
        { name: 'EKS', icon: 'amazonaws' }, // using aws for EKS
        { name: 'Route53', icon: 'amazonroute53' },
        { name: 'CloudWatch', icon: 'amazoncloudwatch' },
        { name: 'IAM', icon: 'amazoniam' },
    ],
    containers: [
        { name: 'Kubernetes', icon: 'kubernetes' },
        { name: 'Docker', icon: 'docker' },
        { name: 'EKS', icon: 'amazonaws' },
        { name: 'Helm', icon: 'helm' },
        { name: 'Containerd', icon: 'containerd' },
        { name: 'ECR', icon: 'amazonec2' },
    ],
    cicd: [
        { name: 'Jenkins', icon: 'jenkins' },
        { name: 'GitHub Actions', icon: 'githubactions' },
        { name: 'ArgoCD', icon: 'argo' },
        { name: 'GitHub', icon: 'github' },
        { name: 'GitLab CI', icon: 'gitlab' },
    ],
    iac: [
        { name: 'Terraform', icon: 'terraform' },
        { name: 'Ansible', icon: 'ansible' },
        { name: 'Packer', icon: 'packer' },
    ],
    observability: [
        { name: 'Prometheus', icon: 'prometheus' },
        { name: 'Grafana', icon: 'grafana' },
        { name: 'Alertmanager', icon: 'prometheus' },
        { name: 'Loki', icon: 'grafana' },
        { name: 'Tempo', icon: 'grafana' },
    ],
    scripting: [
        { name: 'Bash', icon: 'bash' },
        { name: 'Linux', icon: 'linux' },
        { name: 'Python', icon: 'python' },
        { name: 'Go', icon: 'go' },
        { name: 'Nginx', icon: 'nginx' },
    ]
};

// ---- SKILLICONS URL BUILDER ----
function getSkillIconUrl(name) {
    // skillicons.dev uses lowercase names
    const normalized = name.toLowerCase().replace(/\s+/g, '-');
    return `https://skillicons.dev/icons?i=${normalized}`;
}

// ---- DOM READY ----
document.addEventListener('DOMContentLoaded', () => {
    initToolGrids();
    initMetricCounters();
    initParticleSystem();
    initScrollReveal();
    initParallaxOrbs();
    initHoverEffects();
});

// ---- TOOL GRIDS ----
function initToolGrids() {
    Object.entries(toolCategories).forEach(([category, tools]) => {
        const container = document.getElementById(`${category}-tools`);
        if (!container) return;

        tools.forEach((tool, index) => {
            const card = document.createElement('div');
            card.className = 'tool-card group';
            card.style.animationDelay = `${index * 50}ms`;
            card.innerHTML = `
                <img
                    src="${getSkillIconUrl(tool.icon)}"
                    alt="${tool.name}"
                    class="skill-icon mx-auto mb-3"
                    style="color: var(--icon-color, inherit);"
                    loading="lazy"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                >
                <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-[var(--accent-1)]/20 to-[var(--accent-2)]/20 flex items-center justify-center text-[var(--accent-1)] font-bold text-xl hidden" aria-hidden="true">
                    ${tool.name.charAt(0)}
                </div>
                <span class="text-sm font-semibold text-white block">${tool.name}</span>
            `;
            container.appendChild(card);
        });
    });
}

// ---- METRIC COUNTERS ----
function initMetricCounters() {
    const counters = document.querySelectorAll('[data-target]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const duration = 2000;
    const startTime = performance.now();
    const isDecimal = target % 1 !== 0;

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = target * eased;

        if (isDecimal) {
            el.textContent = current.toFixed(1);
        } else {
            el.textContent = Math.floor(current).toLocaleString();
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
        }
    }

    requestAnimationFrame(update);
}

// ---- PARTICLE SYSTEM ----
function initParticleSystem() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let geometry = [];
    let width = 0;
    let height = 0;
    let mouseX = -1000;
    let mouseY = -1000;
    let animationId = null;

    const COLORS = [
        'rgba(188, 19, 254, 0.6)',   // Electric Purple
        'rgba(0, 212, 255, 0.5)',    // Cyan
        'rgba(255, 0, 110, 0.4)',    // Hot Pink
        'rgba(160, 132, 250, 0.4)',  // Violet
        'rgba(240, 171, 252, 0.3)',  // Magenta
    ];

    const SHAPES = ['circle', 'triangle', 'square', 'ring', 'line'];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    // Track mouse for interactive particles
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Particle Class
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2.5 + 0.5;
            this.baseSize = this.size;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
            this.opacity = Math.random() * 0.5 + 0.1;
            this.shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.01;
            this.pulsePhase = Math.random() * Math.PI * 2;
            this.pulseSpeed = 0.005 + Math.random() * 0.01;
        }

        update() {
            // Basic movement
            this.x += this.speedX;
            this.y += this.speedY;

            // Mouse attraction (subtle)
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 200 && dist > 0) {
                const force = (200 - dist) / 200 * 0.02;
                this.x -= dx * force;
                this.y -= dy * force;
            }

            // Rotation
            this.rotation += this.rotationSpeed;

            // Pulsing
            this.pulsePhase += this.pulseSpeed;
            this.size = this.baseSize * (1 + Math.sin(this.pulsePhase) * 0.3);

            // Boundary check
            if (this.x < -50 || this.x > width + 50 ||
                this.y < -50 || this.y > height + 50) {
                this.reset();
                // Reposition on opposite side
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;

            switch (this.shape) {
                case 'circle':
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                    ctx.fillStyle = this.color;
                    ctx.fill();
                    break;
                case 'triangle':
                    const triSize = this.size * 2;
                    ctx.beginPath();
                    ctx.moveTo(0, -triSize);
                    ctx.lineTo(triSize * 0.866, triSize * 0.5);
                    ctx.lineTo(-triSize * 0.866, triSize * 0.5);
                    ctx.closePath();
                    ctx.fillStyle = this.color;
                    ctx.fill();
                    break;
                case 'square':
                    const sqSize = this.size * 1.5;
                    ctx.fillStyle = this.color;
                    ctx.fillRect(-sqSize, -sqSize, sqSize * 2, sqSize * 2);
                    break;
                case 'ring':
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size * 2, 0, Math.PI * 2);
                    ctx.strokeStyle = this.color;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    break;
                case 'line':
                    const lineLen = this.size * 4;
                    ctx.beginPath();
                    ctx.moveTo(-lineLen, 0);
                    ctx.lineTo(lineLen, 0);
                    ctx.strokeStyle = this.color;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    break;
            }

            ctx.restore();
        }
    }

    // Geometry Class (larger floating shapes)
    class GeoShape {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 40 + 20;
            this.speedX = (Math.random() - 0.5) * 0.15;
            this.speedY = (Math.random() - 0.5) * 0.15;
            this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
            this.opacity = Math.random() * 0.08 + 0.02;
            this.shape = ['triangle', 'square', 'circle', 'ring'][Math.floor(Math.random() * 4)];
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.003;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;

            if (this.x < -this.size || this.x > width + this.size ||
                this.y < -this.size || this.y > height + this.size) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;

            const s = this.size;
            ctx.strokeStyle = this.color;
            ctx.fillStyle = this.color;
            ctx.lineWidth = 1.5;

            switch (this.shape) {
                case 'triangle':
                    ctx.beginPath();
                    ctx.moveTo(0, -s);
                    ctx.lineTo(s * 0.866, s * 0.5);
                    ctx.lineTo(-s * 0.866, s * 0.5);
                    ctx.closePath();
                    ctx.stroke();
                    break;
                case 'square':
                    ctx.beginPath();
                    ctx.rect(-s, -s, s * 2, s * 2);
                    ctx.stroke();
                    break;
                case 'circle':
                    ctx.beginPath();
                    ctx.arc(0, 0, s, 0, Math.PI * 2);
                    ctx.stroke();
                    break;
                case 'ring':
                    ctx.beginPath();
                    ctx.arc(0, 0, s, 0, Math.PI * 2);
                    ctx.stroke();
                    // Inner ring
                    ctx.beginPath();
                    ctx.arc(0, 0, s * 0.6, 0, Math.PI * 2);
                    ctx.stroke();
                    break;
            }

            ctx.restore();
        }
    }

    // Initialize
    const PARTICLE_COUNT = Math.min(120, Math.floor((width * height) / 15000));
    const GEO_COUNT = 15;

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
    for (let i = 0; i < GEO_COUNT; i++) geometry.push(new GeoShape());

    // Connections between nearby particles
    function drawConnections() {
        const maxDist = 120;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    const opacity = (1 - dist / maxDist) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(188, 19, 254, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    // Animation Loop
    function animate() {
        // Clear with subtle trail effect
        ctx.fillStyle = 'rgba(3, 0, 20, 0.15)';
        ctx.fillRect(0, 0, width, height);

        // Draw connections first (behind particles)
        drawConnections();

        // Update & draw particles
        particles.forEach(p => { p.update(); p.draw(); });

        // Update & draw geometry
        geometry.forEach(g => { g.update(); g.draw(); });

        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Cleanup on page hide
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// ---- SCROLL REVEAL ----
function initScrollReveal() {
    const reveals = document.querySelectorAll('.stagger-in > *, .reveal-text');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

// ---- PARALLAX ORBS ----
function initParallaxOrbs() {
    const orbs = document.querySelectorAll('.orb');
    if (orbs.length === 0) return;

    let ticking = false;
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        if (!ticking) {
            requestAnimationFrame(updateOrbs);
            ticking = true;
        }
    });

    function updateOrbs() {
        orbs.forEach((orb, i) => {
            const factor = (i + 1) * 15;
            const x = mouseX * factor;
            const y = mouseY * factor;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
        ticking = false;
    }
}

// ---- HOVER EFFECTS ----
function initHoverEffects() {
    // Magnetic buttons
    const magneticElements = document.querySelectorAll('.glow-border, .card-interactive, .tool-card');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Subtle magnetic effect
            el.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });

    // Nav link underline animation
    const navLinks = document.querySelectorAll('nav a:not(.glass):not(.bg-gradient-to-r)');
    navLinks.forEach(link => {
        link.style.position = 'relative';
        link.style.overflow = 'hidden';

        const underline = document.createElement('span');
        underline.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, #bc13fe, #00d4ff);
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        `;
        link.appendChild(underline);

        link.addEventListener('mouseenter', () => {
            underline.style.transformOrigin = 'left';
            underline.style.transform = 'scaleX(1)';
        });

        link.addEventListener('mouseleave', () => {
            underline.style.transformOrigin = 'right';
            underline.style.transform = 'scaleX(0)';
        });
    });
}

// ---- PERFORMANCE MONITORING ----
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perf = performance.getEntriesByType('navigation')[0];
            if (perf) {
                console.log(`%c🚀 Portfolio Loaded in ${perf.loadEventEnd.toFixed(0)}ms`, 'color: #bc13fe; font-size: 14px; font-weight: bold;');
            }
        }, 0);
    });
}

// ---- CONSOLE EASTER EGG ----
console.log('%c👋 Hello Fellow Engineer!', 'color: #bc13fe; font-size: 24px; font-weight: bold;');
console.log('%cWelcome to Rajesh Chilukuri\'s DevOps Portfolio', 'color: #00d4ff; font-size: 14px;');
console.log('%cStack: AWS • Kubernetes • Terraform • ArgoCD • Prometheus', 'color: #a855f7; font-size: 12px;');
console.log('%cOpen to opportunities: rajeshchilukuri210@gmail.com', 'color: #ff006e; font-size: 12px;');
console.log('%c🌟 GitHub: https://github.com/Rajesh-210', 'color: #22d3ee; font-size: 12px;');