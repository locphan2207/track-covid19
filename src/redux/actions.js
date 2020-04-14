import {
  fetchCountriesRequest,
  fetchCountryDataAllTimeRequest,
  fetchCountryDataOneMonthRequest,
} from "../api"

export const SET_COUNTRIES = "SET_COUNTRIES"
export const UPDATE_COUNTRIES = "UPDATE_COUNTRIES"
export const SET_SUMMARY = "SET_SUMMARY"
export const ADD_GRAPH_DATA = "ADD_GRAPH_DATA"
export const UPDATE_REQUEST_STATUS = "UPDATE_REQUEST_STATUS"

export const setCountries = (countries) => {
  return {
    type: SET_COUNTRIES,
    payload: {
      ...countries,
    },
  }
}

export const updateCountries = (country) => {
  return {
    type: UPDATE_COUNTRIES,
    payload: {
      [country.name]: country,
    },
  }
}

export const setSummary = (summary) => {
  return {
    type: SET_SUMMARY,
    payload: {
      ...summary,
    },
  }
}

export const updateRequestStatus = (status) => {
  return {
    type: UPDATE_REQUEST_STATUS,
    payload: {
      ...status,
    },
  }
}

export const addGraphData = (data) => {
  return {
    type: ADD_GRAPH_DATA,
    payload: {
      ...data,
    },
  }
}

export const fetchCountries = () => async (dispatch) => {
  dispatch(updateRequestStatus({ fetchCountries: { loading: true } }))

  const responseJson = await fetchCountriesRequest()
  const countriesObj = {}
  for (const country of responseJson["Countries"]) {
    countriesObj[country["Slug"]] = country
  }

  dispatch(updateRequestStatus({ fetchCountries: { loading: false } }))
  dispatch(setCountries(countriesObj))
  dispatch(setSummary(responseJson["Global"]))
}

export const fetchCountryDataAllTime = (countrySlug) => async (dispatch) => {
  dispatch(updateRequestStatus({ fetchCountryDataAllTime: { loading: true } }))

  const responseJson = await fetchCountryDataAllTimeRequest(countrySlug)
  const dataArray = []
  for (const idx in responseJson) {
    dataArray.push(responseJson[idx])
  }
  const countryName = dataArray[0]["Country"]
  dispatch(updateRequestStatus({ fetchCountryDataAllTime: { loading: false } }))
  dispatch(addGraphData({ [countryName]: dataArray }))
}

export const fetchCountryDataOneMonth = (countrySlug) => async (dispatch) => {
  dispatch(updateRequestStatus({ fetchCountryDataOneMonth: { loading: true } }))

  const responseJson = await fetchCountryDataOneMonthRequest(countrySlug)
  const dataArray = []
  for (const idx in responseJson) {
    dataArray.push(responseJson[idx])
  }
  const countryName = dataArray[0]["Country"]
  dispatch(
    updateRequestStatus({ fetchCountryDataOneMonth: { loading: false } })
  )
  dispatch(addGraphData({ [countryName]: dataArray }))
}
