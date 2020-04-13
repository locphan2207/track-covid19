import React, { useEffect } from "react"
import { connect } from "react-redux"
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"

import { fetchCountryDataAllTime } from "redux/actions"

function Graph({ selected, fetchCountryDataAllTime, graphData }) {
  useEffect(() => {
    if (selected && selected["Slug"] && !graphData) {
      fetchCountryDataAllTime(selected["Slug"])
    }
  }, [selected])

  console.log(graphData)

  return (
    <LineChart width={200} height={200} data={graphData}>
      <Line type="monotone" dataKey="Confirmed" stroke="#8884d8" />
      <Line type="monotone" dataKey="Recovered" stroke="red" />
      <Line type="monotone" dataKey="Deaths" stroke="blue" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  )
}

const mapStateToProps = (state, props) => {
  const {
    selected: { Country },
  } = props
  return { graphData: state.graphData[Country] }
}

const mapDispatchToProps = { fetchCountryDataAllTime }

export default connect(mapStateToProps, mapDispatchToProps)(Graph)
