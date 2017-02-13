import React from 'react'

class Component extends React.PureComponent {

  render() {
    const {error} = this.props;
    const cross = error.crossDomain ? "Yes" : "No";
    return (
      <div className="ui container" style={{
        width:"70%",
        paddingTop:"40px"
      }}>
        <div className="ui red message">
          <div className="header">
            Error Occurs
          </div>
          <ui className="list">
            <li>Http Method: {error.method}</li>
            <li>Cross Domain: {cross}</li>
            <li>URL: {error.url}</li>
            <li>Message: {error.message}</li>
          </ui>
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
    error: React.PropTypes.object.isRequired,
  }
}

export default Component
