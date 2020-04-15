import React from "react"
import { connect } from "react-redux"

import "./Menu.css"

import { setTab } from "redux/actions"

const MENU_TABS = ["home", "newsfeed"]

function Menu({ tab, setTab }) {
  const handleOnclick = (clickedTab) => {
    if (tab !== clickedTab) setTab(clickedTab)
  }
  return (
    <div className="menu">
      <div className="menu-home">
        {MENU_TABS.map((t) => {
          const isCurrentTab = t === tab
          const bgStyle = isCurrentTab ? { backgroundColor: "#f9fcff" } : null
          const fontStyle = isCurrentTab ? { color: "#1a1053" } : null
          return (
            <div
              className="menu-item"
              key={t}
              onClick={() => handleOnclick(t)}
              style={bgStyle}
            >
              <i className={`flaticon-${t} icon`} style={fontStyle} />
              <h2 style={fontStyle}>{t.toUpperCase()}</h2>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { tab: state.tab.tab }
}

const mapDispatchToProps = { setTab }

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
