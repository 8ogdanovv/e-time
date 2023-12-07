import dateUtils from "./dateUtils"

const appendClassesInRange = (element, startDate, endDate, className) => {
  const currentDate = new dateUtils.MoonDate(startDate)
  while (currentDate <= endDate) {
    element.classList.add(className)
    currentDate.setDate(currentDate.getDate() + 1)
  }
}

export default appendClassesInRange
