const SUMMARY_URL = "https://api.covid19api.com/summary"
const COUNTRY_URL = "https://api.covid19api.com/total/country/" // need country slug after

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
