<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
    <div class="mine">
      <i class="icon-mine"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0;
    .icon
      display: inline-block
      vertical-align: top
      margin: 6px 9px 0 0
      width: 30px
      height: 32px
      bg-image('logo')
      background-size: 30px 32px;
    .text
      display: inline-block
      vertical-align: top
      line-height 44px
      font-size: 18px
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
</style>
