import React from 'react'
import {FieldArray} from 'redux-form'

class ArrayInput extends React.Component {

  constructor(props, {
    type = 'textarray',
    component,
    redux = {}
  }) {
    super(props)
    this.type = type
    this.component = component
    this.redux = redux
  }

  render() {
    const {config} = this.props
    const {name, cid} = config
    return (
      <FieldArray id={cid}
                  name={name}
                  config={config}
                  component={this.component}
                  {...this.redux}/>
    )
  }
}

export default ArrayInput
