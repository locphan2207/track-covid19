import React, { useEffect } from "react"
import { connect } from "react-redux"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"

import {
  fetchCountryDataAllTime,
  fetchCountryDataOneMonth,
} from "redux/actions"

import Tick from "./Tick"
import LegendItem from "./LegendItem"
import CustomTooltip from "./CustomTooltip"

function Graph({
  countrySlug,
  fetchCountryDataAllTime,
  fetchCountryDataOneMonth,
  graphData,
}) {
  useEffect(() => {
    if (countrySlug && !graphData.length) {
      fetchCountryDataAllTime(countrySlug)
      //   fetchCountryDataOneMonth(countrySlug)
    }
  }, [countrySlug])

  const margin = { left: 60, top: 70, right: 20, bottom: 0 }
  return (
    <ResponsiveContainer height="95%" debounce={1}>
      <LineChart data={graphData} margin={margin}>
        <Line
          dot={false}
          type={"basisOpen"}
          dataKey="Confirmed"
          stroke="#f9345e"
          strokeWidth={3}
          isAnimationActive={true}
        />
        <Line
          dot={false}
          type={"basisOpen"}
          dataKey="Recovered"
          stroke="#1cb142"
          strokeWidth={3}
          isAnimationActive={true}
        />
        <Line
          dot={false}
          type={"basisOpen"}
          dataKey="Deaths"
          stroke="#6236ff"
          strokeWidth={3}
          isAnimationActive={true}
        />
        <XAxis
          width={1}
          dataKey={"Date"}
          tickLine={false}
          tick={<Tick type={"date"} axisType="x" />}
          minTickGap={40}
        />
        <YAxis
          width={1}
          dataKey={"Confirmed"}
          tickLine={false}
          minTickGap={40}
          tick={<Tick type={"number"} axisType="y" />}
        ></YAxis>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ top: "20rem", right: 0 }}
          content={<LegendItem />}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

const mapStateToProps = (state, { countrySlug }) => {
  return { graphData: state.graphData[countrySlug] || [] }
}

const mapDispatchToProps = { fetchCountryDataAllTime, fetchCountryDataOneMonth }

export default connect(mapStateToProps, mapDispatchToProps)(Graph)
