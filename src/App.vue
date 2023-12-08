<template>
  <NeonClock :date="new Date()"/>
  <LunarCalendar
    :background="`${
      'https://spaceplace.nasa.gov/review/moon-phases/moon-phases.en.gif'
      || '@/../../public/nasa-moon-phases.gif'
    }`"
    :date="new Date()"
    :refresh="60000"
  />
  <GregCalendar :date="new Date()" />
  <MoonCalendar :date="new Date()" />
</template>

<script setup>
import NeonClock from '@/components/NeonClock.vue'
import LunarCalendar from '@/components/LunarCalendar.vue'
import GregCalendar from '@/components/GregCalendar.vue'
import MoonCalendar from '@/components/MoonCalendar.vue';
</script>