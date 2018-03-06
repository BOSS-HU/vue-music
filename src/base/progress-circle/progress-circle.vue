<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" version="1.1" viewBox=" 0 0 100 100"
         xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" class="progress-background" fill="transparent"/>
      <circle r="50" cx="50" cy="50" class="progress-bar" fill="transparent" :stroke-dasharray="dashArray"
              :stroke-dashoffset="dashOffset" />
    </svg>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      },
      radius: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        dashArray: Math.PI * 100
      }
    },
    computed: {
      dashOffset() {
        return (1 - this.percent) * this.dashArray
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-circle
    position: relative
    circle
      stroke-width: 8px
      transform-origin: center
      &.progress-background
        transform: scale(0.9)
        stroke: $color-theme-d
      &.progress-bar
        transform: scale(0.9) rotate(-90deg)
        stroke: $color-theme
</style>
