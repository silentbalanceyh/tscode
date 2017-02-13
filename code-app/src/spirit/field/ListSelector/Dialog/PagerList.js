import React from 'react'

import $$ from '../../../../seed'
import selectors from '../../../_shared/Selector'
import css from './Component.scss'

import PagerBar from './PagerBar'

class PagerList extends React.Component {
  render() {
    const {loaded, data = [], columns = [], state, click} = this.props
    return (loaded) ? (
      <table className={`ui selectable striped single line table`}>
        <thead>
        <tr className={css['header']}>
          {columns.map((column) => (<th key={`th${column.field}`}>{column.title}</th>))}
        </tr>
        </thead>
        <tbody>
        { (0 < data.length) ?
          data.map((data, idx) => selectors.$_fnRow(data, columns, idx)) :
          <tr>
            <td colSpan={columns.length}>{state.search.empty}</td>
          </tr>
        }
        </tbody>
        <tfoot>
        <tr>
          <th colSpan={columns.length}>
            <PagerBar state={state} click={click}/>
          </th>
        </tr>
        </tfoot>
      </table>
    ) : ($$.Tool.Flow.loading("数据加载中……"))
  }
}

export default PagerList
