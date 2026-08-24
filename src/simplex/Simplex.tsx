import paper from "paper"
import { FC, useEffect, useRef } from "react"
import { drawDots, drawFill, drawGraphsAndShells, getPoints } from "./util"

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
      draw({ canvas: canvasRef.current, n })
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

const draw = (args: { n: number; canvas: HTMLCanvasElement }) => {
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
    // fillColor: TRANSPARENT, // TODO fill spread too
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
