import React, { useEffect, useState } from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

const GEO_URL =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

function Map() {
  const [height, setHeight] = useState(200)

  useEffect(() => {
    const mapContainer = document.getElementById("map")
    const { width, height } = mapContainer.getBoundingClientRect()
    setHeight(height)
  }, [])

  return (
    <ComposableMap
      projection={"geoMercator"}
      height={height}
      projectionConfig={{ scale: height / 2.5 }}
    >
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
