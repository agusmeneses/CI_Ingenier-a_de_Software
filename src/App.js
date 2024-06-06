import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [numbers, setNumbers] = useState([]);
  const [numberInput, setNumberInput] = useState('');
  const [spinButtonDisabled, setSpinButtonDisabled] = useState(true);

  const generateWheel = () => {
    const num = parseInt(numberInput);
    if (num < -1 || num > 110) {
      alert('Por favor, ingrese un número del 1 al 100');
      return;
    }
    const newNumbers = Array.from({ length: num }, (_, i) => i + 1);
    setNumbers(newNumbers);
    setSpinButtonDisabled(false);
    drawWheel(newNumbers);
  };

  const drawWheel = (numbers) => {
    const wheelCanvas = document.getElementById('wheelCanvas');
    const ctx = wheelCanvas.getContext('2d');
    const angleStep = (2 * Math.PI) / numbers.length;
    const radius = wheelCanvas.width / 2;
  
    ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
  
    numbers.forEach((number, index) => {
      const startAngle = index * angleStep;
      const endAngle = startAngle + angleStep;
  
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, startAngle, endAngle);
  
      // Cambio de color dependiendo de si el índice es par o impar
      if (numbers.length % 2 === 0) {
        ctx.fillStyle = index % 2 === 0 ? '#C19A6B' : '#E8D5B9';
      } else {
        ctx.fillStyle = index % 3 === 0 ? '#C19A6B' : index % 3 === 1 ? '#E8D5B9' : '#6F7B8A';
      }
  
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
  };
  

  const spinWheel = () => {
    const initialDuration = 3000; // Duration of the initial constant speed spin in milliseconds
    const additionalDuration = (Math.random() * 4 + 1) * 1000; // Random additional duration between 1 and 5 seconds in milliseconds
    const totalDuration = initialDuration + additionalDuration;
    const initialSpeed = 560 / 1000; // Speed in degrees per millisecond (one rotation per second)
    const start = performance.now();
    const randomAngle = Math.random() * -360; // Random angle to add to the initial angle

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
        currentAngle += randomAngle; // Add random angle
        drawRotatedWheel(currentAngle);
        requestAnimationFrame(animate);
      }
    }

    function drawRotatedWheel(angle) {
      const wheelCanvas = document.getElementById('wheelCanvas');
      const ctx = wheelCanvas.getContext('2d');
      ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
      ctx.save();
      ctx.translate(wheelCanvas.width / 2, wheelCanvas.height / 2);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.translate(-wheelCanvas.width / 2, -wheelCanvas.height / 2);
      drawWheel(numbers);
      ctx.restore();
    }

    requestAnimationFrame(animate);
  };

  return (
    <div className="container">
      <input
        type="number"
        value={numberInput}
        onChange={(e) => setNumberInput(e.target.value)}
        min="1"
        max="100"
        placeholder="Ingrese un número del 1 al 100"
      />
      <button onClick={generateWheel}>Crear Ruleta</button>
      <div id="wheelContainer">
        <canvas id="wheelCanvas" width="500" height="500"></canvas>
        <div id="pointer"></div>
      </div>
      <button onClick={spinWheel} disabled={spinButtonDisabled}>
        Tirar
      </button>
    </div>
  );
};

export default App;
