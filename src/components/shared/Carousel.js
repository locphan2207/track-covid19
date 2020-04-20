import React from "react"

import "./Carousel.css"

function Carousel({ data }) {
  if (!data || !data.items.length) return null
  return (
    <>
      <p className="carousel-title">{data.title}</p>
      <div className="carousel-container">
        <div className="carousel">
          {data.items.map((item, idx) => {
            const titleTokens = item.title ? item.title.split(" ") : []
            const title = `${titleTokens.slice(0, 15).join(" ")}${
              titleTokens.length > 15 ? " ..." : ""
            }`
            const tokens = item.description.split(" ")
            const summary = `${tokens.slice(0, 30).join(" ")}${
              tokens.length > 30 ? " ..." : ""
            }`
            return (
              <div className="carousel-item" key={item.guid + idx}>
                <a href={item.link} target="_blank" className="item-link-icon">
                  <i className="flaticon-out" />
                </a>
                <div className="item-content">
                  <p className="item-title">{title}</p>
                  <p className="item-date">{item.pubDate}</p>
                  <p className="item-summary">{summary}</p>
                </div>
                <a href={item.link} target="_blank" className="item-link">
                  More
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Carousel
