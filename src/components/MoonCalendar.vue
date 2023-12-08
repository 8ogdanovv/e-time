<template>
  <div class="moon-calendar">
    <table v-for="(month, index) in moonMonths" :key="index" border="1" style="border-collapse: collapse;">
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
            :data-moon="day.moon"
            :class="{
              'moon-day': day.moon === getMoonDay(currentDate) && new Date(day.date).getMonth() === new Date().getMonth(),
              'current': day.current
            }"
          >
            {{ new Date(day.date).getDate() }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getMoonDay } from '../utils/dateUtils.js'
import { getMoonCalendar } from '../utils/getCalendar.js'

const currentDate = ref(new Date())
const moonMonths = ref(getMoonCalendar(currentDate.value))
const weekDays = ref(['Mon', 'Thu', 'Wed', 'Thu', 'Fri'])
</script>

<style lang="scss">
.moon-calendar {
  position: absolute;
  top: 50%;
  left: 0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  width: 100dvw;
  height: 50dvh;
  z-index: 100;
}
</style>
