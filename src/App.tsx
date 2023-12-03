import { FC } from "react"

const hcList = new Array<string>(9).fill("")
const dcList = new Array<string>(5).fill("")

export function App() {
  return (
    <div
      style={{
        position: "relative",
        width: "1000px",
        height: "1400px",
        margin: "auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "none",
        }}
      >
        <DimensionComplexity list={dcList} height={1000} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <HumanCosmology list={hcList} height={800} />
      </div>
    </div>
  )
}

const DimensionComplexity: FC<{
  list: unknown[]
  height: number
}> = ({ list, height }) => {
  // const self = list.at(-1)
  const remaining = list.slice(0, -1)
  const radius = 30 + 10 * list.length
  return (
    <div
      style={{
        padding: "0 20px",
        border: "1px solid blue",
        borderTop: "none",
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: radius,
      }}
    >
      {remaining.length > 0 && (
        <DimensionComplexity list={remaining} height={height} />
      )}
      <div
        style={{
          height: `${height}px`,
        }}
      ></div>
    </div>
  )
}

const HumanCosmology: FC<{
  list: unknown[]
  index?: number
  height: number
}> = ({ list, index = 0, height }) => {
  // const self = list.at(-1)
  const radius = 60 + 20 * (list.length - index - 1)
  const hue = 0.6 * (index / (list.length - 1))
  return (
    <div
      style={{
        padding: "0 30px",
        borderBottomLeftRadius: radius,
        borderBottomRightRadius: radius,
        background: `hsl(${hue}turn 60% 70%)`,
        border: `5px solid hsl(${hue}turn 60% 50%)`,
        borderTop: "none",
        display: "inline-block",
        width: "auto",
      }}
    >
      {index + 1 < list.length && (
        <HumanCosmology list={list} index={index + 1} height={height} />
      )}
      <div
        style={{
          height: `${height / list.length}px`,
          width: `${(height / list.length) * 1.5}px`,
        }}
      ></div>
    </div>
  )
}
