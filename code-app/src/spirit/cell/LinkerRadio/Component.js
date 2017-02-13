import React from 'react'

class Component extends React.Component {
  render() {
    const {data, config} = this.props
    return (
      <div className="ui flitted radio checkbox">
        <input type="radio" name={config.group} value={data}/>
        <label></label>
      </div>
    )
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if (process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    config: React.PropTypes.shape({
      group: React.PropTypes.string.isRequired
    }).isRequired,
    data: React.PropTypes.any
  }
}
export default Component
