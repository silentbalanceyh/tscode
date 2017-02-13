import React from 'react'
import $$ from '../../../seed'
import Assist from './UIAssist'
// ------------------------------------
// 处理Table专用数据信息
// ------------------------------------
const $_fnProcessData = (data = [], meta) => {
  const targetData = []
  let index = 0
  data.forEach((item, idx) => {
    const record = {}
    record['roomNumber'] = item['roomCounter']
    record['rowIndex'] = index
    const roomType = meta.assist['room.types'].list.filter(oitem => oitem.uniqueId == item.roomTypeId)
    if (1 == roomType.length) {
      record['roomType'] = roomType[0]['name']
    }
    record.uniqueId = `rooms${idx}`
    targetData.push(record)
    index++
  })
  return targetData
}
// ------------------------------------
// 第一页：添加订单项
// ------------------------------------
const $_fnItems = (children = {}, {idx, meta, props = {}}) => {
  const {$_tables = {}} = props
  const datameta = $_tables['data']
  let data = $$.Entity.Data.lookup(props, datameta)
  if (!Array.prototype.isPrototypeOf(data)) data = []
  data = $_fnProcessData(data, meta)
  return (Assist.$_fnListForm(children, data, {idx, meta, props, key:'roomlist' }))
}

export default {
  $_fnItems
}
