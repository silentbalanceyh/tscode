import React from 'react'
import memoize from 'lodash/memoize'
import Immutable from 'immutable'
import $$ from '../../seed'

class PureStatic extends React.PureComponent{
  // ------------------------------------
  // 统一构造函数，提供当前组件名
  // ------------------------------------
  constructor(props, name, rulers = {}, logger) {
    super(props)
    this.rulers = rulers
    if(process.env.NODE_ENV === `development`) {
      this.logger = (logger)?logger:'domant'
      this.name = name
      this.parent = 'PureStatic'
      /** 静态rulers **/
      this.counter = 1
      this.resetCounter = false
    }
  }

  _shouldComponentUpdate = memoize((nextProps) => {
    let $prop = Immutable.fromJS(this.props)
    let $next = Immutable.fromJS(nextProps)
    $prop = $prop.set('$_ruler',this.rulers)
    $next = $next.set('$_ruler',this.rulers)
    const updated = $$.Tool.Hooker.isUpdated($prop.toJS(),$next.toJS())
    if(process.env.NODE_ENV === `development`) {
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

  _romance = memoize((jsx, render = true) => {
    /** 1.处理render **/
    let $prop = Immutable.fromJS(this.props)
    $prop = $prop.set('$_ruler',this.rulers)
    render = $$.Tool.Hooker.isRender($prop.toJS())
    if(process.env.NODE_ENV === `development`) {
      if (render) {
        if (this.logger) {
          const fnLogger = $$.Logger.Prop[this.logger]
          if (fnLogger) {
            fnLogger(this.name, $prop.toJS(), {
              parent: this.parent,
              counter: this.counter
            })
          }
          if (this.resetCounter) this.counter = 1
        }
      }
    }
    return (render) ? (jsx) : false
  })
  // ------------------------------------
  // Major Render Method
  // ------------------------------------
  romance(jsx, render = true) {
    /** 1.处理render **/
    return this._romance(jsx,render)
  }
}

export default PureStatic
