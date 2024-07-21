document.addEventListener('mousemove', e => {
    Object.assign(document.documentElement,{
     style: `
     --move-x: ${(e.clientX - window.innerWidth / 2) * -.005}deg;
     --move-y: ${(e.clientY - window.innerHeight / 2) * -.01}deg;
     `
    })
})
const canvas = document.getElementById('snowCanvas'); // Changed ID for clarity
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snowflakes = []; // Changed variable name

class Snowflake { // Renamed class
    constructor(x, y, speed, radius) { // Changed properties
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.radius = radius;
        this.opacity = Math.random(); // Added opacity for a fading effect
    }

    fall() {
        this.y += this.speed;
        this.x += Math.random() * 2 - 1; // Slight horizontal movement

        if (this.y > canvas.height) {
            this.y = 0 - this.radius;
            this.x = Math.random() * canvas.width;
            this.opacity = Math.random(); // Reset opacity
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`; // White with opacity
        ctx.fill();
    }
}

function createSnow() { // Renamed function
    for (let i = 0; i < 5000; i++) { // Fewer snowflakes for better visual
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speed = Math.random() * 15 + 1; // Slower speed
        const radius = Math.random() * 2 + 2; // Smaller radius
        snowflakes.push(new Snowflake(x, y, speed, radius)); 
    }
}

function updateSnow() { // Renamed function
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const flake of snowflakes) {
        flake.fall();
        flake.draw();
    }

    requestAnimationFrame(updateSnow);
}

createSnow();
updateSnow();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})