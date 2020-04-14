import React from "react"

import "./Tick.css"

const Y_OFFSET = 20 // space between axis and tick

function Tick(props) {
  const { x, y, payload, textAnchor, type, axisType } = props
  const value =
    type === "date"
      ? parseDateForXAxis(payload.value)
      : parseNumForYAxis(payload.value)
  const transform =
    axisType === "x"
      ? `translate(${x},${y + Y_OFFSET})`
      : `translate(${x},${y})`
  return (
    <g transform={transform}>
      <text className="tick-value-text" textAnchor={textAnchor}>
        {value}
      </text>
    </g>
  )
}

export default Tick

//Helpers
const parseDateForXAxis = (dateStr) => {
  const date = new Date(dateStr)
  return `${monthToStr[date.getMonth() + 1]} ${date.getDate()}`
}

const monthToStr = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
}

const parseNumForYAxis = (num) => {
  const oneMil = 1000000
  const oneK = 1000
  const value =
    num > oneMil
      ? `${Math.round(num / oneMil)}M`
      : num > oneK
      ? `${Math.round(num / oneK)}K`
      : num
  return value
}
