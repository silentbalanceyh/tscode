import $$ from '../../../seed'

import Immutable from 'immutable'

const $_fnExecute = (props, datum) => {
  const {dispatch, target, cid} = props
  const {config = {}, monitor = {}} = props
  const {meta} = config
  /** 1.修改树上的Array List数据 **/
  const data = {}
  data.field = meta.target
  data.id = monitor.uniqueId
  data.path = meta.pathes
  data.value = datum[cid]
  dispatch({
    type: $$.Redux.Types.SUCCESS_UI_ROW_REFRESH,
    data
  })
  /** 2.Dispatch选中处理 **/
  dispatch({
    type: $$.Redux.Types.SUCCESS_CONTROL_HASH,
    cid: target,
    data: {
      path: ["data", "extension", "scheduled"],
      value: datum
    }
  })
}

const $_fnSelect = (props) => (event) => {
  /** 1.计算选中 **/
  if("" != event.target.value) {
    const {dispatch, target, cid} = props
    const {datum = {}, config = {}, monitor = {}} = props
    const {meta} = config
    /** 2.初始化datum **/
    if (!datum[cid]) {
      datum[cid] = []
    }
    const limit = monitor[meta['limits'].field]
    const current = datum[cid].length
    if (limit > current) {
      datum[cid].push(event.target.value)
      $_fnExecute(props, datum)
    } else {
      if (limit == current) {
        $$.Dialog.Semantic.warning(meta['limits'].message,() => {
          dispatch({
            type: $$.Redux.Types.SUCCESS_CONTROL_HASH,
            cid: target,
          })
        })
      }
    }
  }
}

const $_fnClean = (props) => () => {
  const { datum = {}, cid } = props
  if(datum[cid]){
    datum[cid] = []
  }
  $_fnExecute(props,datum)
}

const $_fnInit = (props) => {
  const { monitor, cid, dispatch } = props
  let { datum } = props
  const roomNumbers = monitor['roomNumbers']
  if(!datum) datum = {}
  datum[cid] = roomNumbers
  /** 2.Dispatch选中处理 **/
  dispatch({
    type: $$.Redux.Types.SUCCESS_CONTROL_HASH,
    data: {
      path: ["data", "extension", "scheduled"],
      value: datum
    }
  })
}

const $_fnReload = (props, prevProps) => {
  const newRd = props.reload
  const oldRd = prevProps.reload
  const newRn = props.renew
  const oldRn = prevProps.renew
  if(newRd != oldRd || !Immutable.is(newRn,oldRn)){
    $_fnInit(props)
  }
}

const $_fnExcept = (datum = {}, value) => {
  let values = []
  for (const key in datum) {
    const raw = datum[key]
    if (raw) values = values.concat(raw)
  }
  const $values = Immutable.fromJS(values)
  return !$values.contains(String(value))
}

export default {
  $_fnSelect,
  $_fnExcept,
  $_fnClean,
  $_fnInit,
  $_fnReload
}
