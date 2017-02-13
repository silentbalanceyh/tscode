import React from 'react'

class Component extends React.PureComponent {
  render() {
    const {message} = this.props;
    return (
      <div className="ui container">
        <div className="ui active inverted dimmer">
          <div className="ui text loader">
            {message}
          </div>
        </div>
      </div>
    )
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if(process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    message:React.PropTypes.string.isRequired
  }
}
export default Component
