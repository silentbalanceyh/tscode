import React from 'react'
import Assist from './UIAssist'
// ------------------------------------
// 第一页：订单项
// ------------------------------------
const $_fnItems = (children, {idx, meta, props = {}}) => {
  const {$_tablelabels = {}} = props
  let {$_data = {}} = props
  $_data = $_data['$ITEMS$'] ? $_data['$ITEMS$'] : []
  const inputes = {fieldsets: $_tablelabels, datum: $_data}
  // children未使用
  return (Assist.$_fnList(inputes, {idx, meta, props}))
}
// ------------------------------------
// 第二页：客单
// ------------------------------------
const $_fnOccups = (children, {idx, meta, props = {}}) => {
  const data = []
  return (Assist.$_fnListForm(children, data, {idx, meta, props, key: 'traveler'}))
}
export default {
  $_fnItems,
  $_fnOccups
}
