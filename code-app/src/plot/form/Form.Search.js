import $$ from '../../seed'
/**
 * 设置搜索条件专用
 * @param params
 * @param config
 * @param dispatch
 * @private
 */
const _criteria = (params, config = {}, {
  dispatch,
  props:{$_field, $_etat, $_cid}
}) => {
  /**
   * 0. 内部回调函数
   * @param reference
   */
  $$.Plugin.JQuery.showMask()
  $$.Logger.Input.formInput(params, '_criteria', config)
  let criterias = $$.Tool.Form.criterias($_field, $_etat)
  criterias = $$.Criteria.generate(criterias, params)
  /**
   * 1.设置Redux参数
   */
  const {target} = config.config
  const form = target ? target : $_cid
  $$.Logger.Input.criteria(criterias, '_criteria')
  return dispatch({
    type: $$.Redux.Types.SUCCESS_UI_FORM_CRITERIA,
    criterias, form
  })
}

export default {
  _criteria
}
