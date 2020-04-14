import React from "react"
import { connect } from "react-redux"

import "./Summary.css"

const getIncreasePercent = (newNum, totalNum) => {
  const oldNum = totalNum - newNum
  return `${Math.round((newNum / oldNum) * 100)}%`
}

function Summary({ summary }) {
  const {
    NewConfirmed: newConfirmed,
    TotalConfirmed: totalConfirmed,
    NewDeaths: newDeaths,
    TotalDeaths: totalDeaths,
    NewRecovered: newRecovered,
    TotalRecovered: totalRecovered,
  } = summary

  const totalActive = totalConfirmed - totalRecovered
  const newActive = newRecovered ? newConfirmed - newRecovered : 0

  return (
    <div className="summary">
      <div className="summary-card">
        <h3>Total</h3>
        <p>{totalConfirmed || "..."}</p>
        {newConfirmed && (
          <small>{getIncreasePercent(newConfirmed, totalConfirmed)}</small>
        )}
      </div>
      <div className="summary-card">
        <h3>Active</h3>
        <p>{totalActive || "..."}</p>
        {newActive && (
          <small>{getIncreasePercent(newActive, totalActive)}</small>
        )}
      </div>
      <div className="summary-card">
        <h3>Recovered</h3>
        <p>{totalRecovered || "..."}</p>
        {newRecovered && (
          <small>{getIncreasePercent(newRecovered, totalRecovered)}</small>
        )}
      </div>
      <div className="summary-card">
        <h3>Death</h3>
        <p>{totalDeaths || "..."}</p>
        {newDeaths && (
          <small>{getIncreasePercent(newDeaths, totalDeaths)}</small>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { summary: state.summary }
}

export default connect(mapStateToProps)(Summary)
