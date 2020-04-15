import React from "react"
import { connect } from "react-redux"

import "./News.css"

import Carousel from "./shared/Carousel"

function News({ who, cdc, press }) {
  return (
    <div className="news">
      <div className="inner-container">
        <Carousel data={who} />
        <Carousel data={cdc} />
        <Carousel data={press} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { who, cdc, press } = state.news
  return { who, cdc, press }
}

export default connect(mapStateToProps)(News)
