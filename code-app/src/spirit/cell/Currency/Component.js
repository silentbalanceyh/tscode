import React from 'react'
import $$ from '../../../seed'

class Component extends React.PureComponent{
  render(){
    const { data, config } = this.props;
    const text = $$.Tool.Format.string(config.format,$$.Tool.Format.currency(data,2));
    return (
      <span>{text}</span>
    )
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if(process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    config:React.PropTypes.shape({
      format:React.PropTypes.string.isRequired
    }).isRequired,
    data:React.PropTypes.any
  }
}
export default Component
