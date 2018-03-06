//  对state做映射  取state的数据
export const singer = state => state.singer
//  相当于
// export const singer = function (state) {
//   return state.singer
// }
// console.log('singer:::' + singer)
export const playing = state => state.playing
export const fullScreen = state => state.fullScreen
export const playlist = state => state.playlist
export const sequenceList = state => state.sequenceList
export const mode = state => state.mode
export const currentIndex = state => state.currentIndex
export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
  // return state.currentSong || {}
}
