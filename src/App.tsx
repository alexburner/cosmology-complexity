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
        flexDirection: "column",
        alignItems: "center",
        gap: 50,
      }}
    >
      <div>
        <LayerTable layers={LAYERS} />
      </div>
      <div>
        <LayerNesting layers={LAYERS} height={400} />
      </div>
      <div>big bloom</div>
    </div>
  )
}

const LayerNesting: FC<{
  layers: typeof LAYERS
  index?: number
  height: number
}> = ({ layers, index = 0, height }) => {
  const self = layers[index]
  if (!self) return null // Unreachable
  const impact = (layers.length - index) / layers.length
  return (
    <div
      style={{
        padding: index === 0 ? "10px 10px 12px" : "10px 10px",
        margin: "0 0 10px",
        borderRadius: `${impact * 12 + 12}px`,
        background: `hsl(${hue(index, layers.length)}turn 60% 70%)`,
        border: `1px dotted #333`,
        width: "auto",
      }}
    >
      {index + 1 < layers.length && (
        <LayerNesting layers={layers} index={index + 1} height={height} />
      )}
      <div
        style={{
          padding: "0 0 1px",
          lineHeight: "1.25em",
          display: "flex",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <div style={{ minWidth: "100px", textAlign: "right" }}>
          {self.macro}
        </div>
        <div style={{ minWidth: "100px", textAlign: "left" }}>{self.micro}</div>
      </div>
    </div>
  )
}

const LayerTable: FC<{
  layers: typeof LAYERS
}> = ({ layers }) => (
  <table>
    <thead>
      <tr>
        <th>macro</th>
        <th>micro</th>
      </tr>
    </thead>
    <tbody>
      {layers.map((layer, i) => (
        <tr
          key={i}
          style={{
            background: `hsl(${hue(i, layers.length)}turn 60% 70%)`,
          }}
        >
          <td>{layer.macro}</td>
          <td>{layer.micro}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

const hue = (index: number, length: number) => (index / length) * 0.64 - 0.04
