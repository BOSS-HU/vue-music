import {getLyric} from 'api/song'
import {ERR_OK} from 'api/config'
export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyricWraper() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    getLyric(this.mid).then(res => {
      if (res.retcode === ERR_OK) {
        this.lyric = res.lyric
        console.log('this.lyric:' + this.lyric)
      }
    })
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://thirdparty.gtimg.com/C100${musicData.songmid}.m4a?fromtag=38`
  })
}

function filterSinger(list) {
  if (!list) {
    return ''
  }
  let ret = []
  list.forEach((item) => {
    ret.push(item.name)
  })
  return ret.join('/')
}
