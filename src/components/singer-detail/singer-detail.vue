<template>
  <transition name="slide">
    <music-list :songs="songs" :singer="singer"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import musicList from 'components/music-list/music-list'
  import {createSong} from 'common/js/song'
  import {mapGetters} from 'vuex'
  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
//      singer() {
//        return this.$store.state.singer
//      }
      ...mapGetters([
        'singer'
      ])
    },
    created() {
//      console.log('this.singer:::' + this.singer)
      this._getDetail()
    },
    methods: {
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK
          ) {
            this.songs = this._normalizeSongs(res.data.list)
//        console.log('this.songs:' + JSON.stringify(this.songs))
          }
        })
      }
    },
    components: {
      musicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  /*@import "~common/stylus/variable"*/
  /*.singer-detail
    position: fixed
    z-index: 100
    top: 0
    right: 0
    bottom: 0
    left: 0
    background: $color-background*/
  .slide-enter-active, .slide-leave-active
    transition all .3s

  .slide-enter, .slide-leave-to
    transform: translateX(100%)

  /* transform: translate3d(100%, 0, 0)*/
</style>
