import $$ from '../seed'

export default (store) => ({
  path: '/ts/link',
  getComponent(nextState, cb){
    require.ensure([],(require) => {
      const Container = require('./core/Container').default
      const reducer = require('./core/Reducer').default
      $$.Reducer(store, { key: 'app', reducer})
      cb(null, Container)
    },"dynamic.demo")
  }
})
