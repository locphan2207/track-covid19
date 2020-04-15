import {
  fetchCountriesRequest,
  fetchCountryDataAllTimeRequest,
  fetchCountryDataOneMonthRequest,
  fetchWhoRssRequest,
  fetchCdcRssRequest,
} from "../api"

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

  const parser = new window.DOMParser()
  const xml = parser.parseFromString(response, "text/xml")
  const title = xml.getElementsByTagName("title")[0].innerHTML
  const data = xml.getElementsByTagName("item")
  const items = []
  for (let i = 0; i < data.length; i++) {
    const element = data[i]
    const item = {}
    for (let j = 0; j < element.children.length; j++) {
      const elInfo = element.children[j]
      item[elInfo.tagName] = elInfo.innerHTML
    }
    items.push(item)
  }

  dispatch(updateRequestStatus({ fetchWhoRss: { loading: false } }))
  dispatch(addNews({ who: { title, items } }))
}

export const fetchCdcRss = () => async (dispatch) => {
  dispatch(updateRequestStatus({ fetchCdcRss: { loading: true } }))

  const response = await fetchCdcRssRequest()

  const parser = new window.DOMParser()
  const xml = parser.parseFromString(response, "text/xml")
  const title = xml.getElementsByTagName("title")[0].innerHTML
  const data = xml.getElementsByTagName("item")
  const items = []
  for (let i = 0; i < data.length; i++) {
    const element = data[i]
    const item = {}
    for (let j = 0; j < element.children.length; j++) {
      const elInfo = element.children[j]
      item[elInfo.tagName] = elInfo.innerHTML
    }
    items.push(item)
  }

  dispatch(updateRequestStatus({ fetchCdcRss: { loading: false } }))
  dispatch(addNews({ cdc: { title, items } }))
}
