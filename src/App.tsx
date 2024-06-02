import { FC } from "react"

const LAYERS = [
  { macro: "cosmic web", micro: "quantum foam" },
  { macro: "galaxies", micro: "particles" },
  { macro: "stars", micro: "atoms" },
  { macro: "planets", micro: "molecules" },
  { macro: "geomes", micro: "biomolecules" },
  { macro: "biomes", micro: "cells" },
  { macro: "organisms", micro: "organs" },
  { macro: "collectives", micro: "awareness" },
  { macro: "cultures", micro: "abstraction" },
] as const

export function App() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        padding: "3%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div>
        <ListNest list={new Array<string>(10).fill("")} height={400} />
      </div>
      <div>
        <ListTable layers={LAYERS} />
      </div>
    </div>
  )
}

const ListTable: FC<{
  layers: typeof LAYERS
}> = ({ layers }) => <table></table>

const ListNest: FC<{
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
        <ListNest list={list} index={index + 1} height={height} />
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
