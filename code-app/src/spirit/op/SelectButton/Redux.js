import $$ from '../../../seed'

const $_fnHandler = (props) => () => {
  /** 1.提取Tab配置信息 **/
  const {config = {}} = props.config
  const {tab = {}} = config
  const {dispatch} = props
  $$.Assert.isFunction({dispatch})
  /** 2.提取选中值 **/
  const selected = props.selected[tab.selected]
  /** 3.判断tab信息 **/
  if ($$.Render.Hatch.row(tab.dialog, selected)) {
    /** 4.效果插件 **/
    return dispatch({
      type: $$.Redux.Types.SUCCESS_UI_TAB_DYNAMIC,
      uex: {tabpage: tab},
      cid: tab.cid, config: {etat: tab.state, form: tab.form}
    })
  }
}

export default {
  $_fnHandler
}
