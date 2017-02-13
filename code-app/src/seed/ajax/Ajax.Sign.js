import moment from 'moment'
import Encryptor from '../tool/Tool.Encryptor'
import Assert from '../assert'
import Logger from '../logger'
import Cache from '../cache'
import CONFIG from '../vie.json'
// ------------------------------------
// Private Function
// ------------------------------------
/** **/
const _secret = (seed) => {
  const user = Cache.Session.get(Cache.Key.SESSION)
  let secret = moment().format("YYYYMMDDHH")
  if (user && 'object' == typeof(user)) {
    seed += user.uniqueId
    secret = user.token
  }
  return {seed, secret}
}
/** **/
const _parameters = (params = {}) => {
  let param = ''
  const keys = Object.keys(params).sort()
  if (0 < keys.length) {
    keys.forEach(key => {
      if ("pager" == key) {
        /** 1.Pager参数专用签名 **/
        let pager = params[key]
        if ("string" == typeof(params[key])) {
          pager = JSON.parse(params[key])
        }
        if(pager) {
          let sign = `:index${pager.index}size${pager.size}`
          param += key + sign + ':'
        }else{
          param += key + ':'
        }
      } else {
        /** 这两个参数不参加签名 **/
        if ("criterias" != key) {
          if (params[key]) {
            if ("object" == typeof(params[key])) {
              param += key + JSON.stringify(params[key]) + ':'
            } else {
              param += key + params[key] + ':'
            }
          } else {
            /** 特殊Boolean值的签名 **/
            if (false === params[key]) {
              param += key + "false:"
            } else if (undefined !== params[key]) {
              param += key + params[key] + ':'
            }
          }
        }
      }
    })
  }
  return param
}
// ------------------------------------
// Public Function Interface
// ------------------------------------
/**
 *
 * @param uri
 * @param method
 * @constructor
 */
const cacheKey = (uri, method) => {
  // uri -> String
  Assert.isString({uri});
  if (method) {
    let seed = method.toUpperCase()
    seed = `${seed}:${uri}`
    return Encryptor.md5(seed)
  }
}
/** 直接Uri计算Sig **/
const signature = (uri, method, params) => {
  // uri -> String
  Assert.isString({uri});
  /** 1.构造签名的Method **/
  let seed = method.toUpperCase();
  seed += ":";
  seed += _parameters(params)
  seed += `${CONFIG['REST']['ENDPOINT']}${uri}`;
  seed += "$";
  /** 2.构造secret **/
  const secretObj = _secret(seed)
  seed = secretObj.seed;
  const secret = secretObj.secret;
  /** 3.签名 **/
  const sig = Encryptor.hmSha512(seed, secret);
  Logger.Input.sign(uri, method, params, {
    sig, secret, seed
  });
  /** 4.注入 **/
  params['sig'] = sig
}

export default {
  signature,
  cacheKey
}
