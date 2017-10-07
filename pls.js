/* global Snap */
const modulo = 200
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

let factor = 1

const draw = () => {
  surface.clear()
  for (let i = 0; i < modulo; i++) {
    joinTwoNumbers(i, i * factor % modulo)
  }
  // const [intPart, decimal] = `${factor}`.split('.')
  // surface.text(5, 15, `Factor: ${intPart}${decimal ? '.' + decimal.charAt(0) : ''}`)
  factor += 0.005
}

setInterval(draw, 100)
