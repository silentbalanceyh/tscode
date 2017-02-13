import Assert from '../assert'
import Abrupt from '../abrupt'
import Logger from '../logger'
import Q from 'q'

/**
 * 并行的Promise，并行Promise相互之间不影响
 * @param promises 所有构建的promises
 * @param dispatch dispatch专用函数
 * @param reference 传入的reference信息
 * @param response 如果提供了响应函数，则处理响应函数
 * @returns {*}
 */
const parallel = (promises, dispatch, reference = {}, response) => {
  /** 1.Keys数组 **/
  const keys = [];
  /** 2.构建Promise数组 **/
  const promiseArr = [];
  for (const key in promises) {
    keys.push(key);
    promiseArr.push(promises[key]);
  }
  /** 3.直接调用promise处理最终项 **/
  const promise = Q.all(promiseArr);
  /** Inject到data节点 **/
  reference['data'] = {};
  const timer = new Logger.Timer('Parallel Promise', 'parallel(promises, dispatch, reference, response)')
  timer.start()
  return promise.then(data => {
    timer.end()
    /** 基本统计 **/
    timer.output(`Promise Counter: ${promiseArr.length}`)
    /** 4.处理响应结果 **/
    for (let idx = 0; idx < keys.length; idx++) {
      reference['data'][keys[idx]] = data[idx];
    }
    if (response) {
      return dispatch(response(reference));
    } else {
      return dispatch(reference);
    }
  }).fail(Abrupt.Response.exec(reference));
}
/**
 * Redux函数处理
 * @param promise
 * @param dispatch
 * @param key
 * @param reference
 */
const redux = ({promise, dispatch, response}, params, reference = {}, pure = false) => {
  // dispatch,response -> Function
  // params -> Object
  // promise -> Promise
  Assert.isArrayFunction({dispatch, response});
  Assert.isObject({params});

  promise = promise(params);
  Assert.isPromise({promise});
  // Code
  reference['params'] = params;
  return promise.then((data) => {
    reference['response'] = data;
    if (pure) {
      response(reference);
    } else {
      return dispatch(response(reference));
    }
  }).fail(Abrupt.Response.exec(reference));
}

/**
 * 生成中间的Promise链接
 * @param promise
 * @param thenFun
 * @param key
 * @param reference
 * @returns {function(*=)}
 */
const flow = (promise, thenFun, key, reference = {}) => {
  // thenFun -> Function
  // key -> String
  Assert.isFunction({thenFun});
  Assert.isString({key});
  return (_prev) => {
    return (_next) => {
      reference[key] = _next;
      promise = promise({
        current: _next,
        prev: _prev,
      })
      // promise -> Promise
      Assert.isPromise({promise});
      return promise.then(thenFun(_next, key)).fail(Abrupt.Response.exec(reference));
    }
  };
}

/**
 *
 * @param config
 * @param thenFun
 * @param key
 * @param reference
 * @param buildFun
 * @returns {function()}
 */
const flowArray = (config, thenFun, key, reference = {}, buildFun) => {
  // thenFun, buildFun -> Function
  // key -> String
  Assert.isArrayFunction({thenFun, buildFun});
  Assert.isString({key});
  return () => {
    return (_next) => {
      reference[key] = _next;
      // _next -> Object( list )
      Assert.isDefinedKey({_next}, ['list']);
      const promises = buildFun(_next.list, config);
      // promises -> Promise
      Assert.isPromise({promises});
      return promises.then(thenFun(_next, key)).fail(Abrupt.Response.exec(reference));
    }
  };
}

/**
 *
 * @param promise
 * @param thenFun
 * @param params
 * @param key
 * @param reference
 */
const start = (promise, thenFun, params, key, reference = {}) => {
  // params -> Object
  // thenFun -> Function
  // key -> String
  Assert.isObject({params});
  Assert.isFunction({thenFun});
  Assert.isString({key});
  reference[key] = params;
  // promise -> Promise
  promise = promise(params);
  Assert.isPromise({promise});
  return promise.then(thenFun(params, key)).fail(Abrupt.Response.exec(reference));
}

/**
 * 3.结束用的Redux返回函数
 * @param dispatch
 * @param params
 */
const end = (dispatch, key, reference = {}, reduxFun, pure = false) => {
  // dispatch, reduxFun -> Function
  // key -> String
  Assert.isFunction({dispatch});
  Assert.isString({key});
  return () => {
    return (_next) => {
      reference[key] = _next;
      if (pure) {
        return reduxFun(reference);
      } else {
        if (reduxFun) {
          return dispatch(reduxFun(reference));
        } else {
          return dispatch(reference);
        }
      }
    }
  };
}

export default {
  parallel,
  start,
  end,
  redux,
  flow,
  flowArray
}
