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
  "geotopes",
  "biotopes",
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

export const App: FC = () => {
  return (
    <div className="container">
      <div className="nests">
        <LayerNest layers={MICRO} align="left" />
        <LayerNest layers={MACRO} align="right" />
      </div>
    </div>
  )
}

const calcHue = (index: number, length: number) =>
  (index / length) * 0.67 - 0.06

const LayerNest: FC<{
  layers: string[]
  index?: number
  align: "left" | "right"
}> = ({ layers, index: index = 0, align }) => {
  const hue = calcHue(index, layers.length)
  const impact = (layers.length - index) / layers.length
  const exteriorRadius = `${impact * 74 + 12}px`
  const interiorRadius = `${impact * 20 + 20}px`
  return (
    <div
      className={`layer ${align}`}
      style={{
        background: `hsl(${hue}turn 60% 70%)`,
        borderRadius: exteriorRadius,
        ...(align === "left"
          ? { borderTopRightRadius: interiorRadius }
          : { borderTopLeftRadius: interiorRadius }),
      }}
    >
      <div
        className="curve"
        style={{
          boxShadow: `0 -50px 0 0 ${`hsl(${hue}turn 60% 70%)`}`,
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
          background: `hsl(${hue}turn 60% 70%)`,
          // border: `1px solid hsl(${hue}turn 60% 70%)`,
          position: "absolute",
          bottom: "10px",
          transform: `translateX(${align === "left" ? "" : "-"}${
            (layers.length - index) * 2.125
          }px)`,
        }}
      >
        {layers[index]}
      </div>
    </div>
  )
}
