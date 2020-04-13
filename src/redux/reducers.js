import { combineReducers } from "redux"

import { SET_COUNTRIES, UPDATE_REQUEST_STATUS } from "./actions"

const initialCountries = {}
const countriesReducer = (state = initialCountries, action) => {
  switch (action.type) {
    case SET_COUNTRIES: {
      console.log(action.payload)
      const countries = action.payload
      return { ...countries }
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
  requestStatuses: requestStatusReducer,
})
