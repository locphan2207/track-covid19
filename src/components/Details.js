import React, { useMemo, useState } from "react"
import { connect } from "react-redux"

import "./Details.css"

const sortCountries = (countries) => {
  const arr = Object.values(countries)
  arr.sort((a, b) => {
    return b["TotalConfirmed"] - a["TotalConfirmed"]
  })
  return arr
}

function Details({ countries }) {
  const [selected, setSelected] = useState({
    Country: "...",
    CountryCode: "...",
    Slug: "...",
    NewConfirmed: 0,
    TotalConfirmed: 0,
    NewDeaths: 0,
    TotalDeaths: 0,
    NewRecovered: 0,
    TotalRecovered: 0,
    Date: "",
  })
  const sortedCountries = useMemo(() => sortCountries(countries), [countries])
  console.log(selected)
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
              return (
                <div
                  className="list-item"
                  key={country["Slug"]}
                  onClick={onClick}
                >
                  <p className="list-case-num">{country["TotalConfirmed"]}</p>
                  <p className="list-name">{country["Country"]}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div className="info">
          <h6>Total Confirmed</h6>
          <p>{selected["TotalConfirmed"]}</p>
          <h6>Total Recovered</h6>
          <p>{selected["TotalRecovered"]}</p>
          <h6>Total Death</h6>
          <p>{selected["TotalDeaths"]}</p>
          <h6>New Confirmed</h6>
          <p>{selected["NewConfirmed"]}</p>
          <h6>New Recovered</h6>
          <p>{selected["NewRecovered"]}</p>
          <h6>New Death</h6>
          <p>{selected["NewDeaths"]}</p>
        </div>
        <div className="graph">
          <h6>Total Confirmed</h6>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return { countries: state.countries }
}

export default connect(mapStateToProps)(Details)
