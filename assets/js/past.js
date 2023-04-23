import { getData, searchBarFilter, checkboxFilter, checksOn, createCards, createChecks, preventDefault, pastFilter } from "./module/functions.js"

const pastCardContainer = document.getElementById("past-card-container")
const searchBar = document.getElementById("search-bar")
const categoryChecksContainer = document.getElementById("filter")
const form = document.getElementById("form")

const data = getData()
data
  .then((response) => {
    let pastEvents = pastFilter(response.events, response.currentDate)
    createCards(pastEvents, pastCardContainer)
    createChecks(pastEvents, pastCardContainer)
    preventDefault(form)

    // CHECKBOX LISTENER
    categoryChecksContainer.addEventListener("click", (e) => {
      if (e.target.localName === "input") {
        let searchValue = searchBar.childNodes[1].value.toLowerCase()
        let categoryCheckeds = checksOn() // return an array of inputs with check
        let filterEvents = checkboxFilter(pastEvents, categoryCheckeds) // return an array of events wich matches that category with value of checks
        let filterBySearch = searchBarFilter(filterEvents, searchValue) // return an array of events that matches checks and searchbar values
        let eventsBySearch = searchBarFilter(pastEvents, searchValue)
        createCards(filterBySearch, pastCardContainer)

        let anyChecks = Boolean(...categoryCheckeds) // true or false depends on if any check is checked
        let anyMatch = Boolean(...filterBySearch)
        let anySearch = Boolean(...eventsBySearch)

        if (!anyChecks && searchValue === "") {
          createCards(pastEvents, pastCardContainer)
        } else if (!anyChecks && anySearch) {
          createCards(eventsBySearch, pastCardContainer)
        } else if (!anyMatch) {
          pastCardContainer.innerHTML = `
            <p>NO MATCHES FOUND</p>
          `
        }
      }
    })

    // SEARCHBAR LISTENER
    searchBar.addEventListener("keyup", (e) => {
      let search = e.target.value.toLowerCase()
      let categoryCheckeds = checksOn() // return an array of inputs with check
      let filterEvents = searchBarFilter(pastEvents, search) // return an array of events wich matches with the search
      let filterByChecks = checkboxFilter(filterEvents, categoryCheckeds) // return an array of events that matches checks and searchbar values

      let anyChecks = Boolean(...checksOn())
      let anyMatchWithoutChecks = Boolean(...filterEvents)
      let anyMatchWithChecks = Boolean(...filterByChecks)

      if (!anyChecks && anyMatchWithoutChecks) {
        createCards(filterEvents, pastCardContainer)
      } else if (anyChecks && anyMatchWithChecks) {
        createCards(filterByChecks, pastCardContainer)
      } else if ((anyChecks && !anyMatchWithChecks) || (!anyChecks && !anyMatchWithoutChecks)) {
        pastCardContainer.innerHTML = `
          <p>NO MATCHES FOUND</p>
        `
      }
    })
  })
  .catch((error) => {
    console.log(error)
    pastCardContainer.innerHTML = `
      <p>An unexpected error has occurred</p>
    `
  })
