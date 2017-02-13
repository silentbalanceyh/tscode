import React from 'react'
import memoize from 'lodash/memoize'
import $$ from '../../seed'
// ------------------------------------
// Class Definition
// ------------------------------------
class PureAssembly extends React.PureComponent {
  // ------------------------------------
  // 统一构造函数，提供当前组件名
  // ------------------------------------
  constructor(props, meta = {}) {
    super(props)
    if (process.env.NODE_ENV === `development`) {
      /** 读取Logger名称 **/
      this.logger = meta.logger
      this.name = meta.name
      this.parent = (meta.parent) ? meta.parent : 'PureAssembly'
      this.counter = 1
      this.resetCounter = false
    }
  }

  _shouldComponentUpdate = memoize((nextProps) => {
    const updated = $$.Tool.Hooker.isUpdated(this.props, nextProps)
    if (process.env.NODE_ENV === `development`) {
      if (updated) {
        this.counter++
      } else {
        this.resetCounter = true
      }
    }
    return updated
  })
  // ------------------------------------
  // Performance Fix
  // ------------------------------------
  shouldComponentUpdate(nextProps) {
    return this._shouldComponentUpdate(nextProps)
  }

  _romance = memoize((jsx, mask) => {
    const render = $$.Tool.Hooker.isRender(this.props)
    if (process.env.NODE_ENV === `development`) {
      if (render) {
        if (this.logger) {
          const fnLogger = $$.Logger.Prop[this.logger]
          if (fnLogger) {
            fnLogger(this.name, this.props, {
              parent: this.parent,
              counter: this.counter
            })
          }
          if (this.resetCounter) this.counter = 1
        }
      }
    }
    return (render) ? (jsx) : mask
  })
  // ------------------------------------
  // Major Render Method
  // ------------------------------------
  romance(jsx, mask = false) {
    /** 1.处理render，必须是传入的render为true才执行render检查 **/
    return this._romance(jsx, mask)
  }
}

export default PureAssembly
