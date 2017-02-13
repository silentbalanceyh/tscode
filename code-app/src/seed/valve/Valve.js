import Entity from '../entity'
import Required from './Valve.Required'
import Length from './Valve.Length'
import Same from './Valve.Same'
import Diff from './Valve.Diff'
import After from './Valve.After'
import Existing from './Valve.Existing'
import Duplicated from './Valve.Duplicated'
import LessEqual from './Valve.LessEqual'

import Q from 'q'
import Immutable from 'immutable'
// ------------------------------------
// 验证规则的函数映射关系
// ------------------------------------
const Verifier = {
  "required": Required,
  "length": Length,
  "same": Same,
  "diff": Diff,
  "after": After,
  "lesseq": LessEqual
}

const AsyncVerifier = {
  "existing": Existing,
  "duplicated": Duplicated
}
// ------------------------------------
// 验证规则触发顺序
// ------------------------------------
const ORDERS = [
  "required", "length", "same", "diff", "after", "lesseq"
]
// ------------------------------------
// 按字段构造验证规则链
// ------------------------------------
const buildRules = ({
  rules = []
}) => {
  const chainRules = {}
  rules.forEach((item) => {
    const {rule, config} = item;
    // 1.是否初始化过当前字段的rules
    if (!chainRules[item.field]) {
      chainRules[item.field] = {};
    }
    // 2.填充每个字段的规则
    chainRules[item.field][rule] = config;
  })
  return chainRules;
}

const verifyField = ({field, rule, value}) => {
  let error = {}
  for (let idx = 0; idx < ORDERS.length; idx++) {
    const current = ORDERS[idx]
    if (rule[current]) {
      const config = rule[current]
      config['name'] = field
      error = Verifier[current](config, value)
      if (0 < Object.keys(error).length) {
        break
      }
    }
  }
  return error
}

const verifyFields = ({field, rule, value}) => {
  /** 1.读取处理两rule **/
  const rules = {}
  for (const key in rule) {
    const idx = key.indexOf('.')
    if (0 < idx) {
      const ruleKey = key.substring(idx + 1)
      rules[ruleKey] = rule[key]
    }
  }
  /** 2.遍历数据值 **/
  return verifyField({field, rule: rules, value})
}
/** 配置validate **/
const config = (props) => {
  // 1.读取props
  const {datum = {}, form, config = {}} = props
  // 2.提取validate
  if (datum[form]) {
    const etat = datum[form].state
    // 3.提取验证规则
    const validators = config[etat].$_validate
    if (validators) return validators
  }
}
// ------------------------------------
// Valve Major Logical
// ------------------------------------
class Valve {
  /**
   * 关于Valve专用配置
   * @param value
   * @param props
   */
  static sync(value, props) {
    const validators = config(props)
    if (validators) {
      // 1.同步验证器
      const sync = validators.filter(item => (!item.async))
      return Valve.validate(sync, value)
    }
  }

  /**
   * Async异步验证专用
   * @param value
   * @param props
   */
  static async(value, props) {
    const validators = config(props)
    if (validators) {
      // 1.异步验证器
      const async = validators.filter(item => (item.async))
      if (0 < async.length) {
        return Valve.asyncValidate(async, value)
      }
    }
    // 2.提供空异步验证
    return Q.all([]).then((data = []) => {})
  }

  /**
   * 同步验证
   * @param rules
   * @param value
   * @returns {{}}
   */
  static validate(rules = [], value) {
    let errors = {}
    // 基于单个字段执行规则检查
    const chainRules = buildRules({rules});
    for (const key in chainRules) {
      const field = key
      const rule = chainRules[key]
      const item = value[key]
      let error;
      if (Array.prototype.isPrototypeOf(item)) {
        error = verifyFields({field, rule, value})
      } else {
        // 如果字段存在则验证单个字段
        error = verifyField({field, rule, value})
      }
      errors = Entity.Data.mergeReference(errors, error)
    }
    return errors;
  }

  /**
   * 异步验证专用
   * @param rules
   * @param value
   */
  static asyncValidate(rules = [], value) {
    /** 1.读取Rules信息 **/
    const chainRules = buildRules({rules});
    let promises = []
    let errors = []
    for (const key in chainRules) {
      const field = key;
      const rules = chainRules[key];
      /** 2.每个字段的每个Rule需要构造一个Promise **/
      for (const rule in rules) {
        const config = rules[rule]
        config.name = field
        const promise = AsyncVerifier[rule](config, value)
        if (promise) {
          promises.push(promise)
          /** 3.promises处理时，和数组对应上读取错误信息 **/
          const error = {}
          error[field] = config.message
          errors.push(error)
        }
      }
    }
    return Q.all(promises).then((data = []) => {
      /** 4.构造最终错误信息 **/
      let error = Immutable.fromJS({})
      for (let idx = 0; idx < data.length; idx++) {
        const result = data[idx]
        if ("object" == typeof(result)) {
          /** Local验证基础 **/
          error = error.merge(result)
        } else {
          /** Remote验证 **/
          if (!result) error = error.merge(errors[idx])
        }
      }
      /** 5.最终验证结果 **/
      if (0 < error.size) {
        throw error.toJS()
      }
    })
  }
}

export default Valve
