import React from 'react'

import $$ from '../../../seed'
/**
 *
 * @param props
 */
const $_fnExecute = (props, monitor) => {
  /** 1.构造Promise **/
  const promise = $$.Data.Field.ingest(props, monitor)
  /** 2.调用Promise **/
  promise.then((response) => {
    const count = response.count
    if (0 < count) {
      /** 3.设置最终值 **/
      const output = $$.Data.Field.output(props)
      const data = {value: count}
      $$.Plugin.JQuery.setOutput(output, data);
    }
  })
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
