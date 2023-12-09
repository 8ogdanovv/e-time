<template>
  <div class="moon-calendar">
    <table
      v-for="(month, index) in moonMonths"
      :key="index"
      border="1"
      style="border-collapse: collapse;"
      class="table"
      :class="'--table' + index"
    >
      <thead>
        <tr>
          <th>{{ weekDays[4] }}</th>
          <th v-for="day in weekDays" :key="day">{{ day }}</th>
          <th>{{ weekDays[4] }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(week, index) in month" :key="week">
          <th>{{ weekDays[index] || 'Fri' }}</th>
          <td
            v-for="day in week"
            :key="day.date"
            :data-date="day.date"
            :data-moon="day.moon"
            :title="
              day.moon === getMoonDay(currentDate)
                && new Date(day.date).getMonth() === new Date().getMonth()
                && new Date(currentDate).getDate() !== new Date(day.date).getDate()
                  ? 'Current Lunar phase is '
                    + day.moon + `-th, but there was ${day.moon === 1 ? 30 : day.moon - 1}-th at midnight`
                  :  day.moon + ' Lunar phase'
            "
            :class="{
              'moon-day': day.moon === getMoonDay(currentDate)
                && new Date(day.date).getMonth() === new Date().getMonth(),
              'sun-day': new Date(currentDate).getMonth() === new Date(day.date).getMonth()
                && new Date(currentDate).getDate() === new Date(day.date).getDate(),
              'current': day.current
            }"
          >
            {{ new Date(day.date).getDate() }}
          </td>
          <th>{{ weekDays[index] || 'Fri' }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getMoonDay } from '@/utils/dateUtils.js'
import { getMoonCalendar } from '@/utils/getCalendar.js'

const currentDate = ref(new Date())
const moonMonths = ref(getMoonCalendar(currentDate.value))
const weekDays = ref(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
</script>

<style lang="scss">
.moon-calendar {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100dvw;
  height: 50dvh;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* gap: 1rem; */
  z-index: 100;

  .current {
    background: #cb43cb44;
  }

  tbody tr :not(.current) {
    background: #8884;
    color: #503050;
  }

  .table {
    width: 100%;
  }

  .table.--table1 {
    flex-grow: 1;
  }

  .sun-day {
    background: #4c4a;
  }

  .moon-day {
    background: #cb43cbaa !important;
  }

  thead {
    background: #cb43cbaa;
    color: black;
  }
}

@media (orientation: landscape) {
  .moon-calendar {
    flex-direction: row;
    top: 50%;
    left: 0;
    width: 100dvw;
    height: 50dvh;
  }
}

@media (orientation: portrait) {
  .moon-calendar {
    flex-direction: column;
    top: 0;
    left: 0;
    width: 50dvw;
    height: 100dvh;
    /* gap: 1rem; */
  }


}
</style>
