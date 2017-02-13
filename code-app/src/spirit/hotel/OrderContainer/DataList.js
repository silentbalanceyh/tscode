import React from 'react'
import dispatches from './Redux'
import $$ from '../../../seed'
import css from './DataList.scss'
// ------------------------------------
// 构造Data List专用功能函数
// ------------------------------------
const $_fnDataList = (columns = [], data = [], meta) => (
  <table className={`ui selectable sortable celled table ${css['table']}`}>
    <thead>
    <tr className={css['header']}>
      {columns.map((item) => (
        <th key={dispatches.$_fnKey()} style={(item.style)?(item.style):{}}>
          {(item.title)?item.title:false}
        </th>
      ))}
    </tr>
    </thead>
    <tbody className={css['body']}>
    {
      (0 < data.length) ? data.map((row, idx) => ($$.Render.PageList.renderRow(row, columns, Object.assign({
          row: idx
        }, meta)))) : false
    }
    </tbody>
  </table>
)

export default {
  $_fnDataList
}
