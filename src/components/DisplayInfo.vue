<template>
  <div class="display-info calendars" @mouseover="handleMouseOver">

    <span class="light-spot"></span>
    <slot @dateClick="handleDateClick"></slot>

    <div v-if="dateClicked" class="info">
      <section class="head">
        <h2>
          Date: {{ new Date(dateClicked.date).toLocaleDateString() }}<br>
          Moon-phase: {{ dateClicked.moon }}<br>
          Vedic name: {{ dateClicked.moon !== 15 ? tithis[dateClicked.moon % 15] : tithis[15] }}<br>
          Waxing/wanning (Pakṣa): {{ dateClicked.moon <= 15 ? 'Śukla 🌛 Bright' : 'Kṛṣṇa 🌜 Dark'}}
        </h2>
        <button @click="closeInfo">X</button>
      </section>
      <section class="body">
        <img :src="absPath + getTwoDigits(dateClicked.moon) + '.png'" :alt="moonImage" class="moon-image">

        <table>
          <thead>
            <tr>
              <th><small>phase type:</small></th>
              <th v-for="type, index in types" :key="index">{{ type }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th><small>phase % 5:</small></th>
              <td
                v-for="type, index in types" :key="index"
                :class="{'active': dateClicked.moon % 5 === index + 1}"
              >
                {{ index + 1 }}
              </td>
            </tr>
            <tr>
              <th><small>elements:</small></th>
              <td v-for="element, index in elements" :key="index">{{ element }}</td>
            </tr>
            <tr>
              <th><small>similarity:</small></th>
              <td v-for="number, index in numbers" :key="index">
                {{
                  (dateClicked.moon - 1) % 5 === index
                  ? numbers[dateClicked.moon % 5].filter(n => n !== dateClicked.moon).join(',')
                  : ''
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <button @click="closeInfo">Ok</button>
    </div>
  </div>
</template>

<script setup>
import { defineExpose, ref, onMounted } from 'vue'

const base = import.meta.env.BASE_URL
const absPath = window.location.origin + base

const dateClicked = ref(null);

const getTwoDigits = (moon) => String(moon).length < 2 ? '0' + moon : moon;

const types = ['Nanda', 'Bhadra', 'Jāya', 'Ṛkta', 'Pūrṇa']
const elements = ['Fire', 'Earth', 'Ākāśa', 'Water', 'Vāyu']

const numbers = [
  [5, 10, 15, 20, 25, 30],
  [1, 6, 11, 16, 21, 26],
  [2, 7, 12, 17, 22, 27],
  [3, 8, 13, 18, 23, 28],
  [4, 9, 14, 19, 24, 29],
]

const tithis = [
  'Amavasya (New Moon)',
  'Pratipada',
  'Dwitiya',
  'Tritiya',
  'Chaturthi',
  'Panchami',
  'Shashthi',
  'Saptami',
  'Ashtami (Half Moon)',
  'Navami',
  'Dashami',
  'Ekadasi',
  'Dwadashi',
  'Trayodashi',
  'Chaturdashi',
  'Purnima (Full Moon)',
]

const closeInfo = () => dateClicked.value = null

const showLightSpot = ref(false);

function handleDateClick(e, info, target) {
  const targetClasses = target.classList.value.split(' ')
  // console.log(e, info, targetClasses.includes('greg'))
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
    width: 80dvw;
    height: 80dvh;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    z-index: 555;
    display: grid;
    padding: 3dvh;
    border-radius: 5vmin;
    justify-items: center;

    @media (orientation: portrait) {
      grid-template-rows: 1fr 5fr 1fr;
    }

    @media (orientation: landscape) {
      grid-template-rows: 1fr 5fr 1fr;
    }

    h3 {
      padding: 0;
    }

    .body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      background: #0008;
      position: relative;
      border-radius: 5vmin;
      .moon-image {
        width: auto;
        height: 25vmin;
        display: inline-flex;
        background-color: #000;
        padding: 3vmin calc((100% - 25vmin) / 2);
        margin: 0 auto;
        border-radius: 5vmin;
      }
    }

    .active {
      filter: invert(1);
      background: #0006;
    }

    .head {
      display: flex;
      width: 100%;
      text-align: left;
      justify-content: space-between;

      button {
        margin: 0 0 0 auto;
        width: 7vmin;
        height: 7vmin;
        font-size: 4vmin;
        font-weight: bold;
        border-radius: 50%;
      }
    }
  }

  button {
    width: 17vmin;
    height: 7vmin;
    border-radius: 3.5vmin;
    mix-blend-mode: screen;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: auto;
  }

  button {
    font-size: 4vmin;
    color: #fff;
    background: #8888;
    box-shadow: inset 0 0 1vmin 0.5vmin #fffa;
  }
}
</style>