import $$ from '../../seed'
// ------------------------------------
// Action本身
// ------------------------------------
const initiate = (props = {}) => {
  return $$.Data.Init.initData(props);
}
// ------------------------------------
// Mapping Definition
// ------------------------------------
export default {
  initiate
}
