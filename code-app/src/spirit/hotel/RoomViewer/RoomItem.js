import React from 'react'

import $$ from '../../../seed'
import Shared from '../_shared'
import css from './RoomItem.scss'

class Component extends React.Component{

  render(){
    /** 1.读取两个特殊数据 **/
    const {$_data, $_status = [], $_types = []} = this.props;
    /** 2.封装当前数据 **/
    let item = {};
    const render = $$.Adom.Render.mountJArrays([$_status, $_types]) && $$.Adom.Render.mountJObject($_data);
    if (render) {
      item = Shared.Room.$_fnCalcStatus($_data, $_status, $_types);
    }
    const {clean = {}, op = {}} = item;
    return (render) ? (
        <div className={css['room']} style={{
          backgroundColor: item.color
        }}>
          <div className="ui mini statistic">
            <div className="value">
              {item.number}
            </div>
            <div className="label">
              {item.type}
            </div>
          </div>
          <div>
            <i className={`${op.icon} icon ${css['left']}`}></i>
            <i className={`${clean.icon} icon ${css['left']}`}></i>
          </div>
        </div>
      ) : false
  }
}

export default Component
