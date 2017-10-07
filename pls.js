/* global Snap */
const modulo = 200
const radius = 250
const surfaceSize = 2 * radius
const padding = 20
const surface = Snap(surfaceSize + padding, surfaceSize + padding)
const circleCenterX = radius + (padding / 2)
const circleCenterY = radius + (padding / 2)

const joinTwoNumbers = (a, b, color = '#000000') => {
  const [aX, aY] = getCoordForNumber(a)
  const [bX, bY] = getCoordForNumber(b)

  surface.line(aX, aY, bX, bY).attr({
    stroke: color,
    strokeWidth: 1,
    strokeLinecap: 'round'
  })
}

const getCoordForNumber = (number) => {
  // subtracting 180 deg here to have 0 be on the left instead ot the right
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
  const strNum = `${factor}`
  const [intPart, decimal] = strNum.split('.')
  surface.text(5, 15, `Factor: ${intPart}${decimal ? '.' + decimal.charAt(0) : ''}`)
  factor += 0.1
}

setInterval(draw, 100)
