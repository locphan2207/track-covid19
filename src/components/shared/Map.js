import React, { useEffect, useState, useMemo } from "react"
import { connect } from "react-redux"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { scaleLinear } from "d3-scale"

const GEO_URL =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

function Map({ iso, countries }) {
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
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const isoCode = geo.properties.ISO_A2
            const color = countryColorMap[isoCode] || "#ffffff"
            return <Geography key={geo.rsmKey} geography={geo} fill={color} />
          })
        }
      </Geographies>
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
