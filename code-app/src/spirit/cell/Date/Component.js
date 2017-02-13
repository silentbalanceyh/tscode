import React from 'react'
import moment from 'moment'

class Component extends React.PureComponent{
  render(){
    const { data, config } = this.props;
    /** 1.提取时间格式 **/
    const date = moment(data)
    const text = date.format(config.pattern)
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
    config: React.PropTypes.shape({
      pattern: React.PropTypes.string.isRequired
    }).isRequired,
    data: React.PropTypes.any
  }
}

export default Component
