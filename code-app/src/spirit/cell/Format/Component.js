import React from 'react'
import $$ from '../../../seed'

class Component extends React.PureComponent {
  render() {
    const {data, config} = this.props;
    /** 注意合法值包括0 **/
    let value;
    if (0 == data || data) {
      value = data
    }
    if (0 != data && !data) {
      value = config.default
    }
    const text = $$.Tool.Format.string(config.format, value);
    return (
      <span>{text}</span>
    )
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if (process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    config: React.PropTypes.shape({
      format: React.PropTypes.string.isRequired
    }).isRequired,
    data: React.PropTypes.any
  }
}
export default Component
