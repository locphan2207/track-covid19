import React, { useEffect } from "react"
import { connect } from "react-redux"

import "./App.css"

import { fetchCountries } from "redux/actions"

import Menu from "./components/Menu"
import Summary from "./components/Summary"
import Details from "./components/Details"
import Extra from "./components/Extra"

function App({ fetchCountries }) {
  useEffect(() => {
    fetchCountries()
  }, [])

  return (
    <div className="App">
      <Menu />
      <Summary />
      <Details />
      <Extra />
    </div>
  )
}

const mapDispatchToProps = { fetchCountries }

export default connect(null, mapDispatchToProps)(App)
