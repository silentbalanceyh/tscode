import React from 'react'
// ======================================================
// FieldRender
// ======================================================
import PureField from '../_assembly/PureField'

import mapping from '../../_internal/Redux'
import dispatches from './Redux'

class Component extends PureField {
  constructor(props) {
    super(props, 'combo')
  }
  componentWillMount(){
    dispatches.$_fnInit(this.props)
  }
  componentDidUpdate(prevProps){
    dispatches.$_fnUpdate(this.props,prevProps)
  }

  shouldComponentUpdate(){
    return true
  }
}

// ------------------------------------
// React Specification
// ------------------------------------
if (process.env.NODE_ENV === `development`) {

}
export default mapping.single(Component, [
  "form"
], dispatches, 'inputes')
