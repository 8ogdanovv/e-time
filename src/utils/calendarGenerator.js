import dateUtils from './dateUtils'

const generateCalendar = (date = new Date) => {
  const calendar = []
  let currentDate = dateUtils.getFirstSunday(date)
  let endDate = dateUtils.getLastSaturday(date)

  console.log(currentDate)
  console.log(endDate)

  while (currentDate <= endDate) {
    const week = []
    for (let i = 0; i < 7; i++) {
      week.push({
        date: currentDate.toISOString(),
        moon: dateUtils.getMoonDay(currentDate),
        current: date.getMonth() === currentDate.getMonth()
      });
      currentDate.setDate(currentDate.getDate() + 1)
    }
    calendar.push(week)
    console.log(week)
  }

  return calendar
}

export default generateCalendar
