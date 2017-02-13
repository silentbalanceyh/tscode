import $$ from '../../../seed'
import Immutable from 'immutable'

const $_fnAjax = (props) => {
  /** 拷贝属性 **/
  props = Immutable.fromJS(props).toJS()
  const {config = {}} = props
  const $_ajax = {}
  if (config.record) $_ajax.record = config.record
  if (config.assist) $_ajax.assist = config.assist
  props['$_ajax'] = $_ajax
  return props
}

const $_fnInit = (props) => {
  /** 1.构造需要使用的Promise **/
  const $props = $_fnAjax(props)
  const promises = $$.Data.Eblis.promises($props)
  /** 2.构造Output **/
  const keys = $$.Data.Eblis.output($props)
  /** 3.返回的事件信息 **/
  const reference = {
    type: $$.Redux.Types.SUCCESS_ARBOR_TPL,
    keys
  };
  /** 4.执行Promise **/
  const {dispatch} = props
  return $$.Ajax.Promise.parallel(promises, dispatch, reference);
}

const $_fnActive = (props, nextProps) => {
  const newAct = props.active
  const oldAct = nextProps.active
  if (oldAct != newAct) {
    // 顶部菜单切换
    jQuery(`.jsxTopbar`).removeClass('active')
    jQuery(`#topbar${newAct}`).addClass('active')
    // 左边菜单隐藏显示
    jQuery(`.jsxSidebar`).css('display', 'none')
    jQuery(`#sidebar${newAct}`).css('display', 'inline-block')
  }
  // 左边菜单激活效果
  const newSide = props.sidebar
  jQuery(`.jsxLeaf`).removeClass('active')
  if (newSide) {
    jQuery(`#sideitem${newSide}`).addClass('active')
  }
}
/**
 * Template刷新专用
 * @param props
 * @param nextProps
 * @returns {boolean}
 */
const $_fnRefresh = (props, nextProps) => {
  if(props.active != nextProps.active){
    return true
  }else{
    if(props.sidebar != nextProps.sidebar){
      return true
    }
    const { status } = props
    return !status.isData
  }
}

export default {
  $_fnRefresh,
  $_fnInit,
  $_fnActive
}
