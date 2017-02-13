import Immutable from 'immutable'
import Kit from '../Redux.Kit'

class Tab {
  /**
   * 统一处理三个事件
   * SUCCESS_UI_FORM_CLEAN
   * SUCCESS_UI_FORM_ETAT
   * SUCCESS_UI_TAB_SELECT
   * @param state
   */
  static dynamic(state, {
    uex:{tabpage = {}},
    cid,
    config = {}
  }) {
    // 提取Form的状态以及cid
    const {etat, form} = config
    let $state = Immutable.fromJS(state)

    // 事件SUCCESS_UI_FORM_CLEAN
    let pathes = ['data', 'form', form, 'initialValues']
    if(config.init){
      $state = $state.setIn(pathes, config.init)
    }else {
      $state = $state.setIn(pathes, {})
    }

    // 事件SUCCESS_UI_FORM_ETAT
    pathes = ['data', 'form', form, 'state']
    $state = $state.setIn(pathes, etat)

    // 事件SUCCESS_UI_TAB_SELECT
    let items = $state.getIn(['uex', 'tab', 'headers']).toJS()
    items = items.filter(item => item.key != tabpage.key)
    items.push(tabpage);
    const tabIndex = items.length - 1
    $state = $state.setIn(['uex', 'tab', 'headers'], items)
    $state = $state.setIn(['uex', 'tab', 'active'], tabIndex)
    // 如果cid有值则写cid
    $state = Kit.resetHash($state, cid, state)
    return $state.toJS()
  }

  /**
   * 执行State的Tab移动
   * @param state
   * @param action
   */
  static moving(state, {
    uex:{tabIndex = 0},
    cid
  }) {
    let $state = Immutable.fromJS(state);
    let items = $state.getIn(['uex', 'tab', 'headers']).toJS();
    tabIndex = tabIndex < items.length - 1 ? tabIndex : items.length - 1;
    $state = $state.setIn(['uex', 'tab', 'active'], tabIndex);
    // 1.写入cid的值
    $state = Kit.resetHash($state, cid, state)
    return $state.toJS();
  }

  /**
   * 执行State的Tab移动
   * @param state
   * @param tabIndex
   */
  static removing(state, {
    uex:{tabIndex},
    cid
  }) {
    let $state = Immutable.fromJS(state);
    /** 如果tabIndex没有传入，则读取原始的 **/
    const activeIndex = $state.getIn(['uex','tab','active'])
    if(!tabIndex) tabIndex = activeIndex
    /** 处理最终关闭效果 **/
    let items = $state.getIn(['uex', 'tab', 'headers']).toJS();
    items = items.filter((item, idx) => idx != tabIndex);
    tabIndex = tabIndex - 1;
    $state = $state.setIn(['uex', 'tab', 'headers'], items);
    $state = $state.setIn(['uex', 'tab', 'active'], tabIndex);
    // 1.写入cid的值
    $state = Kit.resetHash($state, cid, state)
    return $state.toJS();
  }

  /**
   * 直接切换active激活路径
   * @param state
   * @param index
   * @param path
   * @param cid
   */
  static hit(state, {
    uex:{path, active = 0},
    cid
  }){
    if(path){
      /** 1.读取Path中的信息 **/
      let $state = Immutable.fromJS(state);
      $state = $state.setIn(path, active);
      /** 2.写入cid的值 **/
      $state = Kit.resetHash($state, cid, state)
      return $state.toJS();
    }else{
      return state
    }
  }
  /**
   * 执行State的Tab更新
   * @param state
   * @param tabpage
   * @returns {*|any}
   */
  static select(state, {
    uex:{tabpage},
    cid
  }) {
    let $state = Immutable.fromJS(state);
    let items = $state.getIn(['uex', 'tab', 'headers']).toJS();
    items = items.filter(item => item.key != tabpage.key);
    items.push(tabpage);
    const tabIndex = items.length - 1;
    $state = $state.setIn(['uex', 'tab', 'headers'], items);
    $state = $state.setIn(['uex', 'tab', 'active'], tabIndex);
    // 1.写入cid的值

    $state = Kit.resetHash($state, cid, state)
    return $state.toJS();
  }
}

export default Tab
