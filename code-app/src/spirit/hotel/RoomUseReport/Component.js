import React from 'react'

import $$ from '../../../seed'
import dispatches from './Redux'
import mapping from '../../_internal/Redux'
import css from './Component.scss'

import PureBusiness from '../../_assembly/PureBusiness'

class Component extends PureBusiness {
  // ------------------------------------
  // 默认构造函数
  // ------------------------------------
  constructor(props) {
    super(props, 'hotel.RoomUseReport')
  }

  componentWillMount() {
    $$.Tool.Flow.init(this.props)
  }

  render() {
    const {$_data = {}, $_title} = this.props
    const {$_pk, $_cid} = this.props
    /** 1.读取Report数据 **/
    const now = $$.I18n.now()
    const rooms = $_data[now] ? $_data[now] : []
    /** 2.读取总统计数 **/
    return super.romance((0 < rooms.length) ? (
        <div id={$_cid} data-id={$_pk} className={`ui padded segments ${css['menu']}`}>
          <div className={`ui segment ${css['item']} ${css['header']}`}>
            <i className="inverted info icon"></i>{$_title}
          </div>
          <div className={`ui segment ${css['item']} ${css['content']}`}>
            <div className="ui list">
              <div className="item">（
                <label style={{color: 'green'}}>可用房</label>/
                <label style={{color: 'mediumvioletred'}}>维修房</label>/
                <label style={{color: 'red'}}>停用房</label>/
                总房间）
              </div>
              {
                rooms.map((item, idx) => (
                  <div className={`item`} key={`row${idx}`} style={{width: "90%"}}>
                    {item.roomType}
                    <label style={{float: 'right'}}>
                      <label style={{color: 'green'}}>{item.useful}</label>&nbsp;&nbsp;/&nbsp;&nbsp;
                      <label style={{color: 'mediumvioletred'}}>{item.mind}</label>&nbsp;&nbsp;/&nbsp;&nbsp;
                      <label style={{color: 'red'}}>{item.disabled}</label>&nbsp;&nbsp;/&nbsp;&nbsp;
                      {item.typed}
                    </label>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      ) : false)
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if (process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    $_title: React.PropTypes.string.isRequired
  }
}
export default mapping.dispatch(Component, dispatches);
