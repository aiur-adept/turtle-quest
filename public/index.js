const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class BouncingPoint {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.initialSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        
        if (this.initialSpeed < 2) {
            const scale = 2 / this.initialSpeed;
            this.vx *= scale;
            this.vy *= scale;
            this.initialSpeed = 2;
        }
        
        this.maxSpeed = this.initialSpeed * 1.2;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x <= 0 || this.x >= canvas.width) {
            this.vx = -this.vx * 0.67;
            this.x = Math.max(0, Math.min(canvas.width, this.x));
        }
        if (this.y <= 0 || this.y >= canvas.height) {
            this.vy = -this.vy * 0.67;
            this.y = Math.max(0, Math.min(canvas.height, this.y));
        }
    }
    
    applyGravity(otherPoints) {
        const G = 24.0;
        const repulsionRadius = 80;
        const repulsionStrength = 15.0;
        const curlStrength = 0.02;
        
        otherPoints.forEach(other => {
            if (other !== this) {
                const dx = other.x - this.x;
                const dy = other.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > 0) {
                    if (distance < repulsionRadius) {
                        const repulsionForce = repulsionStrength / (distance * distance);
                        this.vx -= (dx / distance) * repulsionForce;
                        this.vy -= (dy / distance) * repulsionForce;
                    } else {
                        const force = G / (distance * distance);
                        this.vx += (dx / distance) * force;
                        this.vy += (dy / distance) * force;
                    }
                    
                    const curlForce = curlStrength / (distance * distance);
                    this.vx += (-dy / distance) * curlForce;
                    this.vy += (dx / distance) * curlForce;
                }
            }
        });
        
        const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (currentSpeed > this.maxSpeed) {
            const scale = this.maxSpeed / currentSpeed;
            this.vx *= scale;
            this.vy *= scale;
        } else if (currentSpeed < this.initialSpeed) {
            const scale = this.initialSpeed / currentSpeed;
            this.vx *= scale;
            this.vy *= scale;
        }
        
        if (currentSpeed > 0.1) {
            const curlForce = curlStrength * 0.1;
            this.vx += (-this.vy / currentSpeed) * curlForce;
            this.vy += (this.vx / currentSpeed) * curlForce;
        }
    }
}

const N_POINTS = 3;
const points = Array.from({length: N_POINTS}, () => new BouncingPoint());

function getSpectralColor(t) {
    if (t <= 0.33) {
        const s = t / 0.33;
        const r = Math.floor(128 + s * 127);
        const g = Math.floor(0 + s * 100);
        const b = Math.floor(255 - s * 100);
        return `rgb(${r}, ${g}, ${b})`;
    } else if (t <= 0.66) {
        const s = (t - 0.33) / 0.33;
        const r = Math.floor(255 - s * 50);
        const g = Math.floor(100 + s * 155);
        const b = Math.floor(155 - s * 155);
        return `rgb(${r}, ${g}, ${b})`;
    } else {
        const s = (t - 0.66) / 0.34;
        const r = Math.floor(205 + s * 50);
        const g = Math.floor(255 - s * 50);
        const b = Math.floor(0 + s * 255);
        return `rgb(${r}, ${g}, ${b})`;
    }
}

function drawVectorField() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const spacing = 15;
    const lineLength = 12;
    
    for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
            let totalDx = 0;
            let totalDy = 0;
            
            points.forEach(point => {
                const dx = point.x - x;
                const dy = point.y - y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > 0) {
                    const force = 1000 / (distance * distance);
                    totalDx += (dx / distance) * force;
                    totalDy += (dy / distance) * force;
                }
            });
            
                        const magnitude = Math.sqrt(totalDx * totalDx + totalDy * totalDy);
            if (magnitude > 0) {
                const normalizedDx = (totalDx / magnitude) * lineLength;
                const normalizedDy = (totalDy / magnitude) * lineLength;
                
                let minDistance = Infinity;
                points.forEach(point => {
                    const dx = point.x - x;
                    const dy = point.y - y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    minDistance = Math.min(minDistance, distance);
                });
                
                const maxDist = 200;
                const t = Math.min(minDistance / maxDist, 1);
                const color = getSpectralColor(1 - t);
                
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + normalizedDx, y + normalizedDy);
                ctx.strokeStyle = color;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
    

    
    points.forEach(point => {
        point.applyGravity(points);
        point.update();
    });
    requestAnimationFrame(drawVectorField);
}

drawVectorField();

