import { combineReducers } from "redux"
import {
  SET_COUNTRIES,
  SET_SUMMARY,
  UPDATE_REQUEST_STATUS,
  ADD_GRAPH_DATA,
  SET_TAB,
  ADD_NEWS,
} from "./actions"

import { summary, countries } from "../data/summaryFactory"
import ISOMap from "../data/countryISOCode"

const initialCountries = countries
const countriesReducer = (state = initialCountries, action) => {
  switch (action.type) {
    case SET_COUNTRIES: {
      const countries = action.payload
      return { ...countries }
    }
    default:
      return state
  }
}

const initialSummary = summary
const summaryReducer = (state = initialSummary, action) => {
  switch (action.type) {
    case SET_SUMMARY: {
      const summary = action.payload
      return { ...summary }
    }
    default:
      return state
  }
}

const initialGraphData = {}
const graphDataReducer = (state = initialGraphData, action) => {
  switch (action.type) {
    case ADD_GRAPH_DATA: {
      const data = action.payload
      return { ...state, ...data }
    }
    default:
      return state
  }
}

const initialRequestStatuses = {}
const requestStatusReducer = (state = initialRequestStatuses, action) => {
  switch (action.type) {
    case UPDATE_REQUEST_STATUS: {
      const status = action.payload
      return { ...state, ...status }
    }
    default:
      return state
  }
}

const initialIso = ISOMap
const isoReducer = (state = initialIso) => {
  return state
}

const initialNews = {}
const newsReducer = (state = initialNews, action) => {
  switch (action.type) {
    case ADD_NEWS: {
      const news = action.payload
      return { ...state, ...news }
    }
    default:
      return state
  }
}

const initialTab = { tab: "newsfeed" }
const tabReducer = (state = initialTab, action) => {
  switch (action.type) {
    case SET_TAB: {
      const { tab } = action.payload
      return { tab: tab }
    }
    default:
      return state
  }
}

export default combineReducers({
  countries: countriesReducer,
  summary: summaryReducer,
  graphData: graphDataReducer,
  requestStatuses: requestStatusReducer,
  iso: isoReducer,
  news: newsReducer,
  tab: tabReducer,
})
