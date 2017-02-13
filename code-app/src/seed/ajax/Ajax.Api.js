import HEADERS from './headers.json'
import Tool from '../tool'
import Assert from '../assert'
import Abrupt from '../abrupt'
import Logger from '../logger'
import Secure from '../secure'
import Sign from './Ajax.Sign'
import Shared from './Ajax.Shared'
// ------------------------------------
// Http Object
// ------------------------------------
import agent from 'superagent'
import Q from 'q'
// ------------------------------------
// 同异步切换函数
// ------------------------------------
const repdor = (defer, {uri, method}) => {
  return (err, res) => {
    if (err) {
      let error = {};
      if (res) {
        error = Abrupt.Response.error(res);
      } else {
        throw new Error(err);
      }
      defer.reject(error);
    } else {
      const data = res.body.data
      /**
      const cacheKey = Sign.cacheKey(uri, method)
      if (cacheKey && "get" == method) {
        Logger.Input.cache(uri, method, cacheKey, data, 'Write')
        Secure.Storage.writeData(cacheKey, data)
      }**/
      defer.resolve(res.body.data);
    }
  }
}

const request = (uri, params, method) => {
  const defer = Q.defer();
  if (Shared.token()) {
    agent[method](uri)
      .accept('application/json')
      .set(HEADERS.HTTP11.CONTENT_TYPE, 'application/json')
      .set(HEADERS.HTTP11.AUTHORIZATION, Shared.token())
      .send(params)
      .end(repdor(defer, {uri, method}));
  } else {
    agent[method](uri)
      .accept('application/json')
      .set(HEADERS.HTTP11.CONTENT_TYPE, 'application/json')
      .send(params)
      .end(repdor(defer, {uri, method}));
  }
  return defer.promise
}

const storage = (data = {}) => {
  // 1.封装Promise
  const defer = Q.defer();
  defer.resolve(data);
  return defer.promise
}
// ------------------------------------
// 异步回调
// ------------------------------------
const asyncRequest = (uri, params, method, callback) => {
  if (Shared.token()) {
    agent[method](uri)
      .accept('application/json')
      .set(HEADERS.HTTP11.CONTENT_TYPE, 'application/json')
      .set(HEADERS.HTTP11.AUTHORIZATION, Shared.token())
      .send(params)
      .end((err, res) => {
        if (!err) {
          callback(res.body.data)
        }
      });
  } else {
    agent[method](uri)
      .accept('application/json')
      .set(HEADERS.HTTP11.CONTENT_TYPE, 'application/json')
      .send(params)
      .end((err, res) => {
        if (!err) {
          callback(res.body.data)
        }
      });
  }
}
const asyncPost = (path, params = {}, callback) => {
  // 0.Uri
  const uri = Shared.endpoint(path)
  // 1.直接调用
  Shared.normalize(params)
  // Signature
  Sign.signature(path, "POST", params)
  Logger.Input.request(uri, "POST", params)
  asyncRequest(uri, params, 'post', callback)
}

const asyncGet = (path, params = {}, callback) => {
  // Code
  let uri = Shared.endpoint(path);
  Shared.normalize(params)
  // Signature
  Sign.signature(path, "GET", params)
  const queryStr = Tool.Builder.buildParams(params);
  uri = uri + queryStr;
  Logger.Input.request(uri, "GET", params)
  asyncRequest(uri, params, 'get', callback)
}
// ------------------------------------
// 同步方法专用
// ------------------------------------
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

const all = (promises = []) => {
  return Q.all(promises)
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
  Logger.Input.request(uri, "GET", params)
  return request(uri, params, 'get');
  /**
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
  }**/
}

export default {
  get,
  post,
  put,
  del,
  locator,
  storage,
  socket: Shared.socket,
  all,
  Async: {
    post: asyncPost,
    get: asyncGet
  }
}
