export async function getData() {
  try {
    const response = await fetch("https://mindhub-xj03.onrender.com/api/amazing")
    const data = await response.json()
    return data
  }
  catch (error) {
    console.log(`Error: ${error}`)
  }
}

// FUNCTION TO CREATE ALL CARDS OF AN ARRAY OF EVENTS
export function createCards(events, container) {
  container.innerHTML = ""
  let aux = ""
  for (let event of events) {
    aux += writeCard(event)
  }
  container.innerHTML += aux
}

export function writeCard(event) {
  return `
      <section class="card col-lg-2 col-11">
        <div class="card-img">
          <img src="${event.image}" class="card-img-top" alt="${event.name}">
        </div>
        <div class="card-body p-0 d-flex flex-column justify-content-center">
          <h5 class="card-title text-center m-0">${event.name}</h5>
          <p class="text-center m-0">
            ${event.description}
          </p>
          <div>
            <p class="m-0">Price: $${event.price}</p>
            <a href="../../assets/html/details.html?id=${event._id}" class="btn p-1">Details</a>
          </div>
        </div>
      </section>
    `
}


// CREATION OF DYNAMIC CHECKBOXS
export function createChecks(events) {
  let checks = Array.from(new Set(events.map(event => event.category)))
  let cont = 1
  for (let check of checks) {
    writeChecks(check, cont)
    cont++
  }
}

export function writeChecks(check, cont) {
  categoryChecksContainer.innerHTML += `
    <div>
      <input type="checkbox" name="category" id="${cont}" value="${check}">
      <label for="${cont}">${check}</label>
    </div>  
  `
}


// CHECK AND SEARCH FILTER FUNCTION
export function searchBarFilter(events, value) {
  let filterEvents = events.filter((event) => event.name.toLowerCase().includes(value.toLowerCase()))
  return filterEvents
}

export function checkboxFilter(events, value) {
  let filterEvents = events.filter((event) => {
    if (value.includes(event.category)) {
      return event
    }
  })
  return filterEvents
}


//
const categoryChecksContainer = document.getElementById("filter")
export function checksOn() {
  return Array.from(categoryChecksContainer.elements).filter((check) => check.checked).map((check) => check.value)
}


export function preventDefault(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault()
  })
}


// DATE FILTER
export function upcomingFilter(events, date) {
  let upcomingFilter = []
  for (let event of events) {
    if (date < event.date) {
      upcomingFilter.push(event)
    }
  }
  return upcomingFilter
}

export function pastFilter(events, date) {
  let pastEvents = []
  for (let event of events) {
    if (date > event.date) {
      pastEvents.push(event)
    }
  }
  return pastEvents
}

// STATS FUNCTIONS

export function highestPercentageOfAttendance(events) {
  let highest = 0
  let highestEvent
  for (let event of events) {
    let percentageOfAttendance = (event.assistance * 100) / event.capacity
    if (highest === 0 || percentageOfAttendance > highest) {
      highest = percentageOfAttendance
      highestEvent = event
    }
  }
  return highestEvent
}

export function lowestPercentageOfAttendance(events) {
  let lowest = 0
  let lowestEvent
  for (let event of events) {
    let percentageOfAttendance = (event.assistance * 100) / event.capacity
    if (lowest === 0 || percentageOfAttendance < lowest) {
      lowest = percentageOfAttendance
      lowestEvent = event
    }
  }
  return lowestEvent
}

export function largerCapacity(events) {
  let larger = 0
  let largerCapacityEvent
  for (let event of events) {
    if (larger === 0 || event.capacity > larger) {
      larger = event.capacity
      largerCapacityEvent = event
    }
  }
  return largerCapacityEvent
}

export function upcomingEventsStatistics(events) {
  let upcomingStatistics = [] // ARRAY TO SAVE 3 LIST OF ELEMENTS
  let upcomingCategories = Array.from(new Set(events.map(event => event.category))) // CATEGORIES OF THE EVENTS


  let upcomingRevenues = [] // REVENUES FROM THE EVENTS
  for (let category of upcomingCategories) {
    let revenueCont = 0
    for (let event of events) {
      if (event.category === category) {
        revenueCont += event.estimate * event.price
      }
    }
    upcomingRevenues.push(revenueCont)
  }


  let upcomingPercentageOfAttendance = [] // PERCENTAGE OF ATTENDANCE
  for (let category of upcomingCategories) {
    let estimateAttendance = 0
    let capacity = 0
    for (let event of events) {
      if (event.category === category) {
        estimateAttendance += event.estimate
        capacity += event.capacity
      }
    }
    upcomingPercentageOfAttendance.push((estimateAttendance * 100) / capacity)
  }


  upcomingStatistics.push(upcomingCategories, upcomingRevenues, upcomingPercentageOfAttendance)
  return upcomingStatistics
}


export function pastEventsStatistics(events) {
  let pastStatistics = [] // ARRAY TO SAVE 3 LIST OF ELEMENTS
  let pastCategories = Array.from(new Set(events.map(event => event.category))) // CATEGORIES OF THE EVENTS


  let pastRevenues = [] // REVENUES FROM THE EVENTS
  for (let category of pastCategories) {
    let revenueCont = 0
    for (let event of events) {
      if (event.category === category) {
        revenueCont += event.assistance * event.price
      }
    }
    pastRevenues.push(revenueCont)
  }


  let pastPercentageOfAttendance = [] // PERCENTAGE OF ATTENDANCE
  for (let category of pastCategories) {
    let assistance = 0
    let capacity = 0
    for (let event of events) {
      if (event.category === category) {
        assistance += event.assistance
        capacity += event.capacity
      }
    }
    pastPercentageOfAttendance.push((assistance * 100) / capacity)
  }


  pastStatistics.push(pastCategories, pastRevenues, pastPercentageOfAttendance)
  return pastStatistics
}