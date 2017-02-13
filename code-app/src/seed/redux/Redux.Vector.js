import Selector from './_selector'
import Immutable from 'immutable'
class Vector{

  static wrapper(props, dispatches){
    const $props = Immutable.fromJS(props).toJS()
    if(dispatches && dispatches.initiate) {
      $props['initiate'] = dispatches.initiate
    }
    return $props
  }

  static stdD2P(actions){
    return (dispatch) => {
      let dispatches = {dispatch};
      if (actions) {
        for (let key of Object.keys(actions)) {
          // 标准初始化流程
          if ('initiate' == key) {
            dispatches[key] = actions[key];
          } else {
            dispatches[key] = (state) => dispatch(actions[key](state));
          }
        }
      }
      return dispatches
    }
  }

  /**
   * 处理State -> Prop的函数，这里会影响性能，所以需要重新改写
   * @returns {function(*=)}
   */
  static modS2P(){
    return (state) => {
      return Selector.Module.ModSelector(state);
    }
  }
  static appS2P(){
    return (state) => {
      return {app: Selector.App.AppSelector(state)}
    }
  }
}

export default Vector
