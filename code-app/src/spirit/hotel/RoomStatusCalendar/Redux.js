import React from 'react'
import $$ from '../../../seed'
import Immutable from 'immutable'

const KEY_FORMAT = 'YYYY-MM-DD'
import Component from '../RoomViewer/Component'
// ------------------------------------
// List初始化信息
// ------------------------------------
const initiate = (props = {}) => {
  return $$.Data.Init.initData(props, $$.Redux.Types.SUCCESS_GOONEY_DATA);
}
const $_offMask = (props, prevProps) => {
  const newData = Immutable.fromJS(props['$_data'])
  const oldData = Immutable.fromJS(prevProps['$_data'])
  if (!Immutable.is(newData, oldData)) {
    $$.Plugin.JQuery.hiddenMask()
  }
}
// ------------------------------------
// Calendar专用
// ------------------------------------
const __fnIsSelect = (props, selected) => {
  const {$_data = {}} = props
  const key = selected.format(KEY_FORMAT)
  return $_data[key]
}

const $_fnReload = (component) => {
  const { props, state } = component
  if(state.reload && state.selected){
    let $props = Immutable.fromJS(props)
    component.setState(Object.assign(state,{ reload:false }))
    $props = $props.setIn(['$_ajax','record','input','day'],state.selected.format(KEY_FORMAT))
    $$.Data.Init.initData($props.toJS(), $$.Redux.Types.SUCCESS_GOONEY_DATA);
  }
}

const $_fnSelect = (props) => (selected) => {
  if (__fnIsSelect(props, selected)) {
    // 选中日期，弹出对话框查看房态信息
    let ingest = Immutable.fromJS(props['$_ingest'])
    ingest = ingest.setIn(['input','day'],selected.format(KEY_FORMAT))
    ingest = ingest.toJS()
    // 构造selector
    const selector = { selector:props['$_selector'], tabular:props["$_tabular"], assist:props['$_assist'], sigma:props['$_sigma'] }
    // 弹出对话框
    selector.search = "disabled"
    $$.Dialog.Retort.dialog(Component,{type:'hotel.RoomViewer', ingest, selector })
  }
}

const $_fnChange = (component) => (selected) => {
  const { props } = component
  const { dispatch } = props
  if (!__fnIsSelect(props, selected)) {
    // 直接执行Calendar切换，重新加载
    $$.Plugin.JQuery.showMask()
    component.setState({ selected:selected,reload:true })
    dispatch({type:$$.Redux.Types.SUCCESS_CONTROL_HASH, cid:props['$_cid']})
  }
}

const $_fnDateRender = (component) => (selected) => {
  const { props, state } = component
  const {$_data = {}} = props
  let data = {}
  const key = selected.format(KEY_FORMAT)
  if ($_data[key]) {
    console.assert(0 < $_data[key].length)
    data = $_data[key][0]
  }
  const display = selected.format("MM月DD日")
  const start = state.selected.clone().startOf('month')
  const end = state.selected.clone().endOf('month')
  if (selected.isBefore(start) || selected.isAfter(end)) {
    /** 非本月信息显示 **/
    return (
      <div>{display}</div>
    )
  } else {
    /** 显示Label **/
    const items = []
    items.push({prefix: `总数：`, color: 'black', value: data['typed']})
    items.push({prefix: `可预定：`, color: 'green', value: data['ordering']})
    items.push({prefix: `在住房：`, color: 'red', value: data['reside']})
    return (
      <div>
        {display}
        <ul className="ui list">
          {
            items.map((item, idx) => (
              <div className="item" key={`${key}${idx}`}>
                {item.prefix}<span style={{color: item.color}}>{item.value}</span>
              </div>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default {
  $_fnSelect,
  $_fnChange,
  $_fnReload,
  $_fnDateRender,
  $_offMask,
  initiate
}
