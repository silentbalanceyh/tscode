import React from 'react'

import $$ from '../../../seed'
import Immutable from 'immutable'
import css from './Component.scss'
// ------------------------------------
// Action本身
// ------------------------------------
const initiate = (props = {}, params = {}) => {
  /** 1.将参数合并到props中执行，后续代码中处理参数控制 **/
  const _props = Object.assign({params},props)
  return $$.Data.Init.initData(_props);
}
// ------------------------------------
// 执行Compare的基础函数用于判断重新加载数据
// ------------------------------------
const vanReload = (props, prevProps) => {
  const newVal = Immutable.fromJS(props["$_reload"])
  const oldVal = Immutable.fromJS(prevProps["$_reload"])
  return !Immutable.is(newVal, oldVal)
}
const vanPager = (props, prevProps, key) => {
  const newVal = props['query'].pager[key]
  const oldVal = prevProps['query'].pager[key]
  return oldVal != newVal
}

const vanOrder = (props, prevProps) => {
  const newOrders = Immutable.fromJS(props['query'].orders[0])
  const oldOrders = Immutable.fromJS(prevProps['query'].orders[0])
  const isOrder = !Immutable.is(oldOrders, newOrders)
  // Fix: Orders特殊初始化，需要orders的长度大于0
  if (isOrder) {
    if (newOrders && 0 < Object.keys(newOrders.toJS()).length) {
      return true
    }
  } else {
    return false;
  }
}

const vanCriteria = (props, prevProps) => {
  const newCriteria = Immutable.fromJS(props['query'].criterias)
  const oldCriteria = Immutable.fromJS(prevProps['query'].criterias)
  return !Immutable.is(oldCriteria, newCriteria)
}

const vanCondition = (props, prevProps) => {
  const index = vanPager(props, prevProps, 'index');
  const size = vanPager(props, prevProps, 'size');
  const orders = vanOrder(props, prevProps);
  const criertias = vanCriteria(props, prevProps)
  const reload = vanReload(props, prevProps)
  /** 1.无数据的情况也执行Reload，这种是删除了list -> data中的数据导致无法重加载 **/
  const data = props['$_data']
  $$.Logger.Prop.reload(props,{ index, size, orders, criertias, reload, data:!data })
  if (index || size || orders || criertias || reload || !data) {
    /** 然后重新初始化 **/
    return true
  }else{
    return false
  }
}
// ------------------------------------
// 核心Reload函数
// ------------------------------------
const $_fnReload = (props, prevProps) => {
  if(vanCondition(props,prevProps)){
    $$.Tool.Flow.init(props, { hash:true })
  }
}

const $_fnSort = (dispatch, props) => ({field, value}) => () => {
  /** 插件效果 **/
  $$.Plugin.JQuery.showMask()
  $_fnClean(props)
  const order = {};
  order[field] = value;
  return dispatch({type: $$.Redux.Types.SUCCESS_UI_PAGER_SORT, orders: [order]});
}

const $_fnClean = (props, cid) => {
  const {dispatch} = props
  dispatch({type: $$.Redux.Types.SUCCESS_FANTOM_CLEAN_DATA, cid, keys: {record: ["data", "list"]}})
}
// ------------------------------------
// Page List 专用
// ------------------------------------
const page = (dispatch, {cid, index, clean}) => {
  $$.Plugin.JQuery.showMask()
  if (clean) {
    dispatch({type: $$.Redux.Types.SUCCESS_FANTOM_CLEAN_DATA, keys: {record: clean}})
  }
  return dispatch({type: $$.Redux.Types.SUCCESS_UI_PAGER_INDEX, index});
}
const pageFirst = ({dispatch, cid, datum}) => {
  const index = 1;
  return page(dispatch, {cid, index, datum})
}

const pagePrev = ({dispatch, pagination, cid, clean}) => {
  let {index} = pagination;
  return page(dispatch, {cid, index: index - 1, clean})
}

const pageNext = ({dispatch, pagination, cid, datum}) => {
  let {index} = pagination;
  return page(dispatch, {cid, index: index + 1, datum})
}

const pageLast = ({dispatch, pagination, cid, datum}) => {
  const {pages} = pagination;
  return page(dispatch, {cid, index: pages, datum})
}

const pageCounter = (counter, data, size) => {
  let pageCount = {};
  if (counter) {
    const count = data.count;
    const pages = Math.ceil(count / size);
    pageCount.count = count;
    pageCount.pages = pages;
    pageCount.text = $$.Tool.Format.string(counter, count, pages);
  }
  return pageCount
}

const $_fnRender = (field) => {
  return <input
    {...field.input}
    type="text"
    className={css['input']}
    style={{width: "40px"}}
    required/>
}
const $_fnGoto = (cid, datum, $_pagination = {}) => (state, dispatch) => {
  const {index} = state;
  const current = $_pagination.index
  if(Number(index) != Number(current)) {
    /** Goto时页面没有发生改变 **/
    $$.Plugin.JQuery.showMask()
    return dispatch({type: $$.Redux.Types.SUCCESS_UI_PAGER_INDEX, index});
  }
}
/** 用于处理格式化 **/
const $_fnNormalize = (pages) => {
  return (value) => {
    /** 1.只能输入3位数字 **/
    value = value.replace(/[^\d{3}]/g, '');
    if (3 < value.length) {
      value = value.substring(0, 3);
    }
    /** 2.不能超过pages的值 **/
    if (value > pages) {
      value = pages;
    }
    return value;
  }
}

const $_fnSize = (dispatch, cid, clean) => (event) => {
  $$.Plugin.JQuery.showMask()
  const size = event.target.value
  if (clean) {
    dispatch({type: $$.Redux.Types.SUCCESS_FANTOM_CLEAN_DATA, keys: {record: clean}})
  }
  return dispatch({type: $$.Redux.Types.SUCCESS_UI_PAGER_SIZE, size});
}


const $_offMask = (props, prevProps) => {
  const newData = Immutable.fromJS(props['$_data'])
  const oldData = Immutable.fromJS(prevProps['$_data'])
  // 中间状态的切换，如果count为-1则是reload触发了Clean操作
  if (props.$_data && 0 <= props.$_data.count) {
    if (!Immutable.is(newData, oldData) && !vanReload(props, prevProps)) {
      $$.Plugin.JQuery.hiddenMask()
    }
    if (Immutable.is(newData, oldData) && vanReload(props, prevProps)) {
      $$.Plugin.JQuery.hiddenMask()
    }
  }
}

const $_fnMenu = (topbar = []) => {
  /** 1.根菜单 **/
  const menu = topbar.filter(item => "MENUITEM" != item.type)
  /** 2.子菜单 **/
  const submenu = topbar.filter(item => "MENUITEM" == item.type)
  /** 3.遍历根菜单 **/
  menu.forEach(item => {
    const cid = item.cid
    const items = submenu.filter(subitem => (subitem.butoir && cid == subitem.butoir.reference))
    item["items"] = items
  })
  return menu
}

const $_fnDropDown = (props = {}, nextProps = {}) => {
  const { $_menu } = nextProps
  if($_menu){
    jQuery('.clsDropDown').dropdown()
  }
  const sizeBar = jQuery('#pgSizeBar')[0]
  if(sizeBar){
    jQuery("#pgSizeBar").dropdown()
  }
}
/**
 * 参数改变时执行Update，数据读取过后执行Update，合计两次
 * @param props
 * @param nextProps
 * @returns {boolean}
 */
const $_fnRefresh = (props, nextProps) => {
  let $old = Immutable.fromJS(props.query.criterias)
  let $new = Immutable.fromJS(nextProps.query.criterias)
  if(!Immutable.is($old, $new)) return true
  $old = Immutable.fromJS(props.query.orders)
  $new = Immutable.fromJS(nextProps.query.orders)
  if(!Immutable.is($old, $new)) return true
  $old = Immutable.fromJS(props.query.filters)
  $new = Immutable.fromJS(nextProps.query.filters)
  if(!Immutable.is($old, $new)) return true
  /** Pager仅处理index和size **/
  const index = vanPager(props, nextProps, 'index')
  const size = vanPager(props, nextProps, 'size')
  if(index || size) return true
  /** 数据本身不同，也执行update的判断 **/
  $old = Immutable.fromJS(props.$_data)
  $new = Immutable.fromJS(nextProps.$_data)
  if(!Immutable.is($old, $new)) return true
  return false
}
export default {
  initiate,
  $_fnGoto: {
    $_fnRender,
    $_fnNormalize,
    $_fnGoto
  },
  $_fnMenu,
  $_fnReload,
  $_fnRefresh,
  $_fnSort,
  $_fnClean,
  $_fnSize,
  $_offMask,
  $_fn: {
    pageFirst,
    pagePrev,
    pageNext,
    pageLast,
    pageCounter
  },
  $_fnDropDown:$_fnDropDown
}
