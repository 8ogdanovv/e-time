<template>
  <div class="greg-calendar" ref="calendarContainer">
    <div v-for="(month, index) in months" :key="index" class="calendar-month">
      <h2>{{ month.title }}</h2>
      <table border="1" style="border-collapse: collapse;">
        <thead>
          <tr>
            <th v-for="day in weekDays" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="week in month" :key="week[0].date">
            <td
              v-for="day in week"
              :key="day.date"
              :data-date="day.date"
              :data-moon="day.moon"
              :class="{ 'highlight': day.moon === dateUtils.getMoonDay(currentDate), 'not-current-month': new Date(day.date).getMonth() !== new Date().getMonth() }"
            >
              {{ new Date(day.date).getDate() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated } from 'vue'
import dateUtils from '../utils/dateUtils.js'
import generateCalendar from '../utils/calendarGenerator.js'

const calendarContainer = ref(null)

const prevMonthData = generateCalendar( new Date( dateUtils.getFirstSunday(new Date()) ) )
const currMonthData = generateCalendar(new Date());
const nextMonthData = generateCalendar(new Date( dateUtils.getLastSaturday(new Date()) ))

const months = [
  prevMonthData,
  currMonthData,
  nextMonthData,
]

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function renderCalendar() {
  calendarContainer.value.innerHTML = '';

  console.log(months)

  for (const month in months) {
    const table = document.createElement('table');
    table.border = '1';
    table.style.borderCollapse = 'collapse';

    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    for (const day of weekDays) {
      const th = document.createElement('th');
      th.textContent = day;
      headerRow.appendChild(th);
    }

    const tbody = table.createTBody();
    for (const week of months[month]) {
      const row = tbody.insertRow();
      for (const day of week) {
        const cell = row.insertCell();
        cell.textContent = new Date(day.date).getDate();
        cell.setAttribute('data-date', new Date(day.date).toISOString())
        cell.setAttribute('data-moon', day.moon)
      }
    }

    calendarContainer.value.appendChild(table);
  }

  const table = document.createElement('table');
  table.border = '1';
  table.style.borderCollapse = 'collapse';

  const thead = table.createTHead();
  const headerRow = thead.insertRow();
  for (const day of weekDays) {
    const th = document.createElement('th');
    th.textContent = day;
    headerRow.appendChild(th);
  }

  calendarContainer.value.appendChild(table);
}

onMounted(() => {
  renderCalendar();
});

onUpdated(() => {
  renderCalendar();
});
</script>

<style lang="scss">
.greg-calendar {
  position: absolute;
  top: 0;
  left: 0;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100dvw;
  height: 100dvh;
  z-index: 100;

  .calendar-month {
    margin-bottom: 20px;

    h2 {
      margin-bottom: 10px;
    }

    table {
      width: 100%;
    }
  }
}
</style>
