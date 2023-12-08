<script setup>
import NeonClock from './components/NeonClock.vue'
import LunarCalendar from './components/LunarCalendar.vue'
import GregCalendar from './components/GregCalendar.vue'
import MoonCalendar from './components/MoonCalendar.vue';
</script>

<template>
  <NeonClock :date="new Date()"/>
  <LunarCalendar
    :background="`${'https://spaceplace.nasa.gov/review/moon-phases/moon-phases.en.gif'}`"
    :date="new Date()"
    :refresh="60000"
  />
  <GregCalendar :date="new Date()" />
  <MoonCalendar :date="new Date()" />
</template>
