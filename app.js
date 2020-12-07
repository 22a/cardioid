import Snap from 'snapsvg'
import css from './s.css'
import mp3 from './art.mp3'


const padding = 20
const radius = (Math.min(window.innerHeight, window.innerWidth) / 2 - padding)
const circleCenterX = radius + (padding / 2)
const circleCenterY = radius + (padding / 2)
const surfaceSize = 2 * radius
const surface = Snap(surfaceSize + padding, surfaceSize + padding)

const pythagDistance = (aX, aY, bX, bY) => {
  const a = aX - bX
  const b = aY - bY

  return Math.sqrt(a * a + b * b)
}

const joinTwoNumbers = (a, b) => {
  const [aX, aY] = getCoordForNumber(a)
  const [bX, bY] = getCoordForNumber(b)

  let color = pythagDistance(aX, aY, bX, bY)
  color %= 360
  color /= 360

  surface.line(aX, aY, bX, bY).attr({
    stroke: `hsl(${color}, 100%, 50%)`,
    //  stroke: `black`,
     opacity: 0.5,
    strokeWidth: 1,
    strokeLinecap: 'round'
  })
}

const getCoordForNumber = (number) => {
  // subtracting 180 deg here to have 0 be on the left instead of the right
  const angle = ((number / modulo) * 360) - 180
  const x = circleCenterX + radius * Math.cos(-angle * Math.PI / 180)
  const y = circleCenterY + radius * Math.sin(-angle * Math.PI / 180)

  return [x, y]
}

let factor = getParameterByName("f") || 1
let modulo = getParameterByName("m") || 200
document.querySelector('#factor').value = factor * 1.0;
document.querySelector('#modulo').value = modulo * 1.0;


const _draw = () => {
  surface.clear()
  for (let i = 0; i < modulo; i++) {
    joinTwoNumbers(i, i * factor % modulo)
  }
  // const [intPart, decimal] = `${factor}`.split('.')
  // surface.text(5, 15, `Factor: ${intPart}${decimal ? '.' + decimal.charAt(0) : ''}`)
  document.querySelector('#ratio').innerHTML = modulo/factor;

}

const draw = () => {
  _draw();
  factor *= 1.0
  factor += 0.01
  document.querySelector('#factor').value = factor;

}


function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function downloadSVGAsText() {
  const svg = document.querySelector('svg');
  const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
  const a = document.createElement('a');
  const e = new MouseEvent('click');
  a.download = factor + "-" + modulo + '.svg';
  a.href = 'data:image/svg+xml;base64,' + base64doc;
  a.dispatchEvent(e);
}


let intervalId;

function pause() {
  clearInterval(intervalId);
}

function play() {
  intervalId = setInterval(() => Promise.resolve().then(draw), 5);
}

_draw();

function updateFactor() {
  factor = document.querySelector('#factor').value * 1.0;
  _draw();
}

function updateModulo() {
  modulo = document.querySelector('#modulo').value * 1.0;
  _draw();
}

const downloadSVG = document.querySelector('#downloadSVG');
downloadSVG.addEventListener('click', downloadSVGAsText);
document.querySelector('#play').addEventListener('click', play);
document.querySelector('#pause').addEventListener('click', pause);

document.querySelector('#factor').addEventListener('change', updateFactor);
document.querySelector('#modulo').addEventListener('change', updateModulo);
