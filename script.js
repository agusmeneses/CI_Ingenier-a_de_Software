const numberInput = document.getElementById('numberInput');
const generateButton = document.getElementById('generateButton');
const spinButton = document.getElementById('spinButton');
const wheelCanvas = document.getElementById('wheelCanvas');
const ctx = wheelCanvas.getContext('2d');
let numbers = [];

generateButton.addEventListener('click', generateWheel);
spinButton.addEventListener('click', spinWheel);

function generateWheel() {
    const num = parseInt(numberInput.value);
    if (num < 1 || num > 100) {
        alert('Por favor, ingrese un número del 1 al 100');
        return;
    }
    numbers = Array.from({ length: num }, (_, i) => i + 1);
    drawWheel();
    spinButton.disabled = false;
}

function drawWheel() {
    const num = numbers.length;
    const angleStep = (2 * Math.PI) / num;
    const radius = wheelCanvas.width / 2;

    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);

    numbers.forEach((number, index) => {
        const startAngle = index * angleStep;
        const endAngle = startAngle + angleStep;

        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, startAngle, endAngle);
        ctx.fillStyle = index % 2 === 0 ? '#C19A6B' : '#E8D5B9';
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(startAngle + angleStep / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(number, radius - 10, 10);
        ctx.restore();
    });
}

function spinWheel() {
    const num = numbers.length;
    const initialDuration = 5000; // Duration of the initial constant speed spin in milliseconds
    const additionalDuration = (Math.random() * 4 + 1) * 1000; // Random additional duration between 1 and 5 seconds in milliseconds
    const totalDuration = initialDuration + additionalDuration;
    const initialSpeed = 360 / 1000; // Speed in degrees per millisecond (one rotation per second)
    const start = performance.now();
    const randomAngle = Math.random() * 360; // Random angle to add to the initial angle

    function animate(time) {
        const elapsed = time - start;

        if (elapsed < initialDuration) {
            // Constant speed phase
            const currentAngle = (initialSpeed * elapsed) % 360;
            drawRotatedWheel(currentAngle);
            requestAnimationFrame(animate);
        } else if (elapsed < totalDuration) {
            // Deceleration phase
            const progress = (elapsed - initialDuration) / additionalDuration;
            const easeOutQuad = t => t * (2 - t); // Ease out quadratic function
            const currentSpeed = initialSpeed * (1 - easeOutQuad(progress));
            let currentAngle = (initialSpeed * initialDuration + currentSpeed * (elapsed - initialDuration)) % 360;
            if (currentAngle < 0) {
                currentAngle += 360; // Ensure the angle is positive
            }
            currentAngle += randomAngle; // Add random angle
            drawRotatedWheel(currentAngle);
            requestAnimationFrame(animate);
        }
    }

    function drawRotatedWheel(angle) {
        ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
        ctx.save();
        ctx.translate(wheelCanvas.width / 2, wheelCanvas.height / 2);
        ctx.rotate((angle * Math.PI) / 180);
        ctx.translate(-wheelCanvas.width / 2, -wheelCanvas.height / 2);
        drawWheel();
        ctx.restore();
    }

    requestAnimationFrame(animate);
}

