import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"

import "./Details.css"

import Graph from "./shared/Graph"
import Map from "./shared/Map"

import { getShortName } from "./helpers"

function Details({ countries }) {
  const searchInput = useRef(null)

  const [countryList, setCountryList] = useState([])
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

  useEffect(() => {
    setCountryList(sortCountries(countries))
  }, [countries])

  const handleSearchInput = () => {
    setCountryList(sortCountries(countries, searchInput.current.value))
  }

  useEffect(() => {
    if (!selected["Country"] && countryList.length) {
      setSelected(countryList[0])
    }
  }, [countryList, selected])

  return (
    <div className="details">
      <div className="inner-container">
        <div className="search">
          <input
            ref={searchInput}
            type="text"
            placeholder="Search Country"
            onKeyDown={handleSearchInput}
          />
        </div>
        <div className="list-container">
          <div className="list">
            {Object.values(countryList).map((country) => {
              const onClick = () => {
                setSelected(country)
              }

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
                  <p className="list-name">
                    {getShortName(country["Country"])}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
        <div id="map" className="map">
          <Map countrySlug={selected.Slug} />
        </div>
        <div id="graph" className="graph">
          <p className="graph-title">Logarithmic</p>
          <Graph countrySlug={selected.Slug} />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { countries: state.countries }
}

export default connect(mapStateToProps)(Details)

const sortCountries = (countries, searchKey = "") => {
  let arr = []

  if (!searchKey || searchKey === " ") {
    arr = Object.values(countries)
  } else {
    const searchRegex = new RegExp(searchKey, "i")
    for (const country of Object.values(countries)) {
      const searchResult = country.Country.search(searchRegex)
      console.log(searchRegex, searchResult)
      if (searchResult > -1) arr.push(country)
    }
  }

  arr.sort((a, b) => {
    return b["TotalConfirmed"] - a["TotalConfirmed"]
  })
  return arr
}
