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
  "physiotopes",
  "autotrophs",
  "heterotrophs",
  "collectives",
  "cultures",
]

const MICRO = [
  "quantum realm",
  "particles",
  "atoms",
  "molecules",
  "biomolecules",
  "cells",
  "organs",
  "awarenesses",
  "abstractions",
]

const calcHue = (index: number, length: number) =>
  (index / (length + 1)) * 0.75 - 0.06

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
    <div className="labels">
      <div className="left">big</div>
      <div className="right">bloom</div>
    </div>
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

const cS = "90%"
const cL = "82%"
const cA = "60%"
const COMPLEXITIES = [
  {
    name: "existence",
    science: "philosophy",
    detail: "medium, fabric, potential",
    dimension: "0d",
    shape: "paths",
    color: `hsla(311.09deg, ${cS}, ${cL}, ${cA})`,
  },
  {
    name: "energy",
    science: "physics",
    detail: "electric, magnetic, nuclear",
    dimension: "1d",
    shape: "waves",
    color: `hsla(4.57deg, ${cS}, ${cL}, ${cA})`,
  },
  {
    name: "matter",
    science: "chemistry",
    detail: "atoms, molecules (elements, chemicals)",
    dimension: "2d",
    shape: "spirals",
    color: `hsla(58.7deg, ${cS}, ${cL}, ${cA})`,
  },
  {
    name: "life",
    science: "biology",
    detail: "proteins, nucleic acids, cells",
    dimension: "3d",
    shape: "tangles",
    color: `hsla(112.83deg, ${cS}, ${cL}, ${cA})`,
  },
  {
    name: "mind",
    science: "psychology",
    detail: "attention, recollection, prediction",
    dimension: "4d",
    shape: "hidden\nvariables",
    color: `hsla(166.15deg, ${cS}, ${cL}, ${cA})`,
  },
].reverse()

const Complexities: FC = () => {
  return (
    <div className="complexities">
      <div className="complexity beyond">
        <div className="side left">
          <div className="name">beyond</div>
        </div>
        <div className="side right">
          {/* <div className="science">spirituality</div> */}
        </div>
      </div>
      {COMPLEXITIES.map((c, i, l) => (
        <div
          key={c.name}
          className={`complexity ${c.name}`}
          style={{
            background: c.color,
            // boxShadow: `1px 1px 12px 19px ${c.color}`,
          }}
        >
          <div className="side left">
            <div className="name">{`${l.length - i - 1}d — ${c.name}`}</div>
          </div>
          <div className="side right">
            {/* <div className="dimension">{c.dimension}</div>
            <div className="shape">{c.shape}</div> */}
            <div className="science">{c.science}</div>
          </div>
        </div>
      ))}
      <div className="complexity nothing">
        <div className="side left">
          <div className="name">nothing</div>
        </div>
        <div className="side right">
          {/* <div className="science">spirituality</div> */}
        </div>
      </div>
    </div>
  )
}
