import { FC } from "react"
import { Simplex } from "./Simplex"

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
  "(collectives)",
  "((cultures))",
]

const MICRO = [
  "quantum foam",
  "particles",
  "atoms",
  "molecules",
  "biomolecules",
  "cells",
  "organs",
  "(awarenesses)",
  "((abstractions))",
]

const calcHue = (index: number, length: number) =>
  (index / (length + 1)) * 0.71 - 0.05

export const App: FC = () => {
  return (
    <div className="container">
      <div className="universe">
        <div className="title">
          {/* <div className="main">you are here / now</div> */}
          {/* <div className="sub">human complexity emergence</div> */}
        </div>
        <div className="nests">
          <LayerNest layers={MACRO} align="left" />
          <LayerNest layers={MICRO} align="right" />
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
      big bloom
      {/* <div className="left">big</div>
      <div className="right">bloom</div> */}
    </div>
    <div>
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

// https://www.youtube.com/watch?v=0nOtLj8UYCw
// experience, existence, qualia
// comprehension, meaning, consciousness
// free will

const cH = (i: number) => `${4.57 + 54.13 * i}deg`
const cS = "90%"
const cL = "82%"
const cA = "60%"
const COMPLEXITIES = [
  {
    n: 0,
    name: "emptiness",
    science: "spirituality",
    detail: "",
    dimension: "-1d",
    // A point is considered 0-dimensional,
    // a line segment is 1-dimensional,
    // and a square is 2-dimensional.
    // Following this pattern,
    // the entity below a 0D point
    // in the dimensional hierarchy
    // is defined as the null polytope,
    // which corresponds to the empty set.
    shape: "",
    color: `hsla(${cH(5)}, ${cS}, ${cL}, ${cA})`,
  },
  {
    n: 1,
    name: "existence",
    science: "philosophy",
    detail: "medium, fabric, potential",
    shape: "paths",
    color: `hsla(${cH(6)}, ${cS}, ${cL}, ${cA})`,
  },
  {
    n: 2,
    name: "energy",
    science: "physics",
    detail: "electric, magnetic, nuclear",
    shape: "waves",
    color: `hsla(${cH(0)}, ${cS}, ${cL}, ${cA})`,
  },
  {
    n: 3,
    name: "matter",
    science: "chemistry",
    detail: "atoms, molecules (elements, chemicals)",
    shape: "spirals",
    color: `hsla(${cH(1)}, ${cS}, ${cL}, ${cA})`,
  },
  {
    n: 4,
    name: "life",
    science: "biology",
    detail: "proteins, nucleic acids, cells",
    shape: "tangles",
    color: `hsla(${cH(2)}, ${cS}, ${cL}, ${cA})`,
  },
  {
    n: 5,
    name: "mind",
    science: "psychology",
    detail: "attention, recollection, prediction",
    // present, past, future
    // all spatial dimensions move through time
    // but mind reaches into time, instead of just moving through
    // witnessing present, remembering past, predicting future
    // 4th dimensional shape through time
    // |recording, playing, projecting|
    // ^ too ingrown? digital gear metaphors
    // being through time
    // network growth into past & future
    // decision/circumstance multiverse trees, possibilities
    // tree roots and branches
    // drawing strength, bearing fruit
    // 4d human mind trees, ( past > present < future )
    // present, past, future witness
    shape: "hidden\nvariables",
    color: `hsla(${cH(3)}, ${cS}, ${cL}, ${cA})`,
  },
  {
    n: 6,
    // name: "beyond",
    name: "?",
  },
  {
    n: 7,
    // name: "?",
  },
  {
    n: 8,
    // name: "?",
  },
  { n: 9 },
  { n: 10 },
  { n: 11 },
  { n: 12 },
  { n: 13 },
  { n: 14 },
  { n: 15 },
  { n: 16 },
  { n: 17 },
  { n: 18 },
  { n: 19 },
  { n: 20 },
  // { n: 11 },
  // { n: 101 },
  // { n: Infinity, name: "?" },
].reverse()

const Complexities: FC = () => {
  return (
    <div className="complexities">
      {COMPLEXITIES.map((c) => (
        <div
          key={c.n}
          className={`complexity ${c.name}`}
          style={{ background: c.color }}
        >
          <div className="side left">
            <div className="simplex">
              <Simplex n={Math.min(c.n, 100)} />
            </div>
            <div className={`dimension ${c.n === Infinity ? "infinity" : ""}`}>
              {c.n === Infinity ? "∞" : `${c.n - 1}D`}
            </div>
          </div>
          <div className="side right">
            {/* <div className="shape">{c.shape}</div> */}
            <div className="name">{c.name}</div>
            <div className="science">{c.science}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
