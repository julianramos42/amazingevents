import { getData, upcomingFilter, pastFilter, highestPercentageOfAttendance, lowestPercentageOfAttendance, largerCapacity, upcomingEventsStatistics, pastEventsStatistics } from "./module/functions.js";

const data = getData()

const statsMain = document.getElementById("stats-main")

data
    .then((response) => {
        let upcomingEvents = upcomingFilter(response.events, response.currentDate)
        let pastEvents = pastFilter(response.events, response.currentDate)

        const eventStatisticsContainer = document.getElementById("event-statistics")
        let highestPercentageOfAttendanceEvent = highestPercentageOfAttendance(pastEvents)
        let lowestPercentageOfAttendanceEvent = lowestPercentageOfAttendance(pastEvents)
        let largerCapacityEvent = largerCapacity(response.events)
        eventStatisticsContainer.innerHTML += `
            <tr>
                <td>"${highestPercentageOfAttendanceEvent.name}" with ${((highestPercentageOfAttendanceEvent.assistance * 100) / highestPercentageOfAttendanceEvent.capacity).toFixed(2)}%</td>
                <td>"${lowestPercentageOfAttendanceEvent.name}" with ${((lowestPercentageOfAttendanceEvent.assistance * 100) / lowestPercentageOfAttendanceEvent.capacity).toFixed(2)}%</td>
                <td>"${largerCapacityEvent.name}" with ${largerCapacityEvent.capacity} capacity</td>
            </tr>
        `

        const upcomingStatisticsContainer = document.getElementById("upcoming-statistics")
        let upcomingStatistics = upcomingEventsStatistics(upcomingEvents)
        let template1 = ""
        for (let i = 0; i < upcomingStatistics[0].length; i++) {
            template1 += `
                <tr>
                    <td>${upcomingStatistics[0][i]}</td>
                    <td>$${upcomingStatistics[1][i]}</td>
                    <td>${(upcomingStatistics[2][i]).toFixed(2)}%</td>
                </tr>
            `
        }
        upcomingStatisticsContainer.innerHTML = template1

        const pastStatisticsContainer = document.getElementById("past-statistics")
        let pastStatistics = pastEventsStatistics(pastEvents)
        let template2 = ""
        for (let i = 0; i < pastStatistics[0].length; i++) {
            template2 += `
            <tr>
                <td>${pastStatistics[0][i]}</td>
                <td>$${pastStatistics[1][i]}</td>
                <td>${(pastStatistics[2][i]).toFixed(2)}%</td>
            </tr>
        `
        }
        pastStatisticsContainer.innerHTML = template2
    })
    .catch((error) => {
        console.log(error)
        statsMain.innerHTML = `
            <p class="text-center">An unexpected error has occurred</p>
        `
    })