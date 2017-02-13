import React from 'react'
import css from './UIAssist.scss'
import DataList from './DataList'
// ------------------------------------
// 构造页面专用的Tab的Class Name
// ------------------------------------
const $_fnActiveCls = (idx, active) => {
  let className = (idx == active) ? `ui bottom attached active tab segment` : 'ui bottom attached tab segment'
  className = `${className} ${css['page']} jsxSubTabPage`
  return className
}
// ------------------------------------
// Data List专用
// ------------------------------------
const $_fnListForm = (children = {}, data, {idx, meta, props = {}, key = ''}) => {
  const {$_subactive = 0, $_tables = {}} = props
  const className = $_fnActiveCls(idx, $_subactive)
  const datalist = $_tables[key] ? $_tables[key] : []
  if (!Array.prototype.isPrototypeOf(data)) data = []
  return (
    <div className={className} id={`subtabpage${idx}`} key={`page${idx}`}>
      <div className={`ui two column grid`}>
        <div className="row">
          <div className={`column ${css['left']}`}>
            {DataList.$_fnDataList(datalist, data, meta)}
          </div>
          <div className={`column ${css['right']}`}>
            <div key={`fieldset${idx}`} className={`${css['fieldset']}`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const $_fnList = ({
  fieldsets = {}, datum = {}
},{idx,meta,props = {}}) => {
  const {$_subactive = 0, $_tables = {}} = props
  const className = $_fnActiveCls(idx, $_subactive)
  const keys = Object.keys(fieldsets)
  return (
    <div className={className} id={`subtabpage${idx}`} key={`page${idx}`}>
      {
        keys.map(key => {
          const label = fieldsets[key]
          const columns = $_tables[key]?$_tables[key]:[]
          const data = datum[key]?datum[key]:[]
          return (
            <div key={key} className="ui list">
              <div className="item">
                <h5 className={`ui dividing header ${css['header']}`}>
                  <label className="ui tag label">{label}</label>
                </h5>
                {DataList.$_fnDataList(columns, data, meta)}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
export default {
  $_fnListForm,
  $_fnList
}
