import Immutable from 'immutable'

class Menu{
  /**
   * 开始菜单
   * @param state
   */
  static start(state,{
    key
  }){
    const pathes = ["data",key]
    let $state = Immutable.fromJS(state)
    $state = $state.deleteIn(pathes.concat(['list']))
    $state = $state.setIn(pathes,{count:0})
    return $state.toJS()
  }
}

export default Menu
