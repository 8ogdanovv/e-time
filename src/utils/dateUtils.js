function getMoonDay(date = new Date()) {
  const newMoonTime = new Date('1970-01-07T20:35:50.73Z').getTime()
  const synodicMonth = 29.530588853 * 24 * 60 * 60 * 1000
  const now = date.getTime()
  const elapsedTime = now - newMoonTime
  const synodicMonths = elapsedTime / synodicMonth
  const daysSinceNewMoon = synodicMonths * 29.530588853
  const moonDay = Math.floor((daysSinceNewMoon % 29.530588853) + 1)
  return moonDay;
}

function getFirstSunday(date = new Date) {
  const firstDate = new Date(date.setDate(1))
  const firstDay = firstDate.getDay()
  return firstDay > 0 ? new Date(firstDate.setDate(firstDate.getDate() - firstDay)) : firstDate
}


function getLastSaturday(date = new Date) {
  const lastDate = new Date(new Date(date.setMonth(date.getMonth() + 1)).setDate(0))
  const lastDay = lastDate.getDay()
  return lastDay < 6 ? new Date(lastDate.setDate(lastDate.getDate() + (6 - lastDay))) : lastDate
}

export default {
  getMoonDay,
  getFirstSunday,
  getLastSaturday,
}
