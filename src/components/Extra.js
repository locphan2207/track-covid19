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
    </div>
  )
}

export default Extra
