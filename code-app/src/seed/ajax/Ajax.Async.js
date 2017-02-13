import HEADERS from './headers.json'
import Tool from '../tool'
import Logger from '../logger'
import Assert from '../assert'
import Abrupt from '../abrupt'
import Secure from '../secure'
import Shared from './Ajax.Shared'
import Sign from './Ajax.Sign'

import Q from 'q'
import agent from 'superagent'

// ------------------------------------
// 异步切换函数
// ------------------------------------
const repdor = ({ resolve, reject }, {uri, method}) => {
  const timer = new Logger.Timer(`Ajax ${uri} - ${method}`,`repdor({resolve,reject},{uri,method})`)
  timer.start()
  return (err, res) => {
    timer.end()
    timer.output()
    /** 基本统计 **/
    if (err) {
      let error = {};
      if (res) {
        error = Abrupt.Response.error(res);
      } else {
        throw new Error(err);
      }
      reject(error);
    } else {
      const data = res.body.data
      const cacheKey = Sign.cacheKey(uri, method)
      if (cacheKey && "get" == method) {
        Logger.Input.cache(uri, method, cacheKey, data, 'Write')
        Secure.Storage.writeData(cacheKey, data)
      }
      resolve(res.body.data);
    }
  }
}

const request = (uri, params, method) => {
  return Q.Promise((resolve,reject) => {
    if (Shared.token()) {
      agent[method](uri)
        .accept('application/json')
        .set(HEADERS.HTTP11.CONTENT_TYPE, 'application/json')
        .set(HEADERS.HTTP11.AUTHORIZATION, Shared.token())
        .send(params)
        .end(repdor({resolve,reject}, {uri, method}));
    } else {
      agent[method](uri)
        .accept('application/json')
        .set(HEADERS.HTTP11.CONTENT_TYPE, 'application/json')
        .send(params)
        .end(repdor({resolve,reject}, {uri, method}));
    }
  })
}

const storage = (data = {}) => {
  // 1.封装Promise
  return Q.Promise((resolve,reject) => {
    if(data){
      resolve(data)
    }else{
      reject(data)
    }
  })
}

const locator = (method, path, params = {}, refresh) => {
  // path -> String
  Assert.isString({path});
  // Code
  let promise = {};
  switch (method) {
    case "POST":
      promise = post(path, params);
      break;
    case "PUT":
      promise = put(path, params);
      break;
    case "DELETE":
      promise = del(path, params);
      break;
    default:
      promise = get(path, params, refresh);
      break;
  }
  return promise;
}

const get = (path, params = {}, refresh) => {
// path -> String
  Assert.isString({path});
  // Code
  let uri = Shared.endpoint(path);
  Shared.normalize(params)
  // Signature
  Sign.signature(path, "GET", params)
  const queryStr = Tool.Builder.buildParams(params);
  uri = uri + queryStr;
  if(refresh){
    Logger.Input.request(uri, "GET", params)
    return request(uri, params, 'get');
  }else {
    // 1.封装Promise
    // Get才加入缓存
    const data = Shared.readCache(uri, 'get')
    if (data) {
      return storage(data)
    } else {
      Logger.Input.request(uri, "GET", params)
      return request(uri, params, 'get');
    }
  }
}

const del = (path, params = {}) => {
  // path -> String
  Assert.isString({path});
  // Code
  let uri = Shared.endpoint(path);
  // 0.封装Promise
  Shared.normalize(params)
  // Signature
  Sign.signature(path, "DELETE", params)
  const queryStr = Tool.Builder.buildParams(params);
  uri = uri + queryStr;
  Logger.Input.request(uri, "DELETE", params)
  return request(uri, params, 'del');
}

const post = (path, params = {}) => {
  // path -> String
  Assert.isString({path});
  const uri = Shared.endpoint(path);
  // 0.封装Promise
  Shared.normalize(params)
  // Signature
  Sign.signature(path, "POST", params)
  /** 注入签名值 **/
  Logger.Input.request(uri, "POST", params)
  return request(uri, params, 'post');
}

const put = (path, params = {}) => {
  // path -> String
  Assert.isString({path});
  // Code
  const uri = Shared.endpoint(path);
  // 0.封装Promise
  Shared.normalize(params)
  // Signature
  Sign.signature(path, "PUT", params)
  Logger.Input.request(uri, "PUT", params)
  return request(uri, params, 'put');
}
export default {
  get,
  post,
  put,
  del,
  storage,
  locator
}
