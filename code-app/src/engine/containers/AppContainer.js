import React from 'react'
import Router from 'react-router/lib/Router'
import {Provider} from 'react-redux'

class AppContainer extends React.Component {
  render() {
    const {history, routes, store} = this.props
    return (
      <Provider key="Provider" store={store}>
        <Router key="Router" history={history} children={routes}/>
      </Provider>
    )
  }
}

AppContainer.propTypes = {
  history: React.PropTypes.object.isRequired,
  routes: React.PropTypes.object.isRequired,
  store: React.PropTypes.object.isRequired
}

export default AppContainer
