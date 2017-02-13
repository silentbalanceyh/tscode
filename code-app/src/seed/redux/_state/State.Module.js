import Factory from './State.Factory'
import Immutable from 'immutable'
import Bitrary from '../Redux.Bitrary'
import Init from './State.Init'

const setup = (meta) => {
  const controls = {}
  for (const key in meta) {
    let $control = Immutable.fromJS({})
    $control = $control.set('type', meta[key])
    const hash = Bitrary.string(16)
    $control = $control.set('hash', hash)
    controls[key] = $control.toJS()
  }
  return controls
}

const calcUex = (config = {}, uex = {}) => {
  for(const key in config){
    const $item = Immutable.fromJS(config[key])
    let headers = $item.getIn(['data','spec','tab','headers']);
    if(headers){
      const search = $item.getIn(['data','spec','search'])
      uex.tab.active = (search)?1:0
      uex.tab.headers = headers.toJS()
    }
  }
}

const calcQuery = (config = {}, query = {}) => {
  for(const key in config){
    const $item = Immutable.fromJS(config[key])
    let orders = $item.getIn(['record','orders']);
    if(orders){
      query.orders = orders.toJS()
    }
  }
}

class Module {

  static loading(state, {
    output
  }) {
    let $state = Immutable.fromJS(state)
    if (output) {
      const pathes = ['data', output]
      $state = $state.setIn(pathes, {})
    }
    return $state.toJS()// Kit.output($state.toJS(), state)
  }

  static success(state, {
    config = {}, data = {}, cache = {},
    status = {},
    ui = {}, controls = {}
  }) {
    /** 1.抽取两个特殊节点 **/
    const query = Init.query()
    const uex = Init.uex()
    {
      calcQuery(config,query)
      calcUex(config,uex)
    }

    /** 2.需要处理controls **/
    controls = setup(controls, state)
    /** 3.合并状态 **/
    const loader = state.status
    const $state = Factory.mergeMulti({
      status: loader
    }, [
      ['status'], ['data'],
      ['ui'], ['cache'], ['controls'],
      ['query'], ['uex']
    ], [
      status, data,
      ui, cache, controls,
      query, uex
    ]);
    return $state // Kit.output($state, state)
  }

  static failure(state, {
    error,
    status = {},
    cid
  }) {
    const _state = Factory.mergeMulti(state, [
      ['error'], ['status']
    ], [
      error, status
    ])
    let $state = Immutable.fromJS(_state)
    if (cid) {
      const pathes = ['controls', cid, 'hash']
      $state = $state.setIn(pathes, Bitrary.string(16))
    }
    return $state.toJS() // Kit.output($state.toJS(), state)
  }
}

export default Module
