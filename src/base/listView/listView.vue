<template>
  <scroll
    class="listview"
    ref="listview"
    :listenScroll="listenScroll"
    :probeType="probeType"
    @scroll="scroll"
  >
    <ul>
      <li v-for="(group,index) in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item" @click="selectSingerItem(item)">
            <img v-lazy="item.avatar" class="avatar" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove="onShortcutTouchMove">
      <li v-for="(item,index) in shortcutList"
          class="item"
          :class="{current:index===currentIndex}"
          :data-index="index"
      >{{item}}
      </li>
    </ul>
    <div class="list-fixed" ref="fixed">
      <div class="fixed-title" v-show="fixedTitle">{{fixedTitle}}</div>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import {getData} from 'common/js/dom'
  import loading from 'base/loading/loading'
  const liHeight = '18'
  const TITLE_HEIGHT = 30
  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1
      }
    },
    computed: {
      shortcutList() {
        return this.data.map((item) => {
          return item.title.substring(0, 1)
        })
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      }
    },
    watch: {
      data() {
//        监听singer传给listView的data改变的时候调用
        var This = this
        setTimeout(function () {
          This._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        const list = this.listHeight
//        当滚动到顶部 newY>0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        for (var i = 0; i < list.length - 1; i++) {
          let height1 = list[i]
          let height2 = list[i + 1]
          if (-newY >= height1 && -newY < height2) {
//            console.log('-newY=' + -newY + ',height1=' + height1 + ',height2=' + height2 + ',i=' + i)
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }
//        滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = list.length - 2
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translateY(${fixedTop}px)`
      }
    },
    components: {
      Scroll,
      loading
    },
    created() {
      this.touch = {}
      this.listenScroll = true
      this.probeType = 3
      this.listHeight = []
    },
    methods: {
      onShortcutTouchStart(e) {
        const index = getData(e.target, 'index')
        const firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.index = index
        this._scrollTo(index)
      },
      onShortcutTouchMove(e) {
        const firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        const index = parseInt(this.touch.index) + ((this.touch.y2 - this.touch.y1) / liHeight | 0)
        this._scrollTo(index)
      },
      scroll(pos) {
        this.scrollY = pos.y
//        console.log('this.scrollY::' + this.scrollY)
      },
      selectSingerItem(item) {
        this.$emit('selectSinger', item)
      },
      _scrollTo(index) {
//        console.log(index)
        if ((!index && index !== 0) || isNaN(index)) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      },
      _calculateHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (var i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
//        console.log('singer 传过来的data发生改变时调用 this.listHeight::' + this.listHeight)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
