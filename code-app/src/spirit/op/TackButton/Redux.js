import $$ from '../../../seed'

const $_fnHandler = (props) => () => {
  /** 1.提取Tab配置信息 **/
  const {config = {}} = props.config
  const {tab = {}} = config
  const {dispatch} = props
  $$.Assert.isFunction({dispatch})
  /** 2.直接添加新插件开页面 **/
  return dispatch({
    type: $$.Redux.Types.SUCCESS_UI_TAB_DYNAMIC,
    uex: {tabpage: tab},
    cid: tab.cid, config: {etat: tab.state, form: tab.form}
  })
}

export default {
  $_fnHandler
}
