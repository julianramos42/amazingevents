import { getData } from "./module/functions.js"

const container = document.getElementById("details-container")

const data = getData()

const params = new URLSearchParams(location.search)
let id = params.get("id")

data.then( (response) => {
    let events = response.events
    let targetEvent = events.find((event) => event._id == id)
    document.title = `${targetEvent.name} | Details`
    
    container.innerHTML = `
        <div class="detail-image">
            <img src="${targetEvent.image}" alt="">
        </div>
        <div class="detail-text text-center">
            <h2 class="fs-3 text-decoration-underline">${targetEvent.name}</h2>
            <p>
                ${targetEvent.description}
            </p>
            <p class="fw-bold">
                ${targetEvent.category}
            </p>
            <p>
                This event have place at ${targetEvent.place} on ${targetEvent.date}
            </p>
            <p>It has ${targetEvent.capacity} people capacity</p>
            <p>Come over only for <span class="fw-bold">$${targetEvent.price}</span></p>
        </div>
    `
}).catch((error) => {
    console.log(error)
    container.innerHTML = `
        <p class="text-center my-auto">An unexpected error has occurred</p>
    `
})