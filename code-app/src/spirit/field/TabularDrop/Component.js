import React from 'react'
// ======================================================
// FieldRender
// ======================================================
import PureField from '../_assembly/PureField'

class Component extends PureField {
  constructor(props) {
    super(props, 'tabular')
  }
}

// ------------------------------------
// React Specification
// ------------------------------------
if (process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    config:React.PropTypes.shape({
      tabular:React.PropTypes.array.isRequired
    }).isRequired
  }
}
export default Component
