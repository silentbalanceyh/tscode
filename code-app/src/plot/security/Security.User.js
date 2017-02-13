import $$ from '../../seed'
/**
 * 更改密码操作
 * @param params
 * @param config
 * @param dispatch
 * @param props
 * @private
 */
const _cipher = (params, config, {
  dispatch,
}) => {
  $$.Logger.Input.formInput(params,'_cipher',config)
  /**
   * 1. 构造输入参数
   * @type {{id: *, opassword: *, npassword: *}}
   */
  const input = {
    id: params['uniqueId'],
    opassword: $$.Tool.Encryptor.md5(params['opassword']),
    npassword: $$.Tool.Encryptor.md5(params['npassword'])
  }
  /**
   * 2. 构造reference参数
   */
  const reference = $$.Abrupt.Abysm.form({dispatch})
  /**
   * 3. Promise链式结构
   * * @type {any}
   */
  const promise = $$.Ajax.Promise;
  const api = $$.Secure.User;
  return promise.redux({
    promise: api.cipher,
    dispatch,
    response:$$.Op.Callback.execute,
  }, {input, config}, reference, true);
}

export default {
  _cipher
}
