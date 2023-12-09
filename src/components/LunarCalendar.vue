<template>
  <div class="lunar-calendar" :style="{ backgroundImage: bgColorOrUrl }">
    <svg viewBox="0 0 2000 2000" id="back-box">
      <defs>
        <g id="back-angles" class="back-design">
          <line y1="0" y2="2000"></line>
        </g>
      </defs>
      <g transform="translate(1000 1000)">
        <use
          v-for="angle in backAngles"
          :key="angle"
          href="#back-angles"
          :transform="`rotate(${angle})`"
        ></use>
      </g>
    </svg>

    <svg viewBox="0 0 2000 2000" id="six-box">
      <defs>
        <g id="six-cardinal" class="six-cardinal">
          <line y1="0" y2="2000"></line>
        </g>
      </defs>
      <g transform="translate(1000 1000)">
        <use
          v-for="angle in cardinalAngles"
          :key="angle" href="#six-cardinal"
          :transform="`rotate(${angle})`"
        ></use>
      </g>
    </svg>

    <svg viewBox="0 0 2000 2000" id="lunar-day-angle">
      <polygon
        points="1000 1000 1000 0 1215 0"
        stroke="green"
        fill="#cb43cb"
        stroke-width="0"
      />
    </svg>
  </div>
</template>

<script setup>
import { defineProps, ref, computed, onMounted } from 'vue'
import { getMoonDay } from '@/utils/dateUtils.js'

const { background, date, refresh } = defineProps(['background', 'date', 'refresh'])

const bgColorOrUrl = computed(() => 'url("' + background + '")' || '#000').value
const refreshInterval = computed(() => refresh || null).value

const backAngles = ref(Array.from({ length: 37 }, (_, index) => index * 12))
const cardinalAngles = ref(Array.from({ length: 7 }, (_, index) => index * 60))

function passMoonDayFromJsToCss(date = new Date()) {
  const moonDay = getMoonDay(date)
  const lunarDayAngle = document.querySelector('#lunar-day-angle')
  lunarDayAngle.style.setProperty('--moon-day', `${moonDay}`)
}

onMounted(() => {
  passMoonDayFromJsToCss(date)
  if (refreshInterval) setInterval(() => passMoonDayFromJsToCss(date), refreshInterval)
})
</script>

<style lang="scss">
%abs100dv {
  position: absolute;
  width: 100dvw;
  height: 100dvh;
}

.lunar-calendar {
  @extend %abs100dv;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: -1;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.lunar-calendar::after {
  @extend %abs100dv;
  content: '';
  /* background: url('../assets/nasa-moon-phases.gif'); */
}

#back-box,
#six-box {
  @extend %abs100dv;
  top: 0;
  left: 0;
  transform: scale(2.5);
}

#six-box {
  opacity: 0.5;
  z-index: 1;
}
.back-design {
  stroke: #cb43cb88;
  stroke-width: 1px;
}

.six-cardinal {
  stroke: #cb43cb;
  stroke-width: 6px;
}

#lunar-day-angle {
  opacity: 0.428571;
  z-index: 0;
  transform: scale(2.5) rotate(calc((var(--moon-day) - 1) * 12deg));
  -webkit-transform: scale(2.5) rotate(calc((var(--moon-day) - 1) * 12deg));
  -moz-transform: scale(2.5) rotate(calc((var(--moon-day) - 1) * 12deg));
  -ms-transform: scale(2.5) rotate(calc((var(--moon-day) - 1) * 12deg));
  -o-transform: scale(2.5) rotate(calc((var(--moon-day) - 1) * 12deg));
}
</style>
