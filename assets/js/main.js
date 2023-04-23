import { getData, searchBarFilter, checkboxFilter, checksOn, createCards, createChecks, preventDefault } from "./module/functions.js"

const cardContainer = document.getElementById("home-card-container")
const searchBar = document.getElementById("search-bar")
const categoryChecksContainer = document.getElementById("filter")
const form = document.getElementById("form")

const data = getData()
data
  .then((response) => {
    createCards(response.events, cardContainer)
    createChecks(response.events)
    preventDefault(form)

    // CHECKBOX LISTENER
    categoryChecksContainer.addEventListener("click", (e) => {
      if (e.target.localName === "input") {
        let searchValue = searchBar.childNodes[1].value.toLowerCase()
        let categoryCheckeds = checksOn() // return an array of inputs with check
        let filterEvents = checkboxFilter(response.events, categoryCheckeds) // return an array of events wich matches that category with value of checks
        let filterBySearch = searchBarFilter(filterEvents, searchValue) // return an array of events that matches checks and searchbar values
        let eventsBySearch = searchBarFilter(response.events, searchValue)
        createCards(filterBySearch, cardContainer)

        let anyChecks = Boolean(...categoryCheckeds) // true or false depends on if any check is checked
        let anyMatch = Boolean(...filterBySearch)
        let anySearch = Boolean(...eventsBySearch)

        if (!anyChecks && searchValue === "") {
          createCards(response.events, cardContainer)
        } else if (!anyChecks && anySearch) {
          createCards(eventsBySearch, cardContainer)
        } else if (!anyMatch) {
          cardContainer.innerHTML = `
            <p>NO MATCHES FOUND</p>
          `
        }
      }
    })

    // SEARCHBAR LISTENER
    searchBar.addEventListener("keyup", (e) => {
      let search = e.target.value.toLowerCase()
      let categoryCheckeds = checksOn() // return an array of inputs with check
      let filterEvents = searchBarFilter(response.events, search) // return an array of events wich matches with the search
      let filterByChecks = checkboxFilter(filterEvents, categoryCheckeds) // return an array of events that matches checks and searchbar values

      let anyChecks = Boolean(...checksOn())
      let anyMatchWithoutChecks = Boolean(...filterEvents)
      let anyMatchWithChecks = Boolean(...filterByChecks)

      if (!anyChecks && anyMatchWithoutChecks) {
        createCards(filterEvents, cardContainer)
      } else if (anyChecks && anyMatchWithChecks) {
        createCards(filterByChecks, cardContainer)
      } else if ((anyChecks && !anyMatchWithChecks) || (!anyChecks && !anyMatchWithoutChecks)) {
        cardContainer.innerHTML = `
          <p>NO MATCHES FOUND</p>
        `
      }
    })
  })
  .catch((error) => {
    console.log(error)
    cardContainer.innerHTML = `
      <p>An unexpected error has occurred</p>
    `
  })