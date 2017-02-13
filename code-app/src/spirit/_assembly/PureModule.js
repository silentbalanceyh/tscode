import React from 'react'
import memoize from 'lodash/memoize'

import $$ from '../../seed'
// ------------------------------------
// Class Definition
// ------------------------------------
class PureModule extends React.PureComponent {
  // ------------------------------------
  // 统一构造函数，提供当前组件名
  // ------------------------------------
  constructor(props, meta = {}) {
    super(props)
    if (process.env.NODE_ENV === `development`) {
      /** 读取Logger名称 **/
      this.logger = meta.logger
      this.name = meta.name
      this.parent = (meta.parent) ? meta.parent : 'PureModule'
      this.counter = 1
      this.resetCounter = false
    }
  }

  _shouldComponentUpdate = memoize((nextProps) => {
    const updated = $$.Tool.Hooker.isRefresh(this.props, nextProps)
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

  _romance = memoize((jsx) => {
    if (process.env.NODE_ENV === `development`) {
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
    return (jsx)
  })
  // ------------------------------------
  // Major Render Method
  // ------------------------------------
  romance(jsx) {
    return this._romance(jsx)
  }
}

export default PureModule
