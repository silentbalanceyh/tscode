import CONFIG from '../vie.json'
import Cache from '../cache'
import Secure from '../secure'
import Sign from './Ajax.Sign'
import Logger from '../logger'
// ------------------------------------
// 功能类
// ------------------------------------

const _path = (config, path) => {
  // path -> String
  // Code
  const HOST = CONFIG['HOST']
  const endpoint = `http://${HOST}:${config['PORT']}${config['ENDPOINT']}`
  if (path) {
    return `${endpoint}${path}`
  } else {
    return endpoint
  }
}
/**
 * Endpoint计算
 * @param path
 * @returns {string}
 */
const endpoint = (path) => {
  // path -> String
  // Code
  return _path(CONFIG['REST'], path);
}
/**
 * Web Socket计算
 * @param path
 * @returns {string}
 */
const socket = (path) => {
  // path -> String
  // Code
  return _path(CONFIG['SOCK'], path);
}
/**
 * Token设置
 */
const token = () => {
  const user = Cache.Session.get(Cache.Key.SESSION)
  /** 1.处理Token **/
  if (user && 'object' == typeof(user)) {
    /** 2.Token值计算 **/
    const schema = Cache.Session.get(Cache.Key.SCHEMA)
    /** 3.Schema读取 **/
    const content = Secure.Api.token(user, schema)
    /** 4.最终头 **/
    const authorization = `${schema} ${content}`
    return authorization
  }
}


/**
 * 单独处理时间参数
 * @param parameters
 */
const normalize = (parameters) => {
  for (const key in parameters) {
    const value = parameters[key]
    if (undefined != value && value.utc) {
      parameters[key] = value.toISOString()
    }
  }
}

const readCache = (uri, method) => {
  const cacheKey = Sign.cacheKey(uri, method)
  if (cacheKey) {
    const data = Secure.Storage.readData(cacheKey)
    Logger.Input.cache(uri, method, cacheKey, data)
    if (data) {
      return data
    }
  }
}

export default {
  endpoint,
  token,
  socket,
  normalize,
  readCache
}
