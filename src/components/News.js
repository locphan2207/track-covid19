import React from "react"
import { connect } from "react-redux"

import "./News.css"

import Carousel from "./shared/Carousel"

function News({ who, cdc }) {
  return (
    <div className="news">
      <div className="inner-container">
        <Carousel data={who} />
        <Carousel data={cdc} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { who: state.news.who, cdc: state.news.cdc }
}

export default connect(mapStateToProps)(News)
