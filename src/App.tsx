import { FC } from "react"

const hcList = new Array<string>(10).fill("")
const dcList = new Array<string>(5).fill("")

export function App() {
  return (
    <div
      style={{
        position: "relative",
        width: "1000px",
        height: "1400px",
        margin: " 3% auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <HumanCosmology list={hcList} height={400} />
      </div>
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
    </div>
  )
}

const HumanCosmology: FC<{
  list: unknown[]
  index?: number
  height: number
}> = ({ list, index = 0, height }) => {
  // const self = list.at(-1)
  // const radius = 60 + 20 * (list.length - index - 1)
  const hue = (index / (list.length - 1)) * 0.7
  const impact = (list.length - index) / list.length
  return (
    <div
      style={{
        padding: "10px 10px",
        margin: "0 0 10px",
        // borderRadius: "3px",
        borderRadius: `${impact * 2 + 3}px`,
        // borderBottomLeftRadius: radius,
        // borderBottomRightRadius: radius,
        background: `hsl(${hue}turn 60% 60%)`,
        border: `1px dotted #333`,
        // border: `2px solid hsl(${hue}turn 60% 50%)`,
        // borderTop: "none",
        display: "inline-block",
        width: "auto",
      }}
    >
      {index + 1 < list.length && (
        <HumanCosmology list={list} index={index + 1} height={height} />
      )}
      <div
        style={
          index + 1 < list.length
            ? {
                height: `20px`,
                width: `200px`,
              }
            : {
                width: `200px`,
              }
        }
      >
        &nbsp;
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
