import React, { useMemo, useState, useEffect } from "react"
import { connect } from "react-redux"

import "./Details.css"

import Graph from "./shared/Graph"

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
    if (!selected["Country"]) {
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
              return (
                <div
                  className="list-item"
                  key={country["Slug"]}
                  onClick={onClick}
                >
                  <p className="list-case-num">{country["TotalConfirmed"]}</p>
                  <p className="list-name">{shortName}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div className="info">
          {titleToValue.map((item) => (
            <div className="info-item" key={item[1]}>
              <h6>{item[1]}</h6>
              <p>{selected[item[0]]}</p>
            </div>
          ))}
        </div>
        <div className="graph">
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
  ["TotalConfirmed", "Total Confirmed"],
  ["TotalRecovered", "Total Recovered"],
  ["TotalDeaths", "Total Death"],
  ["NewConfirmed", "New Confirmed"],
  ["NewRecovered", "New Recovered"],
  ["NewDeaths", "New Death"],
  ["Date", "Updated"],
]
