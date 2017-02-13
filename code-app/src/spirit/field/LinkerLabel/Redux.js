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
      const { config = {}} = props
      console.assert(1 == response.list.length)
      const data = response.list[0][config.value]
      /** 4.设置Label **/
      jQuery(`#${config.cid}`).text(data)
    }
  })
}

const $_fnUpdate = (props, prevProps) => {
  $$.Data.Field.execUpdate(props,prevProps,$_fnExecute)
}

export default{
  $_fnUpdate
}
