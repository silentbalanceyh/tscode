import React from 'react'

import $$ from '../../../seed'
import Immutable from 'immutable'
// ------------------------------------
// Action本身
// ------------------------------------
const initiate = (props = {}) => {
  return $$.Data.Init.initData(props);
}
// ------------------------------------
// 执行Compare的基础函数用于判断重新加载数据
// ------------------------------------
const vanReload = (props, prevProps) => {
  const newVal = Immutable.fromJS(props["$_reload"])
  const oldVal = Immutable.fromJS(prevProps["$_reload"])
  return !Immutable.is(newVal, oldVal)
}
// ------------------------------------
// 核心Reload函数
// ------------------------------------
const $_fnReload = (props, prevProps) => {
  const reload = vanReload(props, prevProps)
  if (reload) {
    /** 然后重新初始化 **/
    $$.Tool.Flow.init(props)
  }
}

const $_fnSort = (dispatch, props) => ({field, value}) => () => {
  /** 插件效果 **/
  $$.Plugin.JQuery.showMask()
  $_fnClean(props)
  const order = {};
  order[field] = value;
  return dispatch({type: $$.Redux.Types.SUCCESS_UI_PAGER_SORT, orders: [order], cid: props['$_cid']});
}

const $_fnClean = (props, cid) => {
  const {dispatch} = props
  dispatch({type: $$.Redux.Types.SUCCESS_FANTOM_CLEAN_DATA, cid, keys: {record: ["data", "list"]}})
}

const $_offMask = (props, prevProps) => {
  const newData = Immutable.fromJS(props['$_data'])
  const oldData = Immutable.fromJS(prevProps['$_data'])
  if (!Immutable.is(newData, oldData)) {
    $$.Plugin.JQuery.hiddenMask()
  }
}

export default {
  initiate,
  $_fnReload,
  $_fnSort,
  $_fnClean,
  $_offMask,
}
