const SUMMARY_URL = "https://api.covid19api.com/summary"

export const fetchCountriesRequest = async () => {
  const response = await fetch(SUMMARY_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  return response.json()
}
