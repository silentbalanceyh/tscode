const $_fnCalcStatus = (data, selector) => {
  /** 1.提取Assist以及Tabular中的数据 **/
  const { assist = {}, tabular = {} } = selector
  /** 2.处理楼层栋以及房型 **/
  let floor
  if(assist['floors'] && assist['floors'].list){
    floor = assist['floors'].list.filter(item => item.uniqueId == data.floor)
  }
  floor = (floor)?floor[0]:{}
  let tent
  if(assist['tents'] && assist['tents'].list){
    tent = assist['tents'].list.filter(item => item.uniqueId == data.tent)
  }
  tent = (tent)?tent[0]:{}
  let roomType
  if(assist['room.types'] && assist['room.types'].list){
    roomType = assist['room.types'].list.filter(item => item.uniqueId == data.roomTypeId)
  }
  roomType = (roomType)?roomType[0]:{}
  /** 3.处理房屋状态信息 **/
  let opStatus
  if(tabular['room.status']){
    opStatus = tabular['room.status'].filter(item => item.uniqueId == data.opStatus)
  }
  opStatus = (opStatus)?opStatus[0]:{}
  let cleanStatus
  if(tabular['room.clean.status']){
    cleanStatus = tabular['room.clean.status'].filter(item => item.uniqueId == data.cleanStatus)
  }
  cleanStatus = (cleanStatus)?cleanStatus[0]:{}
  /** 4.处理预离、预抵、占用、空房信息 **/
  let flags = {}
  if(tabular['room.op.status']){
    tabular['room.op.status'].forEach(item => {
      flags[item.code] = item.config
    })
  }
  return {
    room:data, floor, tent, roomType, flags,
    opStatus, cleanStatus
  }
}

export default {
  $_fnCalcStatus
}
