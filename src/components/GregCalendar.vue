<template>
  <div class="greg-calendar">
    <table
      v-for="(month, index) in months"
      :key="index"
      border="1"
      style="border-collapse: collapse;"
      class="table"
      :class="'--table' + index"
    >
      <thead>
        <tr>
          <th v-for="day in weekDays" :key="day">{{ day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in month" :key="week">
          <td
            v-for="day in week"
            :key="day.date"
            :data-date="day.date"
            :title="`${day.date.slice(0, 10)} Solar date`"
            :data-moon="day.moon"
            :class="{
              'moon-day': day.moon === getMoonDay(currentDate)
                && new Date(day.date).getMonth() === new Date().getMonth(),
              'current': day.current
            }"
          >
            {{ new Date(day.date).getDate() }}
          </td>
        </tr>

        <tr v-if="!month[5]">
          <td v-for="day in weekDays" :key="day">{{ day }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { getFirstSunday, getLastSaturday, getMoonDay } from '@/utils/dateUtils.js'
import { getGregCalendar } from '@/utils/getCalendar.js'

const { date } = defineProps(['date'])
const currentDate = date || new Date()

const prevMonthData = getGregCalendar(new Date(getFirstSunday(new Date())))
const currMonthData = getGregCalendar(new Date())
const nextMonthData = getGregCalendar(new Date(getLastSaturday(new Date())))

const months = ref([prevMonthData, currMonthData, nextMonthData])
const weekDays = ref(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'])
</script>

<style lang="scss">
.greg-calendar {
  position: absolute;
  top: 0;
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
    background: #4c44;
  }

  tbody tr :not(.current) {
    background: #8884;
    color: hsl(120, 25%, 25%);
  }

  .table {
    width: 100%;
  }

  .table.--table1 {
    flex-grow: 1;
  }

  .moon-day {
    background: #fffa;
    background: #4c4;
  }

  thead {
    background: #4c4a;
    color: white;
  }
}

@media (orientation: landscape) {
  .greg-calendar {
    flex-direction: row;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 50dvh;
  }
}

@media (orientation: portrait) {
  .greg-calendar {
    flex-direction: column;
    top: 0;
    left: 50%;
    width: 50dvw;
    height: 100dvh;
  }
}
</style>
