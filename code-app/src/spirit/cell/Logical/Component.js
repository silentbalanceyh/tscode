import React from 'react'

class Component extends React.PureComponent{
  render(){
    const { data, config } = this.props;
    const { logical } = config;
    let text = ''
    if(data){
      text = logical[data];
    }else{
      text = logical['false'];
    }
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
      logical:React.PropTypes.shape({
        true:React.PropTypes.string.isRequired,
        false:React.PropTypes.string.isRequired
      }).isRequired,
    }).isRequired,
    data: React.PropTypes.any
  }
}
export default Component
