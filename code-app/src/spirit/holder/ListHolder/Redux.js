import $$ from '../../../seed'
/** 移动Tab专用Redux方法 **/
const $_fnTabMoving = (tabIndex, dispatch, cid) => () => {
  $$.Assert.isFunction({dispatch});
  return dispatch({type: $$.Redux.Types.SUCCESS_UI_TAB_MOVING, uex: {tabIndex}, cid});
}

const $_fnTabClosing = (tabIndex, dispatch, cid) => () => {
  $$.Assert.isFunction({dispatch});
  return dispatch({type: $$.Redux.Types.SUCCESS_UI_TAB_REMOVING, uex: {tabIndex}, cid});
}
/** 添加Tab专用Redux方法 **/
const initiate = (props = {}) => {
  return $$.Data.Init.initData(props);
}

export default {
  $_fnTabMoving,
  $_fnTabClosing,
  initiate
}
