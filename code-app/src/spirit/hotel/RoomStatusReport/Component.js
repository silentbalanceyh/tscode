import React from 'react'

import $$ from '../../../seed'
import dispatches from './Redux'
import mapping from '../../_internal/Redux'
import css from './Component.scss'

import PureBusiness from '../../_assembly/PureBusiness'
// ------------------------------------
// Class Definition
// ------------------------------------
class Component extends PureBusiness{
  // ------------------------------------
  // 默认构造函数
  // ------------------------------------
  constructor(props){
    super(props,'hotel.RoomStatusReport')
  }
  // ------------------------------------
  // Component Valid Ensure
  // ------------------------------------
  componentWillMount() {
    $$.Tool.Flow.init(this.props)
  }

  componentDidUpdate(prevProps){
    dispatches.$_offMask(this.props,prevProps)
  }

  render() {
    const { $_room = {}, $_report } = this.props
    const { $_cid, $_pk } = this.props
    /** 2.读取数据信息以及配置信息 **/
    const now = $$.I18n.now()
    const rooms = $_room[now]?$_room[now]:[]
    const render = $$.Adom.Render.mountJArray(rooms) && 0 < rooms.length
    /** 4.读取列信息 **/
    const {columns} = $_report;
    return super.romance((render) ? (
      <table id={$_cid} data-id={$_pk} className="ui sortable celled table">
        <thead>
        <tr className={css['header']}>
          {
            columns.map((column, idx) => (<th key={`th${idx}`} className={css['header']}>{column.title}</th>))
          }
        </tr>
        </thead>
        <tbody>
        {
          rooms.map((item, idx) => {
            if (idx < rooms.length - 1) {
              return (<tr key={`tr${idx}`}>
                {
                  columns.map((column, cidx) => {
                    if (0 < cidx && cidx < columns.length - 1) {
                      return (item[column.field] > 0) ?
                        <td key={`td${cidx}`} className="positive">
                          <i className="green user icon"></i>{item[column.field]}</td> :
                        <td key={`td${cidx}`}>{item[column.field]}</td>
                    } else if (0 == cidx) {
                      return <td key={`td${cidx}`} className="header">{item[column.field]}</td>
                    } else {
                      return <td key={`td${cidx}`} className="header">{item[column.field]}</td>
                    }
                  })
                }
              </tr>)
            }
          })
        }
        </tbody>
        <tfoot>
        <tr>
          {
            columns.map((column, idx) => {
              const item = rooms[rooms.length - 1];
              return (
                (item[column.field] > 0) ?
                  <th key={`tf${idx}`} className={css['footer']}>{item[column.field]}</th> :
                  <th key={`tf${idx}`} className={css['footer']}>{item[column.field]}</th>
              )
            })
          }
        </tr>
        </tfoot>
      </table>
    ) : false)
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if(process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    $_report: React.PropTypes.shape({
      group: React.PropTypes.string.isRequired,
      columns: React.PropTypes.array.isRequired
    }).isRequired
  }
}
export default mapping.dispatch(Component,dispatches);
