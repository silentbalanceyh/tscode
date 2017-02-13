import $$ from '../../../seed'
// ------------------------------------
// Action本身
// ------------------------------------
const initiate = (props = {}) => {
  return $$.Data.Form.initData(props)
}
/** 计算更新Form的加载时间 **/
const $_fnLoading = (props = {}) => {
  const {$_etat, data} = props
  let loading = true
  if ("EDIT" == $_etat || "VIEW" == $_etat) {
    if (data.initialValues && 0 < Object.keys(data.initialValues).length) {
      loading = true
    } else {
      loading = false
    }
  }
  return loading
}
// ------------------------------------
// Mapping Definition
// ------------------------------------
export default {
  initiate,
  $_fnLoading
}
