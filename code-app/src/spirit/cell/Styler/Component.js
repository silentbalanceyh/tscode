import React from 'react'
import Immutable from 'immutable'

class Component extends React.PureComponent {
  render() {
    const {data} = this.props;
    /** 1.提取配置 **/
    const {config = {}} = this.props;
    const {dataPath, styleField, textField} = config;
    /** 2.检索配置 **/
    if (dataPath && styleField) {
      const $props = Immutable.fromJS(this.props)
      const listData = $props.getIn(dataPath)
      /** 3.过滤 **/
      let target = (listData) ? listData.toJS().filter(item => item.uniqueId == data) : {}
      let display = ''
      if (target) target = target[0]
      if (target) display = target[textField]
      const style = target[styleField]
      if (style.visible !== false) style.visible = true
      return (
        (style.visible) ? (
            <span>
              {(style.icon) ? <i className={`${style.icon} icon`}/> : false }
              {display}
            </span>
          ) : <span>（无）</span>
      )
    } else {
      return (
        <span>{data}</span>
      )
    }
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if (process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    data: React.PropTypes.any
  }
}
export default Component
