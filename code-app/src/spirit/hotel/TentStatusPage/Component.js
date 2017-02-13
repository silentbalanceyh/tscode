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
    /** Parent传入 **/
    const {dim = [], fitem, dimension, data, fidx} = this.props
    const {$_tabular, $_types} = this.props
    /** 2.判断是否Render **/
    const render = $$.Adom.Render.mountJObject($_tabular)
      && $$.Adom.Render.mountList(data)
      && $$.Adom.Render.mountList($_types);
    /** 3.读取方向 **/
    /** 4.抽取types和status **/
    const status = dispatches.$_fnExtractStatus($_tabular)
    const types = ($_types.list && 0 < $_types.list.length) ? $_types.list : []
    if (render) $$.Plugin.JQuery.hiddenMask()
    return super.romance((render) ?
      <div>
        {
          dim.map((sitem, sidx) => {
            const $_current = data.list.filter(ditem => ditem[dimension.first.field] == fitem.uniqueId && ditem[dimension.second.field] == sitem.uniqueId)
            const name = `cube-tabpage-item${fidx}${sidx}`;
            return (
              <dl className={`ui divided selection list ${css['datalist']}`} key={name}>
                <dt className={`item ${css['hitem']}`}>
                  <label className={`ui ${dimension.second.adj} label`}>{sitem[dimension.second.target]}</label>
                </dt>
                <dd className={`item ${css['datalist']}`}>
                  <div className={`ui horizontal list ${css['list']}`}>
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
                          <div className={`item ${css['item']}`}
                               onClick={dispatches.$_fnViewRoom(this.props,item.uniqueId)}
                               onContextMenu={dispatches.$_fnContext(this.props,item.uniqueId)}
                               key={key}>
                            <div className={css['room']} style={{
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
                </dd>
              </dl>
            )
          })
        }
      </div> : false)
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if (process.env.NODE_ENV === `development`) {
  Component.propTypes = {}
}
export default mapping.dispatch(Component, dispatches);
