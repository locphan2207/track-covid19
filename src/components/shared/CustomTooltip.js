import React from "react"

import "./CustomTooltip.css"

import { parseDateForXAxis } from "./Tick"

import { getShortName } from "../helpers"

function CustomTooltip({ payload, country }) {
  if (!payload || !payload.length) return null
  return (
    <div className="tooltip">
      <p className="tooltip-country">
        {getShortName(payload[0].payload.Country)}
      </p>
      <p className="tooltip-date">
        {parseDateForXAxis(payload[0].payload.Date)}
      </p>
      {payload.map((item) => {
        return (
          <div className="tooltip-item" key={item.name}>
            <p className="tooltip-item-key">{item.name}</p>
            <p className="tooltip-item-value" style={{ color: item.color }}>
              {item.value}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default CustomTooltip
