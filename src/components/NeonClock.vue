<script setup>
import { ref, onMounted, defineProps, computed } from 'vue'

const { date } = defineProps(['date'])
const time = computed(() => date || new Date()).value

const lineAngles = ref(Array.from({ length: 85 }, (_, index) => index * 6))

function runWatch(time = new Date()) {
  const seconds = '--seconds: -' + time.getSeconds() + 's'
  const minutes = '--minutes: -' + ( time.getMinutes() * 60 + time.getSeconds() ) + 's'
  const hours = '--hours: -' + ( time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds() ) + 's'

  document.querySelector('.watch__seconds-second').style = seconds
  document.querySelector('.watch__minutes-minute').style = minutes
  document.querySelector('.watch__hours-hour').style = hours
}

onMounted(() => {
  console.log(time)
  runWatch(time)
})
</script>

<template>
  <div class="neon-clock" id="page">
    <div class="watch">
      <svg viewBox="0 0 160 160" class="watch__pad">
        <defs>
          <g id="lines" class="watch__pad-lines">
            <line x1=" 71" x2=" 79"></line>
            <line x1="-71" x2="-79"></line>
            <line y1=" 71" y2=" 79"></line>
            <line y1="-71" y2="-79"></line>
          </g>
        </defs>
        <g :transform="`translate(80 80)`">
          <use v-for="angle in lineAngles" :key="angle" href="#lines" :transform="`rotate(${angle})`"></use>
        </g>
      </svg>

      <div class="watch__hours">
        <div class="watch__hours-hour"></div>
      </div>
      <div class="watch__minutes">
        <div class="watch__minutes-minute"></div>
      </div>
      <div class="watch__seconds">
        <div class="watch__seconds-second"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* #region Extends */
%abs100 {
  position: absolute;
  width: 100%;
  height: 100%;
}

%flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* #endregion Extends */
/* #region Mixins */
@mixin rotation($duration) {
  animation-name: stepOn60;
  animation-duration: #{$duration};
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@mixin hand($height, $width) {
  content: "";
  position: absolute;
  height: #{$height};
  top: #{50% - $height};
  width: #{$width};
  left: #{50% - calc($width / 2)};
}

@mixin dot($width) {
  content: "";
  position: absolute;
  border-radius: 50%;
  top: #{50% - $width};
  left: #{50% - $width};
  width: #{$width * 2};
  height: #{$width * 2};
}
/* #endregion */
/* #region Variables */
$c-seconds: rgb(0, 255, 47);
$c-sec-axis: rgb(0, 255, 47);
$c-sec-glow: rgb(0, 255, 47);

$minutes-hand-width: 3%;

$c-minutes: rgb(32, 223, 67);
$c-min-axis: rgb(32, 223, 67);
$c-min-glow: rgb(32, 223, 67);

$seconds-hand-width: 2%;

$c-hours: hsl(131, 50%, 45%);
$c-hour-glow: hsl(131, 50%, 45%);
$c-hour-axis: hsl(131, 50%, 45%);

$c-lines: rgba(64, 191, 85, 0.68);
$c-circles: rgba(68, 196, 68, 0.32);

$size-circle: 9vmin;
$size-br-radius: 1vh;

$size-pad: 70vmin;
$size-main: 75vmin;
$size-second: 62vmin;
$size-minute: 63.5vmin;

$size-glow: 0.5vmax;
$size-glow-blur: 0.1vmax;
/* #endregion */
.neon-clock {
  margin: 0;
  width: 100dvw;
  height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

@keyframes seconding {
  0% {
    transform: rotate(0);
  }
  @for $step from 1 through 60 {

    #{calc($step * 1.666666%)} {
      transform: rotate(#{($step) * 6}deg);
    }
  }
}

.watch {
  & > * {
    opacity: 0.68;
  }
  margin: auto;
  width: $size-main;
  height: $size-main;
  position: relative;
  @extend %flex-center;
  border-radius: 50%;
  border-style: dotted;
  border-color: $c-circles;
  border-width: $size-circle;

  &__pad {
    opacity: 0.5;
    position: absolute;
    width: $size-pad;
    height: $size-pad;
    &-lines {
      stroke: $c-lines;
      stroke-width: 3px;
    }
  }

  &::after {
    content: "";
    border-radius: 50%;
  }

  &__seconds {
    width: $size-second;
    height: $size-second;
    position: absolute;
    z-index: 3;

    &-second {
      @extend %abs100;
      animation: seconding 60s var(--seconds) infinite;

      &::before {
        border-radius: $size-br-radius;
        @include hand(50%, $seconds-hand-width);
        background: $c-seconds;
        box-shadow: 0 0 $size-glow $size-glow-blur $c-sec-glow;
      }

      &::after {
        @include dot($seconds-hand-width);
        background: $c-sec-axis;
        box-shadow: 0 0 $size-glow $size-glow-blur $c-sec-glow;
      }
    }
  }

  &__minutes {
    width: $size-minute;
    height: $size-minute;
    position: absolute;
    z-index: 2;

    &-minute {
      @extend %abs100;
      animation: seconding 3600s linear var(--minutes) infinite;

      &::before {
        border-radius: $size-br-radius;
        @include hand(45%, $minutes-hand-width);
        background: $c-minutes;
        box-shadow: 0 0 $size-glow $size-glow-blur $c-min-glow;
      }

      &::after {
        @include dot($minutes-hand-width);
        background: $c-min-axis;
        box-shadow: 0 0 $size-glow $size-glow-blur $c-min-glow;
      }
    }
  }

  &__hours {
    @extend %abs100;
    z-index: 1;

    &-hour {
      @extend %abs100;
      animation: seconding 43200s linear var(--hours) infinite;

      &::before {
        border-radius: $size-br-radius;
        @include hand(40.5%, 4.5%);
        background: $c-hours;
        box-shadow: 0 0 $size-glow $size-glow-blur $c-hour-glow;
      }

      &::after {
        @include dot(4.5%);
        background: $c-hour-axis;
        box-shadow: 0 0 $size-glow $size-glow-blur $c-hour-glow;
      }
    }
  }
}

#back-box,
#six-box {
  position: absolute;
  width: 100vmax;
  height: 100vmax;
}

#back-box {
  opacity: 0.9;
}

#six-box {
  opacity: 0.5;

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
