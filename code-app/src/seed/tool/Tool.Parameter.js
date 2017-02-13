import Entity from '../entity'
import Criteria from '../criteria'
import moment from 'moment'
import Immutable from 'immutable'

class Parameter {
  /**
   * 处理所有的Api，Method，Parameter信息
   * @param config
   * @param params
   */
  static prepare(props, config, params = {}) {
    /** 1.抽取config中的所有信息 **/
    const {input, uri, method = "GET", orders = []} = config;
    /** 2.读取所有参数集合 **/
    const inputs = Parameter.extract(props, input, orders);
    /** 3.处理input中会涉及的所有参数 **/
    const procssed = Parameter.pattern(uri, inputs);
    /** 4.防止多个assist的参数合并 **/
    const $params = Immutable.fromJS(params)
    const parameters = Parameter.merge($params.toJS(), inputs, procssed.params);
    /** 5.处理特殊查询参数 **/
    parameters.criterias = JSON.stringify(Criteria.analyze(parameters.criterias, props))
    if ('{}' == parameters.criterias) {
      delete parameters.criterias
    }
    /** 6.移除已经替换过的，严格规范签名信息 **/
    procssed.removed.forEach(key => {
      delete parameters[key]
    })
    /** 7.处理成String **/
    return {
      method,
      parameters,
      api: procssed.api
    }
  }


  /**
   * 读取query参数
   * @param props
   * @param config
   * @param params
   */
  static query(props, config, params = {}) {
    /** 1.处理参数集 **/
    const prepared = Parameter.prepare(props, config, params);
    /** 2.仅抽取query参数 **/
    const parameters = prepared.parameters;
    const ret = {};
    for (const key in parameters) {
      if ("orders" == key || "criterias" == key || "filters" == key || "pager" == key) {
        if (parameters[key]) {
          ret[key] = JSON.parse(parameters[key])
        } else {
          if ("pager" == key) {
            // Pager默认值，不可为空
            ret[key] = {index: 1, size: 10}
          }
        }
      }
    }
    return ret;
  }

  /**
   *
   * @param params
   * @param inputs
   * @param removed
   */
  static merge(params, inputs, removed) {
    /** 1.合并 **/
    params = Object.assign(params, inputs);
    /** 2.将removed中的参数移除掉 **/
    for (const key in removed) {
      delete params[key];
    }
    return params;
  }

  static extract(props, input = {}, orders) {
    /** 1.提取所需参数 **/
    const params = {};
    /** 2.遍历input **/
    for (const key in input) {
      const pathes = input[key]
      /** 支持固定值的input，只要不是路径值，则直接设为input的值 **/
      if (!Array.prototype.isPrototypeOf(pathes)) {
        if ("$NOW$" == pathes) {
          params[key] = moment().toISOString()
        } else if ("$NOWDAY$" == pathes) {
          params[key] = moment().format("YYYY-MM-DD")
        } else {
          params[key] = pathes;
        }
      } else {
        let replaced;
        if ("orders" == key) {
          replaced = Entity.Data.lookup(props, pathes, [])
          if (0 == replaced.length) {
            /** 3.将默认orders和最新orders合并 **/
            replaced = replaced.concat(orders);
          }
        } else {
          replaced = Entity.Data.lookup(props, pathes)
        }
        /** 4.只有object才执行JSON.stringify **/
        if (moment.isMoment(replaced)) {
          params[key] = replaced.toISOString();
        } else if ('object' == typeof(replaced)) {
          params[key] = JSON.stringify(replaced);
        } else {
          params[key] = replaced
        }
      }
    }
    return params;
  }

  static pattern(uri, inputs = {}) {
    /** 1.遍历input **/
    const params = {};
    let api = uri;
    /** 2.遍历input **/
    const removed = []
    for (const key in inputs) {
      const reg = new RegExp(`:${key}`, 'g');
      if (reg.test(api)) removed.push(key)
      const replacedApi = api.replace(reg, inputs[key]);
      if (replacedApi != api) {
        params[key] = inputs[key];
        api = replacedApi;
      }
    }
    /** 3.最终返回移除掉的信息 **/
    return {
      api,
      params,
      removed
    }
  }
}

export default Parameter
