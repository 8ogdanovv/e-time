<template>
  <div class="moon-calendar container">
    <table
      v-for="(month, index) in moonMonths"
      :key="index"
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
        <tr v-for="week in month" :key="week">
          <th class="friday">{{ 'Fr' }}</th>
          <td
            class="moon"
            v-for="day in week"
            :key="day.date"
            :data-date="day.date"
            :data-moon="day.moon"
            @click="(e) => $parent.handleDateClick(e, day, e.target)"
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
              'current': day.current && index === 1
            }"
          >
            {{ new Date(day.date).getDate() }}
          </td>
          <th class="friday">{{ 'Fr' }}</th>
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
const weekDays = ref(['Mo', 'Tu', 'We', 'Th', 'Fr'])
</script>

<style lang="scss">
.moon-calendar {
  .current {
    background: #cb43cb88;
  }

  .friday {
    color: #000;
  }

  .sun-day {
    background: #4c44;
  }

  .moon-day,
  .--table1 thead th {
    background: #cb43cbbb;
    filter: contrast(2);
  }

/*  [data-moon]::after {
    content: attr(data-moon);
    position: absolute;
    background: #8888;

    width: 100%;
  
    top: 0;
    left: 0;
  }
*/
  .--table0,
  .--table2 {
    thead th {
      background: #cb43cb88;
    }
  }
}

@media (orientation: landscape) {
  .moon-calendar {
  }
}

@media (orientation: portrait) {
  .moon-calendar {
  }
}
</style>
