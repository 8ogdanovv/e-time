<template>
  <NeonClock :date="new Date()"/>
  <LunarCalendar :date="new Date()" :refresh="60000" />
  <div class="calendars">
    <GregCalendar :date="new Date()" />
    <MoonCalendar :date="new Date()" />
  </div>
</template>

<script setup>
import NeonClock from '@/components/NeonClock.vue'
import LunarCalendar from '@/components/LunarCalendar.vue'
import GregCalendar from '@/components/GregCalendar.vue'
import MoonCalendar from '@/components/MoonCalendar.vue';
</script>