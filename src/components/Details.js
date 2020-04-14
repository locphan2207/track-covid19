import React, { useMemo, useState, useEffect, useRef } from "react"
import { connect } from "react-redux"

import "./Details.css"

import Graph from "./shared/Graph"
import Map from "./shared/Map"

function Details({ countries }) {
  const [selected, setSelected] = useState({
    Country: "",
    CountryCode: "",
    Slug: "",
    NewConfirmed: 0,
    TotalConfirmed: 0,
    NewDeaths: 0,
    TotalDeaths: 0,
    NewRecovered: 0,
    TotalRecovered: 0,
    Date: "",
  })

  const sortedCountries = useMemo(() => sortCountries(countries), [countries])

  useEffect(() => {
    if (!selected["Country"] && sortedCountries.length) {
      setSelected(sortedCountries[0])
    }
  }, [sortedCountries])

  return (
    <div className="details">
      <div className="inner-container">
        <div className="search">
          <input type="text" placeholder="Search Country" />
        </div>
        <div className="list-container">
          <div className="list">
            {Object.values(sortedCountries).map((country) => {
              const onClick = () => {
                setSelected(country)
              }
              const shortName = country["Country"]
                .split(" ")
                .slice(0, 2)
                .join(" ")
              const isSelected = selected.Slug === country.Slug
              return (
                <div
                  id={`list-id-${country["Slug"]}`}
                  className="list-item"
                  key={country["Slug"]}
                  onClick={onClick}
                  style={isSelected ? { backgroundColor: "#edeffd" } : null}
                >
                  <p className="list-case-num">{country["TotalConfirmed"]}</p>
                  <p className="list-name">{shortName}</p>
                </div>
              )
            })}
          </div>
        </div>
        {/* <div className="info">
          {titleToValue.map((item) => (
            <div className="info-item" key={item[1]}>
              <h6>{item[1]}</h6>
              <p style={item[2] ? { color: item[2] } : null}>
                {item[0] === "Date"
                  ? new Date(selected[item[0]]).toDateString()
                  : selected[item[0]]}
              </p>
            </div>
          ))}
        </div> */}
        <div className="map">
          <Map />
        </div>
        <div id="graph" className="graph">
          <p className="graph-title">Logarithmic</p>
          <Graph selected={selected} />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { countries: state.countries }
}

export default connect(mapStateToProps)(Details)

const sortCountries = (countries) => {
  const arr = Object.values(countries)
  arr.sort((a, b) => {
    return b["TotalConfirmed"] - a["TotalConfirmed"]
  })
  return arr
}

const titleToValue = [
  ["Country", "Country"],
  ["TotalConfirmed", "Total Confirmed", "#f9345e"],
  ["TotalRecovered", "Total Recovered", "#1cb142"],
  ["TotalDeaths", "Total Death", "#6236ff"],
  ["NewConfirmed", "New Confirmed", "#f9345e"],
  ["NewRecovered", "New Recovered", "#1cb142"],
  ["NewDeaths", "New Death", "#6236ff"],
  ["Date", "Updated"],
]
