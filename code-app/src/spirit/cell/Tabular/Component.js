import React from 'react'

class Component extends React.PureComponent {
  render() {
    const {data, config, tabular = {}} = this.props;
    const key = config.tabular
    let values = tabular[key]?tabular[key]:[]
    values = values.filter(item => item.uniqueId == data)
    if(1 == values.length) {
      const value = values[0][config.value]
      return (
        <span>{value}</span>
      )
    }else{
      return (
        <span></span>
      )
    }
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if (process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    config: React.PropTypes.shape({
      tabular: React.PropTypes.string.isRequired,
      value: React.PropTypes.string.isRequired
    }).isRequired,
    data: React.PropTypes.any
  }
}
export default Component
