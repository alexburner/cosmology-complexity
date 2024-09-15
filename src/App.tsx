import { FC } from "react"

/**
 * micro small —form-into-> large
 *    large composed of small
 *    (many awareness|perspective > form into abstraction)
 * macro small —form-within-> large
 *    large fosters small
 */

const MACRO = [
  "cosmic web",
  "galaxies",
  "stars",
  "planets",
  "geomes",
  "biomes",
  "creatures",
  "( collectives )",
  "( cultures )",
]

const MICRO = [
  "quantum realm",
  "particles",
  "atoms",
  "molecules",
  "biomolecules",
  "cells",
  "organs",
  "( awarenesses )",
  "( abstractions )",
]

const calcHue = (index: number, length: number) =>
  (index / length) * 0.67 - 0.06

export const App: FC = () => {
  return (
    <div className="container">
      <div className="universe">
        <div className="nests">
          <LayerNest layers={MICRO} align="left" />
          <LayerNest layers={MACRO} align="right" />
        </div>
        <You />
        <BigBloom />
        <Complexities />
      </div>
    </div>
  )
}

const You: FC = () => (
  <div className="you">
    <div className="head">●</div>
    <div className="body">大</div>
  </div>
)

const BigBloom: FC = () => (
  <div className="big-bloom">
    <span>big bloom</span>
    {new Array(48).fill(null).map((_, i, l) => (
      <div
        key={i}
        className="raybox"
        style={{ rotate: `${360 * (i / l.length)}deg` }}
      >
        <div className="ray" />
      </div>
    ))}
  </div>
)

const LayerNest: FC<{
  layers: string[]
  index?: number
  align: "left" | "right"
}> = ({ layers, index: index = 0, align }) => {
  const hue = calcHue(index, layers.length)
  const depthImpact = (layers.length - index) / layers.length
  const exteriorRadius = `${depthImpact * 100 + 12}px`
  const interiorRadius = `${depthImpact * 20 + 20}px`
  return (
    <div
      className={`layer ${align} i-${index}`}
      style={{
        background: `hsl(${hue}turn 60% 70%)`,
        borderRadius: exteriorRadius,
        ...(align === "left"
          ? { borderTopRightRadius: interiorRadius }
          : { borderTopLeftRadius: interiorRadius }),
      }}
    >
      <div
        className="curve bottom"
        style={{
          boxShadow: `0 -50px 0 0 ${`hsl(${hue}turn 60% 70%)`}`,
          ...(align === "left"
            ? { borderTopRightRadius: interiorRadius }
            : { borderTopLeftRadius: interiorRadius }),
        }}
      />
      <div
        className="curve top"
        style={{
          ...(align === "left"
            ? { borderTopRightRadius: interiorRadius }
            : { borderTopLeftRadius: interiorRadius }),
        }}
      />
      {index < layers.length - 1 && (
        <LayerNest layers={layers} index={index + 1} align={align} />
      )}
      {/* invisible label placeholder */}
      <div className="label" style={{ opacity: 0 }}>
        {layers[index]}
      </div>
      {/* visible label: absolute to sit above curves */}
      <div
        className="label"
        style={{
          position: "absolute",
          bottom: "10px",
          transform: `translateX(${align === "left" ? "" : "-"}${
            (layers.length - index) * 4
          }px)`,
        }}
      >
        {layers[index]}
      </div>
    </div>
  )
}

const cS = "99%"
const cL = "92%"
const COMPLEXITIES = [
  {
    name: "existence",
    science: "philosophy",
    detail: "medium, fabric, potential",
    dimension: "0d",
    shape: "paths",
    color: `hsl(311.09deg ${cS} ${cL})`,
  },
  {
    name: "energy",
    science: "physics",
    detail: "electric, magnetic, nuclear",
    dimension: "1d",
    shape: "waves",
    color: `hsl(4.57deg ${cS} ${cL})`,
  },
  {
    name: "matter",
    science: "chemistry",
    detail: "atoms, molecules (elements, chemicals)",
    dimension: "2d",
    shape: "spirals",
    color: `hsl(58.7deg ${cS} ${cL})`,
  },
  {
    name: "life",
    science: "biology",
    detail: "proteins, nucleic acids, cells",
    dimension: "3d",
    shape: "tangles",
    color: `hsl(112.83deg ${cS} ${cL})`,
  },
  {
    name: "mind",
    science: "psychology",
    detail: "attention, recollection, prediction",
    dimension: "4d",
    shape: "hidden\nvariables",
    color: `hsl(166.15deg ${cS} ${cL})`,
  },
].reverse()

const Complexities: FC = () => {
  return (
    <div className="complexities">
      <div className="complexity beyond">
        <div className="side prose">
          <div className="name">beyond</div>
        </div>
      </div>
      {COMPLEXITIES.map((c) => (
        <div
          key={c.name}
          className={`complexity ${c.name}`}
          style={{
            background: c.color,
            boxShadow: `1px 1px 12px 19px ${c.color}`,
          }}
        >
          <div className="side prose">
            <div className="name">{c.name}</div>
            <div className="science">{c.science}</div>
          </div>
          <div className="side poetry">
            <div className="dimension">{c.dimension}</div>
            <div className="shape">{c.shape}</div>
          </div>
        </div>
      ))}
      <div className="complexity nothing">
        <div className="side prose">
          <div className="name">nothing</div>
        </div>
      </div>
    </div>
  )
}
