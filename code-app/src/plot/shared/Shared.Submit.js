import $$ from '../../seed'
import Validate from '../form'

const validate = (config, params) => {
  const {validate} = config.config
  if (validate) {
    let validated = true
    for (const key in validate) {
      /** 1.$LIST$变量特殊验证 **/
      if ("$LIST$" == key) {
        validated = Validate.Verify.validateList(validate[key], params[key])
        if (!validated) {
          return
        }
      }
    }
    return validated
  } else {
    return true
  }
}

const execute = (params, config, dispatch) => {
  /** 验证基本信息 **/
  if (validate(config, params)) {
    /** 1.构造Reference **/
    const reference = $$.Abrupt.Abysm.form({dispatch})
    /** 2.处理sigma **/
    if (config.sigma) params.sigma = config.sigma
    /** 3.处理CheckBox **/
    for (const key in params) {
      /** 4.Boolean值的转换 **/
      if ("on" == params[key] || "false" == params[key]) {
        params[key] = false
      }
      if ("true" == params[key]) {
        params[key] = true
      }
    }
    /** 4.处理password md5 加密 **/
    if (config.butoir && config.butoir.encryptFields) {
      for (const field in config.butoir.encryptFields) {
        for (const key in params) {
          if (config.butoir.encryptFields[field] == key) {
            params[key] = $$.Tool.Encryptor.md5(params[key])
            break
          }
        }
      }
    }
    return $$.Ajax.Promise.redux({
      promise: $$.Secure.Api.common,
      dispatch,
      response: $$.Op.Callback.execute
    }, {input: params, config}, reference, true)
  }
}

const filter = (params = {}) => {
  for (const key in params) {
    if (params[key] === undefined) {
      delete params[key]
    }
  }
}

const numeric = (params = {}) => {
  for (const key in params) {
    if (/^[0-9]+$/.test(params[key])) {
      params[key] = Number(params[key])
    }
  }
}

const prepare = (params = {}) => {
  $$.Plugin.JQuery.showMask()
  /** 1.过滤掉undefined参数 **/
  filter(params)
  /** 2.格式化数值参数 **/
  numeric(params)
  /** 3.注入附加参数 **/
  $$.Op.Pool.inject(params)
}

export default {
  prepare,
  execute
}
