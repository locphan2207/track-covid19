import React, { useEffect, useState, useMemo } from "react"
import { connect } from "react-redux"
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
  ZoomableGroup,
} from "react-simple-maps"
import { scaleLinear } from "d3-scale"

import "./Map.css"

import { getShortName } from "../helpers"

const GEO_URL =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

function Map({ iso, countries, countrySlug }) {
  const [height, setHeight] = useState(200)

  const countryColorMap = useMemo(() => getCountryColor(countries, iso), [
    iso,
    countries,
  ])

  useEffect(() => {
    const mapContainer = document.getElementById("map")
    const { height } = mapContainer.getBoundingClientRect()
    setHeight(height)
  }, [])
  return (
    <ComposableMap
      projection={"geoMercator"}
      height={height}
      projectionConfig={{ scale: height / 4 }}
    >
      <ZoomableGroup zoom={2} minZoom={1} maxZoom={4}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isoCode = geo.properties.ISO_A2
              const color = countryColorMap[isoCode] || "#ffffff"
              return <Geography key={geo.rsmKey} geography={geo} fill={color} />
            })
          }
        </Geographies>
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isoCode = geo.properties.ISO_A2
              const { coordinates } = geo.geometry
              if (iso[countrySlug].ISO2 !== isoCode || !coordinates.length) {
                return null
              }
              // If selected country
              let curr = coordinates
              while (Array.isArray(curr[0][0])) {
                curr = [...curr[0]]
              }
              curr = curr[Math.round(curr.length / 2)]
              return (
                <Annotation
                  key={geo.rsmKey}
                  subject={curr}
                  dx={10}
                  dy={0}
                  connectorProps={{
                    stroke: "#9a7ffd",
                    strokeWidth: 1,
                    strokeLinecap: "round",
                  }}
                >
                  <g>
                    <rect className="map-text-box" rx={2} ry={2} />
                    <text className="map-text">
                      {getShortName(countries[countrySlug].Country)}
                    </text>
                    <text className="map-case">Case: </text>
                    <text className="map-num">
                      {countries[countrySlug].TotalConfirmed}
                    </text>
                  </g>
                </Annotation>
              )
            })
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  )
}

const mapStateToProps = (state) => {
  return {
    iso: state.iso,
    countries: state.countries,
  }
}

export default connect(mapStateToProps)(Map)

const colorScale = scaleLinear().domain([1, 200000]).range(["#ffffff", "red"])

const getCountryColor = (countries, iso) => {
  const countryColor = {}
  for (const countrySlug in countries) {
    const iso2 = iso[countrySlug].ISO2
    const color = colorScale(countries[countrySlug].TotalConfirmed)
    countryColor[iso2] = color
  }
  return countryColor
}
