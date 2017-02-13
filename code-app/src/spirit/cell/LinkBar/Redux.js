import $$ from '../../../seed'
import Immutable from 'immutable'

const $_fnData = (props, field = "$LIST$") => {
  const {inputes} = props
  let $data = Immutable.fromJS(inputes[field]).toJS()
  if (!$data) $data = []
  return $data
}

const $_fnRemove = (props) => (event) => {
  event.preventDefault()
  const {data, config, dispatch} = props
  let {target} = config
  const field = "$LIST$"
  let $data = $_fnData(props, field)
  /** 移除不需要的数据信息 **/
  $data = $data.filter((item, idx) => idx != data)
  if (target['remove']) {
    target = target['remove']
    dispatch({type: $$.Abrupt.ReduxForm.RD_FILL, meta: {form: target, field: field}, payload: $data})
    dispatch({type: $$.Redux.Types.SUCCESS_CONTROL_HASH, cid: target})
  }
}

const $_fnEdit = (props) => (event) => {
  event.preventDefault()
  const {data, config, dispatch} = props
  let {target} = config
  let $data = $_fnData(props)
  /** 筛选对应的数据信息 **/
  $data = $data.filter((item, idx) => idx == data);
  console.assert(1 == $data.length)
  $data = $data[0]
  if (target['edit']) {
    target = target['edit']
    $data['$INDEX$'] = data
    for (const key in $data) {
      const value = $data[key]
      dispatch({type: $$.Abrupt.ReduxForm.RD_FILL, meta: {form: target, field: key}, payload: value})
    }
    dispatch({type: $$.Redux.Types.SUCCESS_CONTROL_HASH, cid: target})
  }
}

export default {
  $_fnRemove,
  $_fnEdit
}
