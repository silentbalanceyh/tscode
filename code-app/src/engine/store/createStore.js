import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { persistStore, autoRehydrate} from 'redux-persist'
import promise from 'redux-promise';
import makeRootReducer from './reducers'

export default (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    promise,
    routerMiddleware(history)
  ]
  // ======================================================
  // Development Logger
  // ======================================================
  if (process.env.NODE_ENV === `development`) {
    // Logger
    const createLogger = require(`redux-logger`);
    const logger = createLogger({
      collapsed:true,
      diff:true
    });
    // TODO: 添加Redux的Logger
    middleware.push(logger);
  }
  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  // let autoReducer
  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
    //autoReducer = autoRehydrate({log:true})
  }else{
    //autoReducer = autoRehydrate()
  }
  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers,
    )
  )
  // ======================================================
  // Persist Store Information
  // ======================================================
  // persistStore(store)
  store.asyncReducers = {}
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
