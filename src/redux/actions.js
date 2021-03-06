import {
  fetchCountriesRequest,
  fetchCountryDataAllTimeRequest,
  fetchCountryDataOneMonthRequest,
  fetchWhoRssRequest,
  fetchCdcRssRequest,
  fetchPressRequest,
} from "../api"

import { xmlToNewsObject } from "helpers"

export const SET_COUNTRIES = "SET_COUNTRIES"
export const UPDATE_COUNTRIES = "UPDATE_COUNTRIES"
export const SET_SUMMARY = "SET_SUMMARY"
export const ADD_GRAPH_DATA = "ADD_GRAPH_DATA"
export const UPDATE_REQUEST_STATUS = "UPDATE_REQUEST_STATUS"
export const SET_TAB = "SET_TAB"
export const ADD_NEWS = "ADD_NEWS"

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

export const addNews = (news) => {
  return {
    type: ADD_NEWS,
    payload: {
      ...news,
    },
  }
}

export const setTab = (tab) => {
  return {
    type: SET_TAB,
    payload: {
      tab,
    },
  }
}

// ------------------------- ASYNC ACTIONS --------------------------------
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
  dispatch(updateRequestStatus({ fetchCountryDataAllTime: { loading: false } }))
  dispatch(addGraphData({ [countrySlug]: dataArray }))
}

export const fetchCountryDataOneMonth = (countrySlug) => async (dispatch) => {
  dispatch(updateRequestStatus({ fetchCountryDataOneMonth: { loading: true } }))

  const responseJson = await fetchCountryDataOneMonthRequest(countrySlug)

  const today = new Date()
  today.setHours(0, 0, 0)
  const monthAgo = new Date(today.toUTCString())
  monthAgo.setMonth(monthAgo.getMonth() - 1)

  const filtered = []
  for (const item of responseJson) {
    const date = new Date(item.Date)
    if (date >= monthAgo && date <= today) {
      filtered.push({
        Country: item.Country,
        Confirmed: item.Confirmed,
        Recovered: item.Confirmed,
        Deaths: item.Deaths,
        Date: item.Date,
      })
    }
  }

  dispatch(
    updateRequestStatus({ fetchCountryDataOneMonth: { loading: false } })
  )
  dispatch(addGraphData({ [countrySlug]: filtered }))
}

export const fetchWhoRss = () => async (dispatch) => {
  dispatch(updateRequestStatus({ fetchWhoRss: { loading: true } }))

  const response = await fetchWhoRssRequest()

  dispatch(updateRequestStatus({ fetchWhoRss: { loading: false } }))
  dispatch(addNews({ who: xmlToNewsObject(response) }))
}

export const fetchCdcRss = () => async (dispatch) => {
  dispatch(updateRequestStatus({ fetchCdcRss: { loading: true } }))

  const response = await fetchCdcRssRequest()

  dispatch(updateRequestStatus({ fetchCdcRss: { loading: false } }))
  dispatch(addNews({ cdc: xmlToNewsObject(response) }))
}

export const fetchPress = () => async (dispatch) => {
  dispatch(updateRequestStatus({ fetchPress: { loading: true } }))

  const response = await fetchPressRequest()
  const title = "On the press"
  const items = response.map((item) => ({
    title: item.title,
    link: item.url,
    description: `Publication: ${item.publication || ""} - Author: ${
      item.author || ""
    }`,
    pubDate: item.publishDate,
    guid: item.url,
  }))

  dispatch(updateRequestStatus({ fetchPress: { loading: false } }))
  dispatch(addNews({ press: { title, items } }))
}
