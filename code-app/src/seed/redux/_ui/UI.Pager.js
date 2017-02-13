import Immutable from 'immutable'
import Bitrary from '../Redux.Bitrary'
import Kit from '../Redux.Kit'

class Pager {

  static reload(state, {
    cid,
    key = []
  }) {
    let $state = Immutable.fromJS(state);
    /** 专用Reload **/
    $state = $state.setIn(key, Bitrary.string(16))
    $state = Kit.resetHash($state, cid, state)
    return $state.toJS()
  }

  static index(state, {
    index,
    cid
  }) {
    // 插件加载界面效果
    index = Number(index);
    let $state = Immutable.fromJS(state);
    $state = $state.setIn(['query', 'pager', 'index'], index);
    $state = $state.setIn(['uex', 'selected', 'row'], -1);
    $state = Kit.resetHash($state, cid, state)
    return $state.toJS();
  }

  static size(state, {
    size,
    cid
  }) {
    // 插件加载界面效果
    size = Number(size);
    let $state = Immutable.fromJS(state);
    $state = $state.setIn(['query', 'pager', 'size'], size);
    $state = $state.setIn(['uex', 'selected', 'row'], -1);
    $state = Kit.resetHash($state, cid, state)
    return $state.toJS();
  }

  static sort(state, {
    orders,
    cid
  }) {
    // 插件加载界面效果
    let $state = Immutable.fromJS(state);
    $state = $state.setIn(['query', 'orders'], orders);
    $state = $state.setIn(['uex', 'selected', 'row'], -1);
    // 1.写入cid的值
    $state = Kit.resetHash($state, cid, state)
    return $state.toJS();
  }
}

export default Pager
