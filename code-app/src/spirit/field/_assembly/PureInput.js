import React from 'react'
import memoize from 'lodash/memoize'
import {Field} from 'redux-form'
import $$ from '../../../seed'

class Component extends React.PureComponent {

  constructor(props, {
    type = 'text',
    component,
    redux = {}
  }) {
    super(props)
    this.type = type
    this.component = component
    this.redux = redux
  }

  _shouldComponentUpdate = memoize((nextProps) => {
    return $$.Tool.Hooker.refreshInput(this.props, nextProps)
  })

  shouldComponentUpdate(nextProps) {
    return this._shouldComponentUpdate(nextProps)
  }

  _render = memoize(() => {
    const {config} = this.props;
    const {name, cid} = config;
    /** Normalize专用 **/
    let {normalize, ...other} = this.redux
    if (normalize) {
      normalize = normalize(config)
      /** 必须设置 **/
      config.normalize = normalize
    }
    /** 注入dispatch方法 **/
    const {dispatch} = this.props
    if (dispatch) {
      config.dispatch = dispatch
    }
    return (
      <Field type={this.type}
             id={cid}
             name={name}
             config={config}
             component={this.component}
             normalize={normalize}
             {...other}/>
    )
  })

  render() {
    return this._render()
  }
}

export default Component
