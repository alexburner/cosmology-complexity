import paper from "paper"
import { FC, useEffect, useRef } from "react"

const CANVAS_W = 44
const CANVAS_H = CANVAS_W
const CENTER = new paper.Point(CANVAS_W / 2, CANVAS_H / 2)
const RADIUS = Math.round(CANVAS_W * 0.4)

const DOT_RADIUS = 3.5
const GRAPH_THICKNESS = 1
const CIRCLE_THICKNESS = 1

const TRANSPARENT = new paper.Color("transparent")
const GRAPH_COLOR = new paper.Color("#111")
// GRAPH_COLOR.alpha = 0.88
const CIRCLE_COLOR = new paper.Color(GRAPH_COLOR)
CIRCLE_COLOR.alpha = 0.33
const FILL_COLOR = new paper.Color("white")

export const Simplex: FC<{ n: number }> = ({ n }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (canvasRef.current) {
      drawShape({ canvas: canvasRef.current, n })
    }
  }, [n])
  return (
    <canvas
      data-simplex-n={n}
      ref={canvasRef}
      width={CANVAS_W}
      height={CANVAS_H}
      style={{
        width: `${CANVAS_W}px`,
        height: `${CANVAS_H}px`,
        // outline: "1px solid #111",
      }}
    />
  )
}

const drawShape = (args: { n: number; canvas: HTMLCanvasElement }) => {
  paper.setup(args.canvas)

  // debug canvas size
  // drawDots([CENTER], new paper.Color("red"), CANVAS_W / 2)

  // spread n points
  const points = getPoints(CENTER, RADIUS, args.n, true)

  const group = new paper.Group()

  // draw fill
  const fill = drawFill({
    points,
    strokeColor: TRANSPARENT,
    strokeWidth: 0,
    fillColor: FILL_COLOR,
  })
  group.addChild(fill)

  // draw base circle
  const base = new paper.Path.Circle({
    center: CENTER,
    radius: RADIUS,
    strokeColor: CIRCLE_COLOR,
    strokeWidth: CIRCLE_THICKNESS,
    strokeCap: "round",
    strokeJoin: "round",
    // dashArray: [0, 3.3],
  })
  base.rotate(90)
  group.addChild(base)

  // draw lines
  const container = new paper.Path.Rectangle({
    point: [0, 0],
    size: [CANVAS_W, CANVAS_H],
  })
  group.addChild(container)
  if (args.n > 0) {
    const graphsAndShells = drawGraphsAndShells({
      container,
      center: CENTER,
      radius: RADIUS,
      proximity: 1000,
      size: 1,
      n: args.n,
      graphColor: GRAPH_COLOR,
      shellColor: TRANSPARENT,
      points,
      graphThickness: GRAPH_THICKNESS,
    })
    Object.values(graphsAndShells)
      .flat()
      .forEach((line) => {
        group.addChild(line)
      })
  }

  // draw dots
  const dots = drawDots(points, GRAPH_COLOR, DOT_RADIUS)
  group.addChild(dots)

  // group.rotate(-90, CENTER)
}

const getPoints = (
  center: paper.Point,
  radius: number,
  n: number,
  honest1?: boolean,
  evenGravity?: boolean,
): paper.Point[] => {
  if (n === 0) return []
  if (n === 1 && !honest1) return [center.clone()]
  if (n === 1 && honest1) {
    return [new paper.Point([center.x, center.y - radius])]
  }

  const vector = new paper.Point(center)
  vector.length = radius
  vector.angle = -90

  const angleDelta = 360 / n

  if (evenGravity && n % 2 === 0) vector.angle += angleDelta / 2

  const points = new Array(n).fill(null).map(() => {
    const point = center.add(vector)
    vector.angle += angleDelta
    return point
  })

  return points
}

const drawFill = ({
  points,
  strokeColor,
  strokeWidth = 2,
  fillColor,
}: {
  points: paper.Point[]
  strokeColor: paper.Color
  strokeWidth?: number
  fillColor?: paper.Color
}): paper.Path => {
  const path = new paper.Path(points)

  path.closed = true
  path.strokeCap = "round"
  path.strokeJoin = "round"
  path.strokeColor = strokeColor
  path.strokeWidth = strokeWidth
  if (fillColor) path.fillColor = fillColor

  return path
}

const drawDots = (
  points: paper.Point[],
  fillColor: paper.Color,
  radius: number,
  strokeColor?: paper.Color,
  strokeWidth?: number,
  dashArray?: [number, number],
): paper.Group => {
  const dots = points.map(
    (center) =>
      new paper.Path.Circle({
        center,
        radius,
        fillColor,
        strokeColor,
        strokeWidth,
        dashArray,
        strokeCap: "round",
      }),
  )
  return new paper.Group(dots)
}

const drawGraphsAndShells = ({
  container,
  center,
  // proximity,
  radius,
  size,
  n,
  graphColor,
  shellColor,
  points,
  shelln = 20,
  shellGap = 36,
  shellThickness = 1,
  graphThickness = 2,
  twoTouch = false,
  dotRadius,
  dashArray,
  evenGravity = false,
}: {
  container: paper.Path
  center: paper.Point
  proximity: number
  radius: number
  size: number
  n: number
  graphColor: paper.Color
  shellColor: paper.Color
  points: paper.Point[]
  shelln?: number
  shellGap?: number
  shellThickness?: number
  graphThickness?: number
  twoTouch?: boolean
  dotRadius?: number
  dashArray?: [number, number]
  evenGravity?: boolean
}): Record<string, paper.Path.Line[]> => {
  // 0 has nothing
  if (n < 1) {
    return {}
  }

  // 1 only a point
  if (n < 2) {
    drawOne({
      center,
      shelln,
      shellColor,
      shellThickness,
      shellGap,
      graphColor,
      graphThickness,
      container,
      dotRadius,
      dashArray,
    })
    return {}
  }

  const lines = []
  const lineExists: Record<string, boolean> = {}
  const linesByLength: Record<string, paper.Path.Line[]> = {}
  points.forEach(function (pointA, indexA) {
    const coordsA = pointA.toString()
    points.forEach(function (pointB, indexB) {
      if (indexA === indexB) return
      const coordsB = pointB.toString()
      if (lineExists[coordsA + coordsB]) return
      if (lineExists[coordsB + coordsA]) return
      lineExists[coordsA + coordsB] = true

      const lineLength = pointA.subtract(pointB).length
      const lineLengthStr = lineLength.toFixed(2)

      const line = new paper.Path.Line({
        from: pointA,
        to: pointB,
        strokeCap: "round",
        strokeJoin: "round",
        strokeColor: graphColor,
        strokeWidth: graphThickness,
      })

      lines.push(line)

      const theseLines = linesByLength[lineLengthStr] ?? []
      theseLines.push(line)
      linesByLength[lineLengthStr] = theseLines
    })
  })

  // special field for 2
  if (n === 2) {
    drawTwo({
      center,
      size,
      radius,
      shelln,
      shellColor,
      shellThickness,
      shellGap,
      container,
      twoTouch,
      dashArray,
      evenGravity,
    })
  } else {
    drawN({
      center,
      shelln,
      shellColor,
      shellThickness,
      shellGap,
      container,
      linesByLength,
      dashArray,
      points,
    })
  }

  return linesByLength
}

const drawOne = ({
  center,
  shelln,
  shellColor,
  shellThickness,
  shellGap,
  // graphColor,
  // graphThickness,
  container,
  dotRadius,
  dashArray,
}: {
  center: paper.Point
  shelln: number
  shellColor: paper.Color
  shellThickness: number
  shellGap: number
  graphColor: paper.Color
  graphThickness: number
  container: paper.Path
  dotRadius?: number
  dashArray?: [number, number]
}): void => {
  // point
  // new paper.Path.Circle({
  //   center: center,
  //   radius: graphThickness,
  //   fillColor: graphColor,
  // })
  // and rings
  const rings = []
  for (let i = 0; i < shelln; i++) {
    rings.push(
      new paper.Path.Circle({
        center: center,
        radius: (i + 0) * shellGap + (dotRadius ?? 0),
        strokeWidth: shellThickness,
        strokeColor: shellColor,
        strokeCap: "round",
        strokeJoin: "round",
        dashArray,
      }),
    )
  }
  rings.unshift(container)
  new paper.Group(rings).clipped = true
}

const drawTwo = ({
  center,
  size,
  radius,
  shelln,
  shellColor,
  shellThickness,
  shellGap,
  container,
  twoTouch,
  dashArray,
  evenGravity,
}: {
  center: paper.Point
  size: number
  radius: number
  shelln: number
  shellColor: paper.Color
  shellThickness: number
  shellGap: number
  container: paper.Path
  twoTouch: boolean
  dashArray?: [number, number]
  evenGravity: boolean
}): void => {
  const rays = []
  const touchGap = twoTouch ? 0 : shellGap
  rays.push(
    new paper.Path.Line({
      from: [center.x, center.y - size / 2],
      to: [center.x, center.y - radius - touchGap],
      strokeColor: shellColor,
      strokeWidth: shellThickness,
      strokeCap: "round",
      strokeJoin: "round",
      dashArray,
    }),
  )
  rays.push(
    new paper.Path.Line({
      from: [center.x, center.y + radius + touchGap],
      to: [center.x, center.y + size / 2],
      strokeColor: shellColor,
      strokeWidth: shellThickness,
      strokeCap: "round",
      strokeJoin: "round",
      dashArray,
    }),
  )
  if (evenGravity) shelln *= 2
  for (let i = 0; i < shelln; i++) {
    rays.push(
      new paper.Path.Line({
        from: [center.x - (i + 1) * shellGap, center.y - size / 2],
        to: [center.x - (i + 1) * shellGap, center.y + size / 2],
        strokeColor: shellColor,
        strokeWidth: shellThickness,
        strokeCap: "round",
        strokeJoin: "round",
        dashArray,
      }),
    )
    rays.push(
      new paper.Path.Line({
        from: [center.x + (i + 1) * shellGap, center.y - size / 2],
        to: [center.x + (i + 1) * shellGap, center.y + size / 2],
        strokeColor: shellColor,
        strokeWidth: shellThickness,
        strokeCap: "round",
        strokeJoin: "round",
        dashArray,
      }),
    )
  }
  rays.unshift(container)
  const rayGroup = new paper.Group(rays)
  if (!evenGravity) rayGroup.clipped = true
  if (evenGravity) rayGroup.rotate(90, center)
  rayGroup.sendToBack()
}

const drawN = ({
  center,
  points,
  shelln,
  shellColor,
  shellThickness,
  shellGap,
  container,
  linesByLength,
  dashArray,
}: {
  center: paper.Point
  points: paper.Point[]
  shelln: number
  shellColor: paper.Color
  shellThickness: number
  shellGap: number
  container: paper.Path
  linesByLength: Record<string, paper.Path.Line[]>
  dashArray?: [number, number]
}): void => {
  // base shell (based on shortest-edge shape)
  const shortestLength = Object.keys(linesByLength).sort(
    (a, b) => Number(a) - Number(b),
  )[0]
  if (!shortestLength) return
  const shortestLines = linesByLength[shortestLength]
  const baseShell = new paper.Group(shortestLines)

  // base radius
  const pointA = points[0]
  const pointB = points[1]
  if (!pointA || !pointB) throw new Error(`drawN for n>2, n=${points.length}`)
  // find point halfway between point1 and point2
  const pointAB = pointA.add(pointB).divide(2)
  // find distance from center -> point12
  const distance = pointAB.subtract(center).length
  // use distance as base radius
  const baseRadius = distance

  // draw shells
  const shells = []
  for (let i = 0; i < shelln; i++) {
    const shell = baseShell.clone()
    const shellRadius = baseRadius + (i + 1) * shellGap
    const shellScale = shellRadius / baseRadius
    shell.scale(shellScale, center)
    shell.strokeWidth = shellThickness
    shell.strokeColor = shellColor as paper.Color
    if (dashArray) shell.dashArray = dashArray
    shells.push(shell)
  }
  shells.unshift(container)
  new paper.Group(shells).clipped = true
}
