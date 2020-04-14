import React from "react"

import "./LegendItem.css"

function LegendItem({ payload }) {
  return (
    <div className="legend">
      {payload.map((entry) => {
        return (
          <div className="legend-item" key={entry.value}>
            <div className="legend-icon">
              <div style={{ backgroundColor: getColor(entry.value) }}></div>
            </div>
            <p className="legend-text">{entry.value}</p>
          </div>
        )
      })}
    </div>
  )
}

export default LegendItem

const getColor = (type) => {
  switch (type) {
    case "Confirmed":
      return "#f9345e"
    case "Recovered":
      return "#1cb142"
    default:
      return "#6236ff"
  }
}
