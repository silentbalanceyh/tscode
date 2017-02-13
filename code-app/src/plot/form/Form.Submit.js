import $$ from '../../seed'
import Shared from '../shared'
/**
 *
 * @param params
 * @param config
 * @param dispatch
 * @private
 */
const _add = (params, config, {
  dispatch
}) => {
  Shared.Submit.prepare(params)
  $$.Logger.Input.formInput(params, '_add', config)
  return Shared.Submit.execute(params, config, dispatch)
}
/**
 *
 * @param params
 * @param config
 * @param dispatch
 * @private
 */
const _edit = (params, config, {
  dispatch
}) => {
  Shared.Submit.prepare(params)
  $$.Logger.Input.formInput(params, '_edit', config)
  return Shared.Submit.execute(params, config, dispatch)
}
/**
 * 删除函数
 * @param params
 * @param config
 * @param dispatch
 * @private
 */
const _delete = (params, config, {
  dispatch
}) => {
  Shared.Submit.prepare(params)
  $$.Logger.Input.formInput(params, '_delete', config)
  return Shared.Submit.execute(params, config, dispatch)
}
/**
 *
 * @param meta
 * @param config
 * @param dispatch
 * @private
 */
const _list = (meta, config, {
  dispatch
}) => {
  $$.Logger.Input.formInput(meta, '_list', config)
  const {input} = config.config
  const params = $$.Tool.Parameter.extract(meta, input)
  /** 序列化List参数 **/
  const {$LIST$} = params
  if ("string" == typeof($LIST$)) {
    params["$LIST$"] = JSON.parse($LIST$)
  }
  return Shared.Submit.execute(params, config, dispatch)
}
/**
 *
 */
const _etat = (meta, config, {
  dispatch
}) => {
  $$.Logger.Input.formInput(meta, '_etat', config)
  const {selected} = meta
  const {dialog} = config.config
  if ($$.Render.Hatch.row(dialog, selected)) {
    /** 插件效果 **/
    $$.Plugin.JQuery.showMask()
    /** 构造input **/
    const {input} = config.config
    const params = $$.Tool.Parameter.extract(meta, input)
    params["uniqueId"] = selected
    /** 提交 **/
    return Shared.Submit.execute(params, config, dispatch)
  }
}

export default {
  _add,
  _edit,
  _delete,
  _list,
  _etat
}
