import $$ from '../../../seed'
import Random from 'random-js'
// ------------------------------------
// Action本身
// ------------------------------------
const initiate = (props = {}) => {
  return $$.Data.Init.initData(props);
}

const $_fnKey = () => {
  const engine = Random.engines.mt19937().autoSeed()
  return Random.string()(engine, 8)
}
// ------------------------------------
// Connect操作
// ------------------------------------
const $_fnConnect = (props = {}) => {
  const {children, $_connect = {}} = props
  const result = {}
  for (const key in $_connect) {
    const idxes = $_connect[key]
    if (Array.prototype.isPrototypeOf(idxes)) {
      const multi = []
      idxes.forEach(idx => {
        if (children[idx]) {
          multi.push(children[idx])
        }
      })
      result[String(key)] = multi
    } else {
      if (children[idxes]) {
        result[String(key)] = children[idxes]
      }
    }
  }
  return result
}
export default {
  initiate,
  $_fnKey,
  $_fnConnect
}
