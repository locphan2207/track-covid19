export const getShortName = (country) =>
  country.split(" ").slice(0, 2).join(" ")

export const xmlToNewsObject = (response) => {
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
      item[elInfo.tagName] = elInfo.textContent
    }
    items.push(item)
  }

  return { title, items }
}
