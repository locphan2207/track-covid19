import React, { useEffect } from "react"
import { connect } from "react-redux"

import "./App.css"

import { fetchCountries } from "redux/actions"

import Header from "./components/Header"
import Menu from "./components/Menu"
import Summary from "./components/Summary"
import Details from "./components/Details"
import Extra from "./components/Extra"
import News from "./components/News"

function App({ tab, fetchCountries }) {
  useEffect(() => {
    fetchCountries()
  }, [fetchCountries])

  return (
    <div className={`App ${tab}`}>
      <Menu />
      <Header />
      {tab === "home" ? (
        <>
          <Summary />
          <Details />
          <Extra />
        </>
      ) : (
        <News />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { tab: state.tab.tab }
}

const mapDispatchToProps = { fetchCountries }

export default connect(mapStateToProps, mapDispatchToProps)(App)
