import React from 'react'
// ======================================================
// FieldRender
// ======================================================
import PureField from '../_assembly/PureField'

class Component extends PureField {
  constructor(props) {
    super(props, 'dropdown')
  }
}

// ------------------------------------
// React Specification
// ------------------------------------
if (process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    config:React.PropTypes.shape({
      options:React.PropTypes.array.isRequired
    }).isRequired
  }
}
export default Component
