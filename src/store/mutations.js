//  muations
import * as types from './mutation-types'
const mutations = {
  [types.SET_SINGER](state, singer) {
    //  [types.SET_SINGER]  方法名
    //  state  当前的状态树
    //  提交mutation 传的payload  （参数）
    state.singer = singer
    // console.log('state.singer::::' + JSON.stringify(state.singer))
    //  state.singer  修改状态树
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  }
  // [types.SET_CURRENTSONG](state, currentSong) {
  //   state.currentSong = currentSong
  // }
}
export default mutations
