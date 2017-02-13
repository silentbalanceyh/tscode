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
  constructor(props){
    super(props,'hotel.RoomStatusIcons')
  }
  componentWillMount() {
    $$.Tool.Flow.init(this.props)
  }

  render() {
    const {$_tabular, $_title} = this.props
    const {$_pk, $_cid} = this.props

    const current = dispatches.$_fnExtractStatus($_tabular);

    return super.romance(($$.Adom.Render.mountJObject($_tabular)) ? (
      <div id={$_cid} data-id={$_pk} className={`ui padded segments ${css['menu']}`}>
        <div className={`ui segment ${css['item']} ${css['header']}`}>
          <i className="inverted info icon"></i>{$_title}
        </div>
        <div className={`ui segment ${css['item']} ${css['content']}`}>
          {
            current.map((item) => ($$.Render.IconItem.render(item, css['icon'])))
          }
        </div>
      </div>
    ) : false)
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if(process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    $_title: React.PropTypes.string.isRequired,
    $_tabular: React.PropTypes.object
  }
}
export default mapping.dispatch(Component,dispatches);
