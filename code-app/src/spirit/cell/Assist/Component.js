import React from 'react'

class Component extends React.PureComponent{
  render(){
    const { data, config, assist } = this.props;
    const key = config.assist
    let values = assist[key]?assist[key]:[]
    values = values.list.filter(item => item.uniqueId == data)
    console.assert(1 == values.length)
    const value = values[0][config.value]
    return (
      <span>{value}</span>
    )
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if(process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    config: React.PropTypes.shape({
      assist: React.PropTypes.string.isRequired,
      value: React.PropTypes.string.isRequired
    }).isRequired,
    data: React.PropTypes.any
  }
}
export default Component
