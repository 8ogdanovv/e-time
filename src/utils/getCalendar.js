import { getFirstSunday, getLastSaturday, getMoonPhaseDates, getMoonDay } from './dateUtils'

function getGregCalendar(date = new Date()) {
  const calendar = []
  let currentDate = getFirstSunday(date)
  let endDate = getLastSaturday(date)

  console.log(currentDate)
  console.log(endDate)

  while (currentDate <= endDate) {
    const week = []
    for (let i = 0; i < 7; i++) {
      week.push({
        date: currentDate.toISOString(),
        moon: getMoonDay(currentDate),
        current: date.getMonth() === currentDate.getMonth(),
      })
      currentDate.setDate(currentDate.getDate() + 1)
    }
    calendar.push(week)
    console.log(week)
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

  console.log(calendar)
  return calendar
}

function generateMonthWeeks(startDate, endDate, moonPhaseDates) {
  const weeks = []
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const week = []
    for (let i = 0; i < 5; i++) {
      week.push({
        date: currentDate.toISOString(),
        moon: getMoonDay(currentDate),
        current: currentDate >= moonPhaseDates[1]
          && currentDate <= moonPhaseDates[2],
      })
      currentDate.setDate(currentDate.getDate() + 1)
    }
    console.log(week)
    weeks.push(week)
  }

  return weeks
}

export {
  getGregCalendar,
  getMoonCalendar,
}
