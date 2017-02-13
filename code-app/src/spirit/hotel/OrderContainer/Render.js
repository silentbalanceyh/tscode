import React from 'react'
import $$ from '../../../seed'
import css from './Component.scss'

import PageItem from './PageItem'
import OrderItem from './OrderItem'

const $_fnOperator = (auditors = [], meta) => {
  /** 计算值 **/
  auditors.forEach(auditor => {
    if (auditor.value && Array.prototype.isPrototypeOf(auditor.value)) {
      const path = auditor.value
      const replaced = $$.Entity.Data.lookup(meta, path)
      if (replaced) {
        auditor.value = replaced
      }
    }
  })
  return (
    <div className={`ui form message ${css['message']}`}>
      <div className={`inline fields ${css['row']}`}>
        {
          auditors.map((item, idx) => {
            return (
              <div key={`auditor${idx}`} className="inline field" style={{width: '33%'}}>
                <label style={{fontWeight: 400}}>{item.label}</label>
                <label style={item.style ? item.style : {}}>{item.value}</label>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

const $_fnOrder = (flag, children = {}) => {
  return (
    <div className={`ui two column grid ${css['ordergrid']}`}>
      <div className={`row ${css['orderrow']}`}>
        <div className={`column ${css['left']}`}>
          {children}
        </div>
        <div className={`column ${css['right']}`}>
          <div className={css['flag']}>
            {flag}
          </div>
        </div>
      </div>
    </div>
  )
}

export default {
  $_fnOperator,
  $_fnOrder,
  Page: {
    "R0": PageItem.$_fnItems,
    "I0": OrderItem.$_fnItems,
    "I1": OrderItem.$_fnOccups
  }
}
