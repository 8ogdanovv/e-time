import { getFirstSunday, getLastSaturday, getMoonPhaseDates, getMoonDay, getBareDate } from './dateUtils'

function getGregCalendar(date = new Date()) {
  const dateCopy = new Date(date.getTime())
  const calendar = []
  let currentDate = getFirstSunday(date)
  let endDate = getLastSaturday(date)

  while (currentDate <= endDate) {
    const week = []

    for (let i = 0; i < 7; i++) {
      week.push({
        date: currentDate.toISOString(),
        moon: getMoonDay(currentDate),
        current: currentDate.getMonth() === new Date().getMonth(),
      })
      currentDate.setDate(currentDate.getDate() + 1)

    }

    calendar.push(week)
  }

  if (calendar.length === 6) {
    console.log(calendar[calendar.length - 1])
  } else {
    console.log(JSON.parse(`[
      {
          "date": "2023-12-31T06:03:47.022Z",
          "moon": 19,
          "current": true
      },
      {
          "date": "2024-01-01T06:03:47.022Z",
          "moon": 20,
          "current": false
      },
      {
          "date": "2024-01-02T06:03:47.022Z",
          "moon": 21,
          "current": false
      },
      {
          "date": "2024-01-03T06:03:47.022Z",
          "moon": 22,
          "current": false
      },
      {
          "date": "2024-01-04T06:03:47.022Z",
          "moon": 23,
          "current": false
      },
      {
          "date": "2024-01-05T06:03:47.022Z",
          "moon": 24,
          "current": false
      },
      {
          "date": "2024-01-06T06:03:47.022Z",
          "moon": 25,
          "current": false
      }
  ]`))
  }

  return calendar
}

function getMoonCalendar(date = new Date()) {
  const calendar = []
  const moonPhaseDates = getMoonPhaseDates(date)

  for (let i = 0; calendar.length < moonPhaseDates.length - 1; i ++) {
    const startDate = new Date(moonPhaseDates[i])
    const endDate = new Date(moonPhaseDates[i + 1])
    const weeks = generateMonthWeeks(startDate, endDate, moonPhaseDates)
    calendar.push(weeks)
  }

  return calendar
}

function generateMonthWeeks(startDate, endDate, moonPhaseDates) {
  const weeks = []
  let currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    const week = []

    for (let i = 0; i < 5; i++) {
      week.push({
        date: currentDate.toISOString(),
        moon: getMoonDay(currentDate) === 1 && i === 4 ? 30 : getMoonDay(currentDate),
        current: currentDate >= moonPhaseDates[1]
          && currentDate <= moonPhaseDates[2],
      })
      currentDate.setDate(currentDate.getDate() + 1)
    }

    weeks.push(week)
  }

  return weeks
}

export {
  getGregCalendar,
  getMoonCalendar,
}
