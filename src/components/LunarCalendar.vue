<template>
  <div class="lunar-calendar" :style="{ backgroundImage: bgColorOrUrl }">
    <svg viewBox="0 0 2000 2000" id="back-box">
      <defs>
        <g id="back-angles" class="back-design">
          <line y1="0" y2="2000"></line>
        </g>
      </defs>
      <g transform="translate(1000 1000)">
        <use v-for="angle in backAngles" :key="angle" href="#back-angles" :transform="`rotate(${angle})`"></use>
      </g>
    </svg>

    <svg viewBox="0 0 2000 2000" id="six-box">
      <defs>
        <g id="six-cardinal" class="six-cardinal">
          <line y1="0" y2="2000"></line>
        </g>
      </defs>
      <g transform="translate(1000 1000)">
        <use v-for="angle in cardinalAngles" :key="angle" href="#six-cardinal" :transform="`rotate(${angle})`"></use>
      </g>
    </svg>

    <svg viewBox="0 0 2000 2000" id="lunar-day-angle">
      <polygon
        points="1000 1000 1000 0 1215 0"
        stroke="green"
        fill="#4c4"
        stroke-width="0"
      />
    </svg>
  </div>
</template>

<script setup>
import { defineProps, ref, computed, onMounted } from 'vue'
const { background, date, refresh } = defineProps(['background', 'date', 'refresh'])
const bgColorOrUrl = computed(() => 'url("' + background + '")' || '#000').value
console.log(bgColorOrUrl)
const refreshInterval = computed(() => refresh || null).value

const backAngles = ref(Array.from({ length: 37 }, (_, index) => index * 12))
const cardinalAngles = ref(Array.from({ length: 7 }, (_, index) => index * 60))

const getMoonDay = (date = new Date()) => {
  const newMoonTime = new Date('1970-01-07T20:35:50.73Z').getTime() // Define the time of the new moon closest to 01.01.1970 in UTC time
  const synodicMonth = 29.530588853 * 24 * 60 * 60 * 1000 // Define the length of a synodic month in milliseconds
  const now = date.getTime() // Define the current time in UTC time
  const elapsedTime = now - newMoonTime // Calculate the time since the new moon closest to 01.01.1970
  const synodicMonths = elapsedTime / synodicMonth // Calculate the number of synodic months since the new moon closest to 01.01.1970
  const daysSinceNewMoon = synodicMonths * 29.530588853  // Calculate the number of days since the last new moon
  const moonDay = Math.floor((daysSinceNewMoon % 29.530588853) + 1)  // Calculate the moon day

  return moonDay
}

function passMoonDayFromJsToCss(date = new Date()) {
  const moonDay = getMoonDay(date) // Calculate the moon day and store it in a variable.
  const lunarDayAngle = document.querySelector('#lunar-day-angle') // Get the #lunar-day-angle element.
  lunarDayAngle.style.setProperty('--moon-day', `${moonDay}`) // Set the value of the custom property --moon-day.
}

onMounted(() => {
  passMoonDayFromJsToCss(date)

  if (refreshInterval) {
    setInterval(() => {
      passMoonDayFromJsToCss(date)
    }, refreshInterval)
  }
})
</script>

<style lang="scss">
.lunar-calendar {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100dvw;
  height: 100dvh;
  overflow: hidden;
  z-index: -1;

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.lunar-calendar::after {
  position: absolute;
  content: '';
  width: 100dvw;
  height: 100dvh;
  background: attr(data-background);
}

#back-box,
#six-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
}

#lunar-day-angle {
  transform: scale(2);
}

#six-box {
  opacity: 0.5;
  z-index: 1;
}
.back-design {
  stroke: #44cc4488;
  stroke-width: 1px;
}

.six-cardinal {
  stroke: #44cc4488;
  stroke-width: 6px;
}

#lunar-day-angle {
  opacity: 0.33;
  position: absolute;
  width: 100vmax;
  height: 100vmax;
  z-index: 0;
  transform: scale(1.5) rotate(calc((var(--moon-day) - 1) * 12deg));
  -webkit-transform: scale(1.5) rotate(calc((var(--moon-day) - 1) * 12deg));
  -moz-transform: scale(1.5) rotate(calc((var(--moon-day) - 1) * 12deg));
  -ms-transform: scale(1.5) rotate(calc((var(--moon-day) - 1) * 12deg));
  -o-transform: scale(1.5) rotate(calc((var(--moon-day) - 1) * 12deg));
}
</style>