import { fetchCountriesRequest } from "../api"

export const SET_COUNTRIES = "SET_COUNTRIES"
export const UPDATE_COUNTRIES = "UPDATE_COUNTRIES"
export const UPDATE_REQUEST_STATUS = "UPDATE_REQUEST_STATUS"

export const setCountries = (countries) => {
  return {
    type: SET_COUNTRIES,
    payload: {
      countries,
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

export const updateRequestStatus = (status) => {
  return {
    type: UPDATE_REQUEST_STATUS,
    payload: {
      status,
    },
  }
}

export const fetchCountries = () => async (dispatch) => {
  dispatch(updateRequestStatus({ ["fetchCountries"]: { loading: true } }))
  const responseJson = await fetchCountriesRequest()
  const countriesObj = {}
  for (const country of responseJson["Countries"]) {
    countriesObj[country["Slug"]] = country
  }
  dispatch(updateRequestStatus({ ["fetchCountries"]: { loading: false } }))
  dispatch(setCountries(countriesObj))
}
