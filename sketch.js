let btn;
let resetButton;
let infoButton;
let currentArt = -1;
let artworks = [];
let particles = [];
let introDiv;
let infoIndex = 0;
let instructionDiv;

// Información sobre el proceso de John Whitney
const johnWhitneyInfo = [
  "John Whitney fue un pionero en la animación por computadora, conocido por sus patrones geométricos y técnicas innovadoras de visualización.",
  "En los años 60, Whitney comenzó a experimentar con generadores de imágenes computacionales y sintetizadores para crear arte visual.",
  "Whitney fue uno de los primeros en usar la animación por computadora para crear una serie de cortometrajes experimentales, utilizando secuencias geométricas precisas.",
  "En su obra más conocida, 'Catalog', Whitney combinó música y gráficos generados por computadora, creando una forma única de arte cinético.",
  "La influencia de Whitney ha sido duradera, ya que sus técnicas innovadoras han dejado una marca profunda en la animación digital y en los efectos visuales modernos.",  "A continuación mis trabajos con refrencias a los de el. Ya esto es THE END, dale iniciar  "
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Botones
  btn = createButton('Iniciar');
  btn.position(width / 2 - 40, 20);
  btn.mousePressed(startArtwork);
  btn.style('position', 'fixed');
  
  resetButton = createButton('Reset');
  resetButton.position(windowWidth - 100, 20);
  resetButton.mousePressed(resetArtwork);
  resetButton.style('position', 'fixed');
  resetButton.hide();
  
  infoButton = createButton('Cambiar Información');
  infoButton.position(20, 20);
  infoButton.mousePressed(changeInfo);
  infoButton.style('position', 'fixed');
  
  // Texto introductorio
  introDiv = createDiv();
  introDiv.style('position', 'absolute');
  introDiv.style('top', '30%');
  introDiv.style('left', '50%');
  introDiv.style('transform', 'translateX(-50%)');
  introDiv.style('text-align', 'center');
  introDiv.style('color', '#FFFFFF');
  introDiv.style('font-family', 'Arial, sans-serif');
  
  // Instrucciones
  instructionDiv = createDiv();
  instructionDiv.style('position', 'absolute');
  instructionDiv.style('top', '10%');
  instructionDiv.style('left', '50%');
  instructionDiv.style('transform', 'translateX(-50%)');
  instructionDiv.style('text-align', 'center');
  instructionDiv.style('color', '#FFFFFF');
  instructionDiv.style('font-family', 'Arial, sans-serif');
  instructionDiv.html("<h2>Antes de continuar, lee la información.</h2>");

  generateArtworks();
  textSize(32);
  textAlign(CENTER, CENTER);
  noStroke();
  cursor();
}

function draw() {
  background(0);
  
  if (currentArt === -1) {
    drawIntroScreen();
    cursor();
  } else {
    drawArtwork(currentArt);
    updateParticles();
    drawMouseGlow();
    drawArtworkNames();
    noCursor();
  }
}

function drawIntroScreen() {
  introDiv.html(`
    <h1>JW Interactive TFG</h1>
    <p>${johnWhitneyInfo[infoIndex]}</p>
  `);
}

function generateArtworks() {
  artworks = [
    {
      name: "Líneas Dinámicas",
      render: (t) => {
        for (let i = 0; i < width; i += 10) {
          for (let j = 0; j < height; j += 10) {
            let n = noise(i * 0.05 + t * 0.1, j * 0.05 + t * 0.1);
            let size = map(n, 0, 1, 5, 30);
            let colorFactor = map(sin(i * 0.1 + t), -1, 1, 0, 255);
            stroke(colorFactor, 150, 255 - colorFactor);
            line(i, j, i + cos(t * 2) * size, j + sin(t * 2) * size);
          }
        }
      }
    },
    {
      name: "Geometría Orgánica",
      render: (t) => {
        for (let i = 0; i < width; i += 40) {
          for (let j = 0; j < height; j += 40) {
            let n = noise(i * 0.1 + t * 0.1, j * 0.1 + t * 0.1);
            let size = map(n, 0, 1, 10, 100);
            let r = map(sin(i * 0.1 + t), -1, 1, 0, 255);
            let g = map(cos(j * 0.1 + t), -1, 1, 0, 255);
            let b = map(sin(i * 0.1 + j * 0.1), -1, 1, 0, 255);
            fill(r, g, b, 150);
            ellipse(i + sin(t * 0.5) * 100, j + cos(t * 0.5) * 100, size);
          }
        }
      }
    },
    {
      name: "Ondas Líquidas",
      render: (t) => {
        for (let x = 0; x < width; x += 20) {
          let y = height / 2 + sin(x * 0.1 + t * 0.3) * 100;
          let size = map(sin(x * 0.1 + t * 0.5), -1, 1, 5, 30);
          let r = map(sin(t), -1, 1, 50, 255);
          let g = map(cos(t), -1, 1, 50, 255);
          let b = map(sin(t * 0.5), -1, 1, 50, 255);
          fill(r, g, b);
          ellipse(x, y, size, size);
        }
      }
    },
    {
      name: "Partículas Fluorescentes",
      render: (t) => {
        for (let i = 0; i < 100; i++) {
          let p = particles[i];
          if (p) {
            p.x += p.vx;
            p.y += p.vy;
            p.lifespan -= 4;  // Hacer las partículas más rápidas
            fill(255, p.lifespan);
            ellipse(p.x, p.y, 5, 5);
            if (p.lifespan <= 0) {
              particles.splice(i, 1);
            }
          }
        }
        
        // Crear nuevas partículas rápidamente
        if (frameCount % 2 === 0) {
          particles.push({
            x: mouseX,
            y: mouseY,
            vx: random(-5, 5),
            vy: random(-5, 5),
            lifespan: 255
          });
        }
      }
    },
    {
      name: "Desplazamiento Aéreo",
      render: (t) => {
        for (let i = 0; i < width; i += 10) {
          for (let j = 0; j < height; j += 10) {
            let n = noise(i * 0.05 + t * 0.3, j * 0.05 + t * 0.3);
            let size = map(n, 0, 1, 3, 15);
            let angle = sin(t + i * 0.1) * 10;
            fill(255, 100);
            ellipse(i + cos(angle) * 50, j + sin(angle) * 50, size);
          }
        }
      }
    }
  ];
}

function startArtwork() {
  if (currentArt === -1) {
    currentArt = 0;
    resetButton.show();
    btn.html("Cambiar Artwork (Click)");
    instructionDiv.hide();
  } else {
    currentArt = (currentArt + 1) % artworks.length;
  }

  infoIndex = (infoIndex + 1) % johnWhitneyInfo.length;
}

function resetArtwork() {
  currentArt = -1;
  resetButton.hide();
  btn.html("Iniciar");
  introDiv.show();
  infoIndex = 0;
  instructionDiv.show();
}

function drawArtwork(index) {
  let t = millis() * 0.001; // Aceleramos la animación
  artworks[index].render(t);
}

function updateParticles() {
  // Las partículas se gestionan directamente dentro del Artwork 4
}

function drawMouseGlow() {
  noStroke();
  fill(150, 0, 255, 150);
  ellipse(mouseX, mouseY, 20, 20);
}

function drawArtworkNames() {
  fill(255);
  textSize(24);
  text(artworks[currentArt].name, width / 2, height - 40);  // Dibuja el nombre en la parte inferior central
}

function changeInfo() {
  infoIndex = (infoIndex + 1) % johnWhitneyInfo.length;
}

