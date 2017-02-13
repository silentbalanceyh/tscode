import $$ from '../../seed'
// ------------------------------------
// Action本身
// ------------------------------------
const initiate = (props = {}) => {
  return $$.Data.Init.initData(props,$$.Redux.Types.SUCCESS_ARBOR_DATA);
}
// ------------------------------------
// Mapping Definition
// ------------------------------------
export default {
  initiate
}
