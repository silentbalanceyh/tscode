import React from 'react'

import $$ from '../../../seed'

const $_fnExecute = (props, monitor) => {
  /** 1.构造Promise **/
  const promise = $$.Data.Field.order(props, monitor)
  /** 2.调用Promise **/
  promise.then((response) => {
    const count = response.count
    if (0 < count) {
      /** 3.设置最终值 **/
      const data = { value: response.count + 1}
      data['list'] = response.list
      const output = $$.Data.Field.output(props)
      $$.Plugin.JQuery.setOutput(output,data)
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
