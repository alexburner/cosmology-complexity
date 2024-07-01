import { FC } from "react"

const LAYERS = [
  { macro: "cosmic web", micro: "quantum realm" },
  { macro: "galaxies", micro: "particles" },
  { macro: "stars", micro: "atoms" },
  { macro: "planets", micro: "molecules" },
  { macro: "geotopes", micro: "biomolecules" },
  { macro: "biotopes", micro: "cells" },
  { macro: "creatures", micro: "organs" },
  { macro: "( collectives )", micro: "( awarenesses )" },
  { macro: "( cultures )", micro: "( abstractions )" },
] as const

/**
 * micro small —form-into-> large
 *    large composed of small
 *    (many awareness|perspective > form into abstraction)
 * macro small —form-within-> large
 *    large fosters small
 */

export function App() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        padding: "7% 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 60,
      }}
    >
      <div style={{ position: "relative" }}>
        <LayerNesting layers={LAYERS} height={400} />
        <You />
        <BigBloom />
        <Multiverse />
      </div>
      <div style={{ display: "none" }}>
        <LayerTable layers={LAYERS} />
      </div>
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
      className="verses"
      style={{
        padding: "10px 10px",
        margin: "0 0 10px",
        borderRadius: `${impact * 64 + 12}px`,
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
          padding: "0 5px",
          paddingBottom: index === 0 ? "1px" : "0px",
          lineHeight: "2.5em",
          display: "flex",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <div
          style={{
            minWidth: "150px",
            textAlign: "center",
          }}
        >
          {self.micro}
        </div>
        <div
          style={{
            minWidth: "150px",
            textAlign: "center",
          }}
        >
          {self.macro}
        </div>
      </div>
    </div>
  )
}

const You: FC = () => (
  <div className="you">
    <div className="arrow">▲</div>
    <div className="head">●</div>
    <div className="body">大</div>
  </div>
)

const BigBloom: FC = () => (
  <div className="big-bloom">
    <span>big bloom</span>
    <div className="line" />
  </div>
)

const Multiverse: FC = () => {
  const WIDTH = 1000
  const HEIGHT = 1200
  const verses = new Array(800).fill(null).map(() => ({
    x: Math.random() * WIDTH,
    y: Math.random() * HEIGHT,
    r: Math.random() * 75 + 0,
  }))
  return (
    <div
      style={{
        zIndex: "-1",
        position: "absolute",
        top: "-300px",
        left: "-200px",
        width: `${WIDTH - 200}px`,
        height: `${HEIGHT}px`,
      }}
    >
      {verses.map((verse, i) => (
        <div
          key={i}
          className="verse"
          style={{
            position: "absolute",
            top: `${verse.y}px`,
            left: `${verse.x}px`,
            width: `${verse.r}px`,
            height: `${verse.r}px`,
            zIndex: 1000 - verse.r,
          }}
        />
      ))}
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
