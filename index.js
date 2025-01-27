const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

ctx.fillStyle = 'yellow';

const centre = {x: canvas.width / 2, y: canvas.height / 2};
console.log(centre);
let solarSystem = 
   [{name: "sun", distance: 0, radius: 35 /*70*/, color: 'Gold', degreesPerDay: 0.0},
    {name: "mercury", distance: 58, radius: 2, color: 'brown', degreesPerDay: 4.15},
    {name: "venus", distance: 108, radius: 6, color: 'pink', degreesPerDay: 1.625},
    {name: "earth", distance: 150, radius: 7, color: 'lightBlue', degreesPerDay: 1.0},
    {name: "mars", distance: 228, radius: 5, color: 'red', degreesPerDay: 0.53},
    {name: "jupiter", distance: 778, radius: 22, color: 'brown', degreesPerDay: 0.084},
    {name: "saturn", distance: 1429, radius: 21, color: 'LightYellow', degreesPerDay: 0.034},
    {name: "uranus", distance: 2871, radius: 13, color: 'LightSkyBlue', degreesPerDay: 0.012},
    {name: "neptune", distance: 4497, radius: 13, color: 'RoyalBlue ', degreesPerDay: 0.006}];

function fillCircle(x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.stroke(); 
  }

function drawEarth(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'lightBlue';
    ctx.fill();
    ctx.fillStyle = '#228B22'; // Forest green

    ctx.beginPath();
    ctx.arc(x-3, y-3, 3, 0, Math.PI * 2); // One continent
    ctx.fill();
  
    ctx.beginPath();
    ctx.arc(x+3, y-2, 2, 0, Math.PI * 2); // Another continent
    ctx.fill();
  
    ctx.beginPath();
    ctx.arc(x-2, y+4, 3, 0, Math.PI * 2); // Another continent
    ctx.fill();
}

async function animateSolarSystem() {
for(let day = 0; day < 36500; day += 1) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas for each frame
        solarSystem.forEach(planet => {
            const distance = Math.sqrt(planet.distance);
            drawCircle(centre.x, centre.y, 10 * distance);
            const x = centre.x + 10 * distance * Math.cos(0.01745373333*day * planet.degreesPerDay);
            const y = centre.y + 10 * distance * Math.sin(0.01745373333*day * planet.degreesPerDay);
            
            if (planet.name === "earth") {
                drawEarth(x, y, planet.radius);
            } else {
                fillCircle(x, y, planet.radius, planet.color);
            }
        });

        // Draw the timestamp
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(`Day: ${day}`, 10, 30);

        await sleep(100); // Sleep for 0.1 seconds
    }
}
  
animateSolarSystem();