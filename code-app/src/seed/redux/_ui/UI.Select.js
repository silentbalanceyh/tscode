import Immutable from 'immutable'
import Kit from '../Redux.Kit'

class Select{
  static row(state, {
    selected,
    cid,
    path
  }){
    let $state = Immutable.fromJS(state);
    if(path){
      /** 设置了键值 **/
      $state = $state.setIn(path,selected);
    }else{
      /** 默认键值 **/
      $state = $state.setIn(['uex','selected','row'],selected);
    }
    $state = Kit.resetHash($state,cid,state)
    return $state.toJS();
  }
}

export default Select
