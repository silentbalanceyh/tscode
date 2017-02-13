import $$ from '../seed'
import Immutable from 'immutable'
/** 读取ID值 **/
const $_fnGetClean = (tabular,code) => {
  let cleanStatus = tabular['room.clean.status']
  if(!cleanStatus){
    cleanStatus = []
  }
  let status = cleanStatus.filter(item => item.code == code)
  if(0 < status.length){
    return status[0].uniqueId
  }
}
/** 按照Room Type Id执行 **/
const $_fnRoomMap = (rooms = []) => {
  const room = {}
  rooms.forEach((item) => {
    const typeId = item["roomTypeId"]
    if(!room[typeId]){
      room[typeId] = []
    }
    room[typeId].push(item)
  })
  return room
}

const $_fnFilterClean = (rooms = [], tabular, code) => {
  const status = $_fnGetClean(tabular,code)
  rooms = rooms.filter(item => item.cleanStatus == status)
  return Immutable.fromJS(rooms).sortBy(item => item.get('number')).toJS()
}

const $_fnCalcClean = (rooms = [], tabular = {}) => {
  let result = []
  /** 1.清洁检查房 **/
  result = result.concat($_fnFilterClean(rooms, tabular, 'Checked'))
  /** 2.清洁未检查房 **/
  result = result.concat($_fnFilterClean(rooms, tabular, 'Unchecked'))
  /** 3.脏房 **/
  result = result.concat($_fnFilterClean(rooms, tabular, 'Dirty'))
  return result;
}

const $_fnCalcRoom = (rooms = [], tabular = {}) => {
  let result = []
  /** 0.当天排过的房间 **/
  let scheduled = rooms.filter(item => item.arriving)
  result = result.concat(scheduled)
  /** 1.筛选空房间 **/
  let empties = rooms.filter(item => (!item.arriving && !item.leaving))
  /** 2.针对空房间按清洁状态排序 **/
  result = result.concat($_fnCalcClean(empties, tabular))
  /** 3.筛选预离房 **/
  let leaving = rooms.filter(item => (!item.arriving && item.leaving))
  /** 4.针对欲离房按清洁状态排序 **/
  result = result.concat($_fnCalcClean(leaving, tabular))
  return result
}

const $_fnBuildDatum = (list = [], metadata, rooms = {}) => {
  const datum = {}
  const scheduled = []
  list.forEach((item, idx) => {
    const cid = `${metadata.cid}${idx}${item.uniqueId}`
    datum[cid] = []
    /** 需要安排的房型 **/
    const type = item.roomTypeId
    /** 将已经存在的添加到队列中，防止重排 **/
    const exists = item.roomNumbers
    let schCounter = item.roomCounter
    if(exists && 0 < exists.length){
      exists.forEach(exist => {
        datum[cid].push(exist)
        scheduled.push(Number(exist))
      })
      schCounter -= exists.length
    }
    /** 大于时才执行添加 **/
    if(0 < schCounter) {
      /** 读取需要排的数量 **/
      const $scheduled = Immutable.fromJS(scheduled)
      const readies = rooms[type].filter(item => !$scheduled.contains(item.uniqueId))
      /** 开始排房 **/
      for (let idx = 0; idx < schCounter; idx++) {
        datum[cid].push(String(readies[idx].uniqueId))
        scheduled.push(readies[idx].uniqueId)
      }
    }
  })
  return datum
}

const _auto = (params, config = {}, {
  dispatch
}) => {
  $$.Logger.Input.formInput(params, '_auto', config)
  /** 1.计算房间的排列顺序 **/
  const { data, tabular } = params
  const { metadata } = config.config
  let rooms = $$.Entity.Data.lookup(params, metadata.data)
  rooms = $_fnRoomMap(rooms)
  /** 2.对每一种房型进行排序 **/
  for(const key in rooms){
    let values = rooms[key]
    values = $_fnCalcRoom(values, tabular)
    rooms[key] = values
  }
  /** 3.读取目前系统中的所有订单数据 **/
  const datum = $_fnBuildDatum(data.list, metadata, rooms)
  /** 4.执行最终的dispatch **/
  const path = metadata.pathes
  const field = metadata.target
  data.list.forEach((item,idx) => {
    const cid = `${metadata.cid}${idx}${item.uniqueId}`
    const id = item.uniqueId
    const value = datum[cid]
    dispatch({
      type: $$.Redux.Types.SUCCESS_UI_ROW_REFRESH,
      data: { path, field, id, value }
    })
  })
  /** 5.执行最终选中处理 **/
  dispatch({
    type: $$.Redux.Types.SUCCESS_CONTROL_HASH,
    cid: metadata.reload,
    data: {
      path: metadata.datum,
      value: datum
    }
  })
}

const _save = (config) => {
  console.info(config)
}

export default {
  _save,
  _auto
}
