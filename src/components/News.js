import React from "react"
import { connect } from "react-redux"

import "./News.css"

function News({ who }) {
  return (
    <div className="news">
      {!!who && (
        <>
          <p>{who.title}</p>
          <div className="carousel-container">
            <div className="carousel">
              {who.items.map((item) => {
                const tokens = item.description.split(" ")
                const summary = `${tokens.slice(0, 40).join(" ")}${
                  tokens.length > 40 ? " ..." : ""
                }`
                return (
                  <div className="carousel-item" key={item.guid}>
                    <a href={item.link} target="_blank">
                      <i className="flaticon-out" />
                    </a>
                    <p className="item-title">{item.title}</p>
                    <p className="item-date">{item.pubDate}</p>
                    <p className="item-summary">{summary}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { who: state.news.who }
}

export default connect(mapStateToProps)(News)
