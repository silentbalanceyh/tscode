import Immutable from 'immutable'
import InHere from './Ruler.InHere'

class List {
  /**
   *
   * @param props
   * @param name
   */
  static isRender(props, name) {
    /** 1.检查render **/
    let render = InHere.isRender(props, name)
    /** 2.如果值为true继续检查 **/
    if (render) {
      const list = props[`$_${name}`]
      if (list.count && list.list) {
        const $list = Immutable.fromJS(list.list)
        if (!$list || !Immutable.List.isList($list) || 0 >= $list.size) {
          render = false
        }
      } else {
        render = false
      }
    }
    return render
  }

  static isUpdated(props, nextProps, name) {
    if (List.isRender(props, name)) {
      const key = `$_${name}`
      const oldVal = props[key]
      const newVal = nextProps[key]
      if (oldVal && newVal) {
        if (oldVal.count != newVal.count) {
          return true
        } else {
          const $old = Immutable.fromJS(oldVal.list)
          const $new = Immutable.fromJS(newVal.list)
          return !Immutable.is($old, $new)
        }
      } else {
        return false
      }
    } else {
      return true
    }
  }
}

export default List
