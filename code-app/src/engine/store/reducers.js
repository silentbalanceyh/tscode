import {combineReducers} from 'redux'
import {reducer as formReducer, actionTypes} from 'redux-form'
import {routerReducer as router} from 'react-router-redux'
// 框架固定的Reducer
// import AppReducer from '../../arena/layout/core/Reducer'
// import ContentReducer from '../../arena/modules/core/Reducer'

import {ignoreActions} from 'redux-ignore'
import Types from '../../seed/redux/Redux.Types'

export const makeRootReducer = (asyncReducers) => {
  const formActions = Object.keys(actionTypes)
  const appActions = Object.keys(Types)
  const routerActions = ['@@router/LOCATION_CHANGE']
  return combineReducers({
    // Add sync reducers here，添加Reducer的排他性
    router: ignoreActions(router, appActions.concat(formActions)),
    // app: ignoreActions(AppReducer, formActions.concat(routerActions)),
    // content: ignoreActions(ContentReducer, formActions.concat(routerActions)),
    form: ignoreActions(formReducer, appActions.concat(routerActions)),
    ...asyncReducers
  })
}

export const injectReducer = (store, {key, reducer}) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
