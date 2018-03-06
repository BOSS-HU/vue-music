//  通常定义一个vuex需要
// 1.定义原始的数据（定义state）
// 2.getter对数据的一层映射（根据state不同的值计算一个新的值，可以写复杂判断逻辑）
// 3.定义mutation-types（看有哪些修改动作）
// 4.定义mutations
//  管理所有状态
import {playMode} from 'common/js/config'
const state = {
  //  获取每个歌手的详情 在singer.vue用到
  singer: {},
  //  播放器begin  获取播放状态,是播放还是暂停
  playing: false,
  //  播放器的展开和收起
  fullScreen: false,
  //  播放的列表
  playlist: [],
  //  顺序播放的列表
  sequenceList: [],
  //  播放的模式
  mode: playMode.sequence,
//  播放器end  当前的播放歌曲的索引
  currentIndex: -1
}
export default state
