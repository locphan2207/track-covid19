import React from "react"

import "./Extra.css"

function Extra() {
  return (
    <div className="extra">
      <lottie-player
        src="https://assets5.lottiefiles.com/packages/lf20_nKCnOy.json"
        background="transparent"
        style={{ height: "200rem", width: "200rem" }}
        speed="1"
        loop
        autoplay
      ></lottie-player>
      <div className="author-box">
        <p className="author">
          Author:{" "}
          <a href="http://www.loc-phan.com" target="_blank">
            Tan Loc Phan
          </a>
        </p>
        <div className="underline"></div>
      </div>
    </div>
  )
}

export default Extra
