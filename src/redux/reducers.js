import { combineReducers } from "redux"
import { SET_COUNTRIES, SET_SUMMARY, UPDATE_REQUEST_STATUS } from "./actions"
import data from "../data/factory"

const initialCountries = data["Countries"] //{}
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

const initialSummary = data["Global"] //{}
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

export default combineReducers({
  countries: countriesReducer,
  summary: summaryReducer,
  requestStatuses: requestStatusReducer,
})
