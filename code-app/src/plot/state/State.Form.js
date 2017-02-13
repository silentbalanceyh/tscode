import $$ from '../../seed'
const _additem = (params, config, {
  dispatch
}) => {
  $$.Logger.Input.formInput(params, '_additem', config)
  const cid = config.form
  const {target = 'fmForm', meta = {}} = config.config ? config.config : {}
  /** 添加流程 **/
  const {monitor = {}} = meta
  const field = "$LIST$"
  const dataArr = monitor[field]
  /** 构造数据 **/
  let data = []
  /** 流程处理 **/
  if (params.hasOwnProperty('$INDEX$')) {
    console.assert(dataArr)
    /** 更新流程 **/
    const index = params['$INDEX$']
    dataArr[index] = params
    data = dataArr
  } else {
    /** 添加流程 **/
    if (dataArr) {
      data = data.concat(dataArr)
    }
    data.push(params)
  }
  /** 构造数据 **/
  dispatch({type: $$.Abrupt.ReduxForm.RD_FILL, meta: {form: target, field}, payload: data})
  dispatch({type: $$.Redux.Types.SUCCESS_CONTROL_HASH, cid})
  dispatch({type: $$.Abrupt.ReduxForm.RD_RESET, meta: {form: cid}})
}

export default {
  _additem
}
