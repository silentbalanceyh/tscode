import $$ from '../../seed'
/**
 * Oauth登录操作函数
 * @param input
 * @param config
 * @private
 */
const _oauth = (params, config, {
  dispatch,
}) => {
  /**
   * 1. 构造输入参数
   * @type {{username: *, password: *}}
   */
  const input = {
    username: params['username'],
    password: $$.Tool.Encryptor.md5(params['password']),
  }
  /**
   * 2. 构造reference变量
   * @type {string}
   */
  const reference = $$.Abrupt.Abysm.login({dispatch})
  /**
   * 3. Promise链式结构
   * @type {any}
   */
  const promise = $$.Ajax.Promise;
  const api = $$.Secure.Login;
  // End <----------------
  const fnLogin = promise.end(dispatch, 'token', reference, $$.Op.Callback.execute, true);
  // <--------------------
  const fnToken = promise.flow(api.token, fnLogin, 'code', reference);
  // <--------------------
  const fnAuthorize = promise.flow(api.authorize, fnToken, 'user', reference);
  // <-------------- Start
  return promise.start(api.auth, fnAuthorize, {input, config}, 'params', reference);
}

export default {
  _oauth
}
