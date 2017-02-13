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
  promise.then((data) => {
    if (data) {
      const {config:{form},dispatch,config:{ingest:{linker}}} = props
      /** 遍历linker **/
      $$.Plugin.ReduxForm.linker({ form, dispatch}, linker, data)
    }
  })
}

const $_fnInit = (props) => {
  const monitor = $$.Data.Field.monitor(props)
  if ($$.Data.Field.isExecute(monitor)) {
    $_fnExecute(props, monitor)
  }
}

const $_fnUpdate = (props, prevProps) => {
  if ($$.Data.Field.isUpdated(props, prevProps)) {
    const monitor = $$.Data.Field.monitor(props)
    if ($$.Data.Field.isExecute(monitor)) {
      $_fnExecute(props, monitor)
    }
  }
}

export default{
  $_fnInit,
  $_fnUpdate
}
