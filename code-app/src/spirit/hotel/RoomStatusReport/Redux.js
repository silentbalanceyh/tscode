import $$ from '../../../seed'
import Immutable from 'immutable'
// ------------------------------------
// List初始化信息
// ------------------------------------
const initiate = (props = {}) => {
  return $$.Data.Init.initData(props,$$.Redux.Types.SUCCESS_GOONEY_DATA);
}
// ------------------------------------
// HTL系统专用，老代码放到服务端计算！
// ------------------------------------
const $_offMask = (props, prevProps) => {
  const newData = Immutable.fromJS(props['$_room'])
  const oldData = Immutable.fromJS(prevProps['$_room'])
  if (!Immutable.is(newData, oldData)) {
    $$.Plugin.JQuery.hiddenMask()
  }
}
export default {
  $_offMask,
  initiate
}
