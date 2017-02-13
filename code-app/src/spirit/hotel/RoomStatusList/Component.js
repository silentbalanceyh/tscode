import React from 'react'

import $$ from '../../../seed'
import dispatches from './Redux'
import Shared from '../_shared'
import mapping from '../../_internal/Redux'

import css from './Component.scss'

import PureBusiness from '../../_assembly/PureBusiness'
class Component extends PureBusiness {
  // ------------------------------------
  // 默认构造函数
  // ------------------------------------
  constructor(props) {
    super(props, 'hotel.RoomStatusList')
  }

  render() {
    const {$_current, $_tabular, $_spec, $_types} = this.props
    const {$_pk, $_cid} = this.props
    /** 2.判断是否Render **/
    const render = $$.Adom.Render.mountJObject($_tabular)
      && $$.Adom.Render.mountJArray($_current)
      && $$.Adom.Render.mountList($_types);
    /** 3.读取方向 **/
    const {direction = ''} = $_spec;
    /** 4.抽取types和status **/
    const status = dispatches.$_fnExtractStatus($_tabular)
    const types = ($_types.list && 0 < $_types.list.length) ? $_types.list : []
    if (render) $$.Plugin.JQuery.hiddenMask()
    return super.romance((render) ? (
        <div id={$_cid} data-id={$_pk} className={`ui ${direction} list ${css['list']}`}>
          {
            $_current.map((item) => {
              const key = `item${item.uniqueId}`;
              /** 5.计算房间 **/
              let room = {};
              const render = $$.Adom.Render.mountJArrays([status, types]) && $$.Adom.Render.mountJObject(item);
              if (render) {
                room = Shared.Room.$_fnCalcStatus(item, status, types);
              }
              const {clean = {}, op = {}} = room;
              return (
                <div className={`item ${css['item']}`} key={key}>
                  <div className={css['room']}
                       onClick={dispatches.$_fnViewRoom(this.props)}
                       onContextMenu={dispatches.$_fnContext(this.props)}
                       style={{
                         backgroundColor: room.color
                       }}>
                    <div className="ui mini statistic">
                      <div className="value">
                        {room.number}
                      </div>
                      <div className="label">
                        {room.type}
                      </div>
                    </div>
                    <div>
                      <i className={`${op.icon} icon ${css['left']}`}></i>
                      <i className={`${clean.icon} icon ${css['left']}`}></i>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      ) : false)
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if (process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    $_spec: React.PropTypes.shape({
      direction: React.PropTypes.string
    }),
    $_current: React.PropTypes.array.isRequired,
    $_tabular: React.PropTypes.object
  }
}
export default mapping.dispatch(Component, dispatches);
