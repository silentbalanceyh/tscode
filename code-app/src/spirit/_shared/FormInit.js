import $$ from '../../seed'
// ------------------------------------
// Action本身
// ------------------------------------
const initiate = (props = {}) => {
  return $$.Data.Form.initData(props)
}
// ------------------------------------
// Mapping Definition
// ------------------------------------
export default {
  initiate
}
