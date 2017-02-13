import Binary from './Criteria.Binary'
import Ternary from './Criteria.Ternary'
import Quaternary from './Criteria.Quaternary'
import Connect from './Criteria.Connect'
import Input from './Criteria.Input'

import Assert from '../assert'
import Immutable from 'immutable'

const builder = {
  "EQ": Ternary.eq,
  "IN": Ternary.in,
  "LIKE": Quaternary.like
}

const andor = (array, and = true) => {
  /** 1.生成Immutable **/
  const $array = Immutable.fromJS(array)
  /** 2.构造参数链 **/
  if (0 == array.length) {
    return {}
  } else {
    let criteria = $array.get(0).toJS()
    /** 3.构造后续 **/
    $array.forEach((value, idx) => {
      if (0 < idx) {
        const connected = value.toJS()
        if (and) {
          criteria = Connect.and(criteria, connected)
        } else {
          criteria = Connect.or(criteria, connected)
        }
      }
    })
    return criteria
  }
}

const valid = (value) => {
  let valid = false
  if (value) {
    /** Array合法性 **/
    if (Array.prototype.isPrototypeOf(value)) {
      if (value.length && 0 < value.length) {
        valid = true
      }
    } else {
      valid = true
    }
  }
  return valid
}

const generate = (criterias = {}, params, and = true) => {
  /** 1.遍历params提交参数 **/
  const chains = []
  for (const name in params) {
    /** 2.提交查询参数 **/
    const value = params[name]
    if (valid(value)) {
      const config = criterias[name]
      /** 3.提取Function **/
      if(config) {
        const fnBuild = builder[config.op]
        Assert.isFunction({fnBuild})
        chains.push(fnBuild(name, value, config))
      }
    }
  }
  /** 4.处理最终生成的查询链 **/
  return andor(chains, and)
}

export default {
  generate,
  analyze:Input.analyze
}
