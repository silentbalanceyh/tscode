import $$ from '../../../seed'
// ------------------------------------
// Action本身
// ------------------------------------
const initiate = (props = {}) => {
  return $$.Data.Init.initData(props);
}
// HTL系统专用
const $_fnExtractStatus = (tabular) => {
  /** 0.Flat Tabular **/
  let meta = $$.Entity.Array.tabular(tabular);
  /** 1.计算状态 **/
  return meta.filter((item) => item.type != 'room.type');
}
// ------------------------------------
// Mapping Definition
// ------------------------------------
export default {
  initiate,
  $_fnExtractStatus
}
