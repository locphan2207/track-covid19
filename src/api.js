const SUMMARY_URL = "https://api.covid19api.com/summary"
const COUNTRY_URL = "https://api.covid19api.com/total/country/" // need country slug after
const WHO_RSS = "https://www.who.int/feeds/entity/csr/don/en/rss.xml"
const CDC_RSS = "https://tools.cdc.gov/api/v2/resources/media/404952.rss"
const PRESS_URL = "https://covidtracking.com/api/press"

export const fetchCountriesRequest = async () => {
  const response = await fetch(SUMMARY_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return response.json()
}

export const fetchCountryDataAllTimeRequest = async (countrySlug) => {
  const response = await fetch(COUNTRY_URL + countrySlug, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return response.json()
}

export const fetchCountryDataOneMonthRequest = async (countrySlug) => {
  const today = new Date()
  today.setHours(0, 0, 0)
  const monthAgo = new Date(today.toUTCString())
  monthAgo.setMonth(monthAgo.getMonth() - 1)

  const url = `${COUNTRY_URL}${countrySlug}?from=${monthAgo.toISOString()}&to=${today.toISOString()}`
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  // This api doesn't work with query, so we filter later in the action
  return response.json()
}

export const fetchWhoRssRequest = async () => {
  const response = await fetch(WHO_RSS, {
    method: "GET",
    mode: "cors",
  })
  return response.text()
}

export const fetchCdcRssRequest = async () => {
  const response = await fetch(CDC_RSS, {
    method: "GET",
    mode: "cors",
  })
  return response.text()
}

export const fetchPressRequest = async () => {
  const response = await fetch(PRESS_URL, {
    method: "GET",
    mode: "cors",
  })
  return response.json()
}
