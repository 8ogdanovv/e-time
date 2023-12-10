<template>
  <div class="display-info calendars">
    <slot @dateClick="handleDateClick"></slot>

    <div v-if="dateClicked" class="info">
      <section class="head">
        <h2>
          Date: {{ new Date(dateClicked.date).toLocaleDateString() }}<br><br>
          Moon-phase: {{ dateClicked.moon }}
        </h2>
        <button @click="closeInfo">X</button>
      </section>
      <img v-if="dateClicked" :src="`@/../public/${dateClicked.moon}.png`" :alt="moonImage" class="moon-image">
      <!-- <pre style="text-align: left;">
        {{ dateClicked }}
      </pre> -->

      <button @click="closeInfo">Ok</button>
    </div>
  </div>
</template>

<script setup>
import { defineExpose, ref } from 'vue'

const dateClicked = ref(null);

const closeInfo = () => dateClicked.value = null

function handleDateClick(e, info, target) {
  const targetClasses = target.classList.value.split(' ')
  console.log(e, info, targetClasses.includes('greg'))
  dateClicked.value = info
}

defineExpose({ handleDateClick })
</script>

<style lang="scss">
.display-info {
  .info {
    background: radial-gradient(#000 10%, #0008 100%);
    color: #fff;
    position: absolute;
    width: 70dvw;
    height: 70dvh;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    z-index: 555;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 3dvh;
    padding: 3dvh;
    border-radius: 2%;

    h3 {
      padding: 0;
    }

    .moon-image {
      width: 50%;
      height: auto;
      display: inline-flex;
      width: 100%;
      background-color: #000;
      padding: 2dvh 10dvh;
      border-radius: 1dvh;
    }

    .head {
      display: flex;
      justify-content: space-between;
      width: 100%;
      text-align: left;

      button {
        width: 7vmin;
        height: 7vmin;
        font-size: 4vmin;
        font-weight: bold;
        border-radius: 50%;
        color: #fff;
        background: transparent;
        box-shadow: inset 0 0 1vmin 0.5vmin #fffa;
      }
    }
  }

  button {
    width: 10dvh;
    height: 5dvh;
    border-radius: 2.5dvh;
    font-size: 4dvh;
  }
}
</style>