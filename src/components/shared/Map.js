import React from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

const GEO_URL =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

function Map() {
  return (
    <ComposableMap projection={"geoMercator"}>
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
    </ComposableMap>
  )
}

export default Map
