import React from 'react'
import moment from 'moment'

import $$ from '../../../seed'
/**
 *
 * @param props
 */
const $_fnExecute = (props, monitor) => {
  /** 1.读取配置信息 **/
  const { config = {} } = props
  const { duration = {}, mode = "DAY"} = config
  /** 2.读取from和to **/
  if(monitor.target) {
    const fromVal = monitor.target[duration.from]
    const toVal = monitor.target[duration.to]
    /** 3.计算差值 **/
    const result = $_fnDuration(fromVal,toVal,mode, config.pattern)
    if(result){
      /** 4.设置最终结果值 **/
      const selector = `#${config.cid}`
      jQuery(selector).focus()
      jQuery(selector).val(result)
      jQuery(selector).blur()
    }
  }
}

const $_fnDuration = (fromVal,toVal,mode = "DAY", pattern = "YYYY-MM-DD HH:mm:ss") => {
  let duration
  /** 0.如果不是Moment则需要执行转换 **/
  if(!moment.isMoment(fromVal)){
    fromVal = moment(fromVal, pattern)
  }
  if(!moment.isMoment(toVal)){
    toVal = moment(toVal, pattern)
  }
  /** 1.两个都是Moment的时候直接处理 **/
  if(moment.isMoment(fromVal) && moment.isMoment(toVal) && fromVal.isBefore(toVal)){
    /** 计算差值 **/
    duration = toVal.diff(fromVal,mode)
    /** 计算基础修正，不需要修正值 **/
  }
  return duration
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
