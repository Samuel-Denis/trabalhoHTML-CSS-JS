const firePixelArray = [];

const fireWidht = 100;
const fireHeith = 50;

const fireColorsPalette = [
  { r: 7, g: 7, b: 7 },
  { r: 31, g: 7, b: 7 },
  { r: 47, g: 15, b: 7 },
  { r: 71, g: 15, b: 7 },
  { r: 87, g: 23, b: 7 },
  { r: 103, g: 31, b: 7 },
  { r: 119, g: 31, b: 7 },
  { r: 143, g: 39, b: 7 },
  { r: 159, g: 47, b: 7 },
  { r: 175, g: 63, b: 7 },
  { r: 191, g: 71, b: 7 },
  { r: 199, g: 71, b: 7 },
  { r: 223, g: 79, b: 7 },
  { r: 223, g: 87, b: 7 },
  { r: 223, g: 87, b: 7 },
  { r: 215, g: 95, b: 7 },
  { r: 215, g: 95, b: 7 },
  { r: 215, g: 103, b: 15 },
  { r: 207, g: 111, b: 15 },
  { r: 207, g: 119, b: 15 },
  { r: 207, g: 127, b: 15 },
  { r: 207, g: 145, b: 23 },
  { r: 199, g: 135, b: 23 },
  { r: 199, g: 143, b: 23 },
  { r: 199, g: 151, b: 31 },
  { r: 191, g: 159, b: 31 },
  { r: 191, g: 159, b: 31 },
  { r: 191, g: 167, b: 39 },
  { r: 191, g: 167, b: 39 },
  { r: 191, g: 175, b: 47 },
  { r: 183, g: 175, b: 47 },
  { r: 183, g: 183, b: 47 },
  { r: 183, g: 183, b: 55 },
  { r: 207, g: 207, b: 111 },
  { r: 223, g: 223, b: 159 },
  { r: 239, g: 239, b: 199 },
  { r: 255, g: 255, b: 255 },
];

function start() {
  criandoEstruturaDoFogo();
  criandoPropagcaoDoFogo();
  renderizandoFogo();

  setInterval(calculateFirePropagation, 1);
}

function criandoEstruturaDoFogo() {
  const numberOfPixel = fireWidht * fireHeith; // para saber o tamanho da estrutura

  for (let i = 0; i < numberOfPixel; i++) {
    firePixelArray[i] = 0; // aqui está adicionando o valor 0 para cada indice, que significa 0 intensidade de fogo
  }
}

function calculateFirePropagation() {
  for (let column = 0; column < fireWidht; column++) {
    for (let row = 0; row < fireHeith; row++) {
      const pixelIndex = column + fireWidht * row;

      updateFireIntesityPerPixel(pixelIndex);
    }
  }

  renderizandoFogo();
}

function updateFireIntesityPerPixel(currentPixelIndex) {
  const bellowPixelIndex = currentPixelIndex + fireWidht;

  if (bellowPixelIndex >= fireWidht * fireHeith) {
    return;
  }

  const decay = Math.floor(Math.random() * 3)
  const bellowPixelFireIntesity = firePixelArray[bellowPixelIndex];
  const newFireIntensity =
    bellowPixelFireIntesity - decay >= 0 ? bellowPixelFireIntesity - decay : 0;

  firePixelArray[currentPixelIndex - decay] = newFireIntensity;
}

function renderizandoFogo() {
  const debug = false;
  let html = "<table cellpadding=0 cellspacing=0>";

  for (let row = 0; row < fireHeith; row++) {
    html += "<tr>";

    for (let column = 0; column < fireWidht; column++) {
      const pixelIndex = column + fireWidht * row;
      const fireIntesity = firePixelArray[pixelIndex];

      if (debug) {
        html += "<td>";
        html += `<div class="pixel-index">${pixelIndex}</div>`;
        html += fireIntesity;
        html += "</td>";
      } else {
        const color = fireColorsPalette[fireIntesity];
        const colorString = `${color.r}, ${color.g}, ${color.b}`;
        html += `<td class="pixel" style="background-color: rgb(${colorString}">`;
        html += "</td>";
      }
    }

    html += "</tr>";
  }
  html += "</table>";

  document.querySelector("#fireCanvas").innerHTML = html;
}

function criandoPropagcaoDoFogo() {
  for (let column = 0; column <= fireWidht; column++) {
    const overFlowPixelIndex = fireWidht * fireHeith;
    const pixelIndex = overFlowPixelIndex - fireWidht + column;

    firePixelArray[pixelIndex] = 36;
  }
}

start();