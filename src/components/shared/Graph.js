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
  Text,
} from "recharts"

import {
  fetchCountryDataAllTime,
  fetchCountryDataOneMonth,
} from "redux/actions"

import Tick from "./Tick"
import LegendItem from "./LegendItem"

function Graph({
  selected,
  fetchCountryDataAllTime,
  fetchCountryDataOneMonth,
  graphData,
}) {
  useEffect(() => {
    if (selected && selected["Slug"] && !graphData) {
      //   fetchCountryDataAllTime(selected["Slug"])
      fetchCountryDataOneMonth(selected["Slug"])
    }
  }, [selected])

  const margin = { left: 60, top: 50, right: 0 }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={graphData || []} margin={margin}>
        <Line
          dot={false}
          type={"basisOpen"}
          dataKey="Confirmed"
          stroke="#f9345e"
          strokeWidth={3}
        />
        <Line
          dot={false}
          type={"basisOpen"}
          dataKey="Recovered"
          stroke="#1cb142"
          strokeWidth={3}
        />
        <Line
          dot={false}
          type={"basisOpen"}
          dataKey="Deaths"
          stroke="#6236ff"
          strokeWidth={3}
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
        />
        <Tooltip />
        <Legend wrapperStyle={{ top: 20, right: 0 }} content={<LegendItem />} />
        <Text />
      </LineChart>
    </ResponsiveContainer>
  )
}

const mapStateToProps = (state, props) => {
  const {
    selected: { Country },
  } = props
  return { graphData: state.graphData[Country] }
}

const mapDispatchToProps = { fetchCountryDataAllTime, fetchCountryDataOneMonth }

export default connect(mapStateToProps, mapDispatchToProps)(Graph)
