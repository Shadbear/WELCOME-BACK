const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let time = 0;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function drawBackground() {
    time += 0.01;
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.max(width, height) * 0.7;

    let grad = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, maxRadius);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.2)');
    grad.addColorStop(0.3, 'rgba(5, 0, 15, 0.95)');
    grad.addColorStop(0.6, '#7b00ff');
    grad.addColorStop(0.85, '#0026ff');
    grad.addColorStop(1, '#2d004d');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        let angle = (i * Math.PI / 3) + time * 0.5;
        let rx = centerX + Math.cos(angle) * (width * 0.35);
        let ry = centerY + Math.sin(angle) * (height * 0.35);
        let blobGrad = ctx.createRadialGradient(rx, ry, 10, rx, ry, 300 + Math.sin(time + i) * 50);

        if (i % 2 === 0) {
            blobGrad.addColorStop(0, 'rgba(180, 0, 255, 0.35)');
            blobGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
            blobGrad.addColorStop(0, 'rgba(0, 100, 255, 0.35)');
            blobGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }

        ctx.fillStyle = blobGrad;
        ctx.arc(rx, ry, 350, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();

    requestAnimationFrame(drawBackground);
}
drawBackground();