
import $$ from '../../../seed'
import moment from 'moment'

const $_fnExecute = (props, monitor) => {
  const _TIME_FORMAT = $$.Arkt['TIME']
  const { config = {}, dispatch } = props
  const data = monitor.target
  const { calculate, form, name, mode = 'day' } = config
  if(calculate){
    const { start, duration, target } = calculate
    if(start && duration){
      /** 计算当前Form中的值 **/
      let startData = data[start]
      let targetData = data[target]
      /** 计算中间的差值 **/
      const durationData = data[duration]
      /** 转换targetData **/
      if(!moment.isMoment(targetData)) targetData = moment(targetData,_TIME_FORMAT)
      if(!moment.isMoment(startData)) startData = moment(startData,_TIME_FORMAT)
      if(moment.isMoment(startData) && 0 < durationData
        && form && dispatch && name){
        const endData = moment(startData.format(_TIME_FORMAT),_TIME_FORMAT).add(durationData,mode)
        /** 修改时间信息  **/
        if(moment.isMoment(endData)) {
          let updated = (targetData)?false:true
          if(targetData) {
            updated = !targetData.isSame(endData, mode) ? true : false
          }
          /** 执行更新的条件 **/
          if(updated) {
            dispatch({type: $$.Abrupt.ReduxForm.RD_FILL, meta: {form, field: name}, payload: endData})
          }
        }
      }
    }
  }
}
const $_fnInit = (props) => {
  $$.Data.Field.execInit(props,$_fnExecute)
}

const $_fnUpdate = (props, prevProps) => {
  $$.Data.Field.execUpdate(props,prevProps,$_fnExecute)
}

export default{
  $_fnInit,
  $_fnUpdate
}
