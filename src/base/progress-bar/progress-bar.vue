<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper"
           ref="progressBtn"
           @touchstart="progressTouchStart"
           @touchmove="progressTouchMove"
           @touchend="progressEnd"
      >
        <div class="progress-btn" ref="progressBtnInner"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  //  import {prefixStyle} from 'common/js/dom'
  //  const transform = prefixStyle('transform')
  const progressBtnWidth = 16
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    watch: {
      percent(newPercent) {
        if (!this.touch.initFlag) {
          let newWidth = (this.$refs.progressBar.offsetWidth - progressBtnWidth) * newPercent
          this._offset(newWidth)
        }
      }
    },
    created() {
      this.touch = {}
    },
    methods: {
      progressTouchStart (e) {
        this.touch.initFlag = true
        this.touch.startX = e.touches[0].pageX
        this.touch.width = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        if (!this.touch.initFlag) {
          return
        }
        const deltax = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(this.$refs.progressBar.offsetWidth - progressBtnWidth, Math.max(0, this.touch.width + deltax))
        this._offset(offsetWidth)
      },
      progressEnd() {
        this.touch.initFlag = false
        this._triggerPercent()
      },
      progressClick (e) {
        const getBoundCR = this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth = e.pageX - getBoundCR.left
        console.log('progressClick offsetWidth:' + getBoundCR.left)
        this._offset(offsetWidth)
        this._triggerPercent()
      },
      _triggerPercent() {
        const percent = this.$refs.progress.clientWidth / (this.$refs.progressBar.offsetWidth - progressBtnWidth)
        console.log('percent' + percent)
        this.$emit('percentChange', percent)
      },
      _offset(newWidth) {
        this.$refs.progress.style.width = newWidth + 'px'
        this.$refs.progressBtn.style.left = newWidth - 8 + 'px'
//        this.$refs.progressBtn.style[transform] = `translate3d(${newWidth}px,0,0)`
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
