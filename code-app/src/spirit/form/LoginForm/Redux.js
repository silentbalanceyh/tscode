import $$ from '../../../seed'
// ------------------------------------
// Action本身
// ------------------------------------
const initiate = (props = {}) => {
  return $$.Data.Form.initData(props)
}
// ------------------------------------
// Action本身
// ------------------------------------
const $_fnCallback = (reference) => {
  /** 1.读取用户相关信息 **/
  const {token, user} = reference
  /** 2.将用户信息合并 **/
  const session = $$.Entity.Data.merge(token, user);
  /** 3.写入用户Session **/
  $$.Cache.Session.put($$.Cache.Key.SESSION, session);
}
// ------------------------------------
// Mapping Definition
// ------------------------------------
export default {
  $_fnCallback,
  initiate
}
