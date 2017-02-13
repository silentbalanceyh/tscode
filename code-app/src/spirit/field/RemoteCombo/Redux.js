import React from 'react'

import $$ from '../../../seed'

const $_fnExecute = (props, monitor) => {
  /** 1.构造Promise **/
  const promise = $$.Data.Field.ingest(props, monitor)
  /** 2.调用Promise **/
  promise.then((response) => {
    const count = response.count
    if (0 < count) {
      const data = response.list
      const config = props.config
      /** 3.提取原始值 **/
      const values = props.inputes['fmForm'].initial ? props.inputes['fmForm'].initial : {}
      const selected = values[config.name]
      $$.Plugin.JQuery.setOptions(config, data, selected)
    }
  })
}

const $_fnInit = (props) => {
  $$.Data.Field.execInit(props, $_fnExecute)
}

const $_fnUpdate = (props, prevProps) => {
  $$.Data.Field.execUpdate(props, prevProps, $_fnExecute)
}

export default{
  $_fnInit,
  $_fnUpdate
}
