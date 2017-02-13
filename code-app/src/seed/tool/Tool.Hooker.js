import Immutable from 'immutable'
import Ruler from '../ruler'
import Logger from '../logger'

/**
 * 传入ruler处理单个rule
 * @param props
 * @param name
 * @param rule
 */
const isRender = (props, name, rule) => {
  /** 1.提取Value **/
  let render = false
  if ("INHERE" == rule) {
    render = Ruler.InHere.isRender(props, name)
  } else if ("OBJECT" == rule) {
    render = Ruler.Entity.isRender(props, name)
  } else if ("LIST" == rule) {
    render = Ruler.List.isRender(props, name)
  } else if ("FLAG" == rule) {
    render = true
  }
  return render
}
/**
 *
 * @param props
 * @param nextProps
 * @param name
 * @param rule
 * @returns {boolean}
 */
const isUpdated = (props, nextProps, name, rule) => {
  /** 1.提取Rule **/
  let updated = false
  if ("INHERE" == rule) {
    updated = Ruler.InHere.isUpdated(props, nextProps, name)
  } else if ("OBJECT" == rule) {
    updated = Ruler.Entity.isUpdated(props, nextProps, name)
  } else if ("LIST" == rule) {
    updated = Ruler.List.isUpdated(props, nextProps, name)
  } else if ("FLAG" == rule) {
    updated = Ruler.Flag.isUpdated(props, nextProps, name)
  }
  return updated
}

const compare = (props, nextProps) => {
  const oldData = Immutable.fromJS(nextProps)
  const newData = Immutable.fromJS(props)
  return !Immutable.is(oldData,newData)
}
/** **/
class Hooker {

  static refreshInput(props, prevProps){
    return compare(props, prevProps)
  }
  /**
   * 读取rulers
   * @param props
   * @param key
   */
  static rulers(props, key) {
    /** 1.读取ruler **/
    const $props = Immutable.fromJS(props)
    const rulers = $props.get('$_ruler')
    /** 2.遍历属性处理每一个ruler **/
    if (rulers && 0 < Object.keys(rulers).length) {
      const rule = rulers.get(key)
      if (rule && 0 < Object.keys(rule).length) {
        return rule.toJS()
      }
    }
  }

  /**
   *
   * @param props
   * @param nextProps
   */
  static isRefreshForm(props, nextProps) {
    return (props.invalid != nextProps.invalid)
      || (props.valid != nextProps.valid)
      || (props.dirty != nextProps.dirty)
      || (props.pristine != nextProps.pristine)
  }

  /**
   * 是否执行Refresh
   * @param props
   */
  static isRefresh(props, nextProps) {
    const oldVal = props[`$_renew`]
    const newVal = nextProps[`$_renew`]
    const cid = props.id || props[`$_cid`]
    let updated = false
    Logger.Ruler.start(cid, 'shouldComponentUpdate', {
      old: oldVal,
      new: newVal
    })
    if (oldVal && newVal) {
      const $old = Immutable.fromJS(oldVal)
      const $new = Immutable.fromJS(newVal)
      updated = !Immutable.is($old, $new);
    }
    Logger.Ruler.end(cid, updated)
    if(updated) updated = compare(props,nextProps)
    return updated
  }

  /**
   * 是否执行Render
   * @param props
   */
  static isRender(props) {
    /** 1.读取ruler **/
    const rulers = Hooker.rulers(props, 'RENDER')
    /** 2.遍历属性处理每一个ruler **/
    const cid = props[`$_cid`] || props.id
    // 默认的Render为true
    let render = true
    if (rulers) {
      Logger.Ruler.start(cid, 'render', rulers)
      for (const name in rulers) {
        const rule = rulers[name]
        render = isRender(props, name, rule)
        Logger.Ruler.process(name, rule, render)
        /**
         * 如果检查到render为false则直接跳出，
         * 即中断render过程，不执行任何render
         */
        if (!render) {
          break
        }
      }
      Logger.Ruler.end(cid, render)
    }
    return render
  }

  /**
   * 是否更新
   * @param props
   * @param nextProps
   * @returns {boolean}
   */
  static isUpdated(props, nextProps) {
    /** 1.读取ruler **/
    const rulers = Hooker.rulers(props, 'ROMANCE')
    /** 2.遍历处理每一个ruler **/
    const cid = props[`$_cid`] || props.id
    // 默认的Update为false
    let updated = true
    if (rulers) {
      Logger.Ruler.start(cid, 'shouldComponentUpdate', rulers)
      for (const name in rulers) {
        const rule = rulers[name]
        updated = isUpdated(props, nextProps, name, rule)
        Logger.Ruler.process(name, rule, updated)
        /**
         * 如果检查到update为true则直接跳出
         * 即已经检查到执行update的条件，不需要继续检查
         */
        if (updated) {
          break
        }
      }
      Logger.Ruler.end(cid, updated)
    }
    if(updated) updated = compare(props,nextProps)
    return updated
  }
}

export default Hooker;
