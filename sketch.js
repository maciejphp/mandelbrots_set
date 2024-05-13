let zoom = 2.5;
let offsetX = 0;
let offsetY = 0

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  drawMandelbrot();
}


function mousePressed() {
  zoom *= .9;
  document.getElementById("zoom").innerText = "zoom: " + zoom;
  drawMandelbrot();
  return false;
}

function keyPressed() {
  if (key === 'a') {
    offsetX -= .1 * zoom;
  } else if (key === 'd') {
    offsetX += .1 * zoom;
  } else if (key === 'w') {
    offsetY -= .1 * zoom;
  } else if (key === 's') {
    offsetY += .1 * zoom;
  }
  drawMandelbrot();
}

function drawMandelbrot() {
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let a = map(x, 0, width, -zoom, zoom) + offsetX;
      let b = map(y, 0, height, -zoom, zoom) + offsetY;
      let ca = a;
      let cb = b;
      let n = 0;
      let maxIterations = 100;

      while (n < maxIterations) {
        let aa = a * a - b * b;
        let bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (abs(a + b) > 16) {
          break;
        }
        n++;
      }

      let bright = map(n, 0, maxIterations, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);

      if (n === maxIterations) {
        bright = 0;
      }

      let pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}
