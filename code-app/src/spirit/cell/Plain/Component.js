import React from 'react'

class Component extends React.PureComponent{
  render(){
    const { data } = this.props;
    return (
      <span>{data}</span>
    )
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if(process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    data: React.PropTypes.any
  }
}
export default Component
