import React from 'react'
import memoize from 'lodash/memoize'

import css from './Component.scss'
import $$ from '../../../seed'
import dispatches from './Redux'
import mapping from '../../_internal/Redux'
import PureContainer from '../../_assembly/PureContainer'
import {CommonBar} from '../../bar'
// ------------------------------------
// Class Definition
// ------------------------------------
class Component extends PureContainer {
  // ------------------------------------
  // 默认构造函数
  // ------------------------------------
  constructor(props) {
    super(props, 'holder.TabListHolder')
  }

  componentWillMount() {
    $$.Tool.Flow.init(this.props, {force: true})
  }

  _shouldComponentUpdate = memoize((nextProps) => {
    const updated = $$.Tool.Hooker.isRefresh(this.props, nextProps)
    if (process.env.NODE_ENV === `development`) {
      if (updated) {
        this.counter++
      } else {
        this.resetCounter = true
      }
    }
    return updated
  })
  // ------------------------------------
  // Performance Fix
  // ------------------------------------
  shouldComponentUpdate(nextProps) {
    let updated = this._shouldComponentUpdate(nextProps)
    if (!updated) updated = (this.props.$_active != nextProps.$_active)
    return updated
  }

  // ------------------------------------
  // Major Render Method
  // ------------------------------------
  render() {
    /** Content **/
    const {$_cid, children, dispatch} = this.props;
    /** Header Content **/
    const {$_title, $_headers = []} = this.props
    /** Tab专用 **/
    let {$_active, $_connect = {}} = this.props
    const {hidden, dynamic = []} = $_connect
    const {$_search} = this.props
    /** 特殊默认值 **/
    if (0 !== $_active && !$_active && $_search) $_active = 1
    const limit = ($_search) ? 2 : 1
    const connect = ($_connect[$_active]) ? $_connect[$_active] : {}
    const disabled = $_headers.length > limit
    /** Divide/Help部分 **/
    const {$_left, $_right} = this.props
    const {$_theme, $_steps = []} = this.props
    /** 是否支持搜索 **/
    $$.Assert.isNumber({$_active});
    $$.Assert.isArray({children});
    return super.romance(
      <main className={`ui basic segment ${css['content']}`}>
        <CommonBar key="CommonBar" config={connect} hidden={hidden} dynamic={dynamic} active={$_active}/>
        <div className={`${css['top']} jsxContent`}>
          <div className={`ui top attached tabular menu`}>
            {
              $_headers.map((item, idx) => {
                // 构造关闭
                let {closure} = item;
                let closeBtn = '';
                if (closure) {
                  closeBtn = $$.Render.Field.jsxOto('close', {
                    node: 'Op', className: css['closure'], click: dispatches.$_fnTabClosing(idx, dispatch, $_cid)
                  })
                }
                // 构造激活
                const itemClass = closure ? css['closureItem'] : css['item'];
                let className = idx == $_active ? `active item ${itemClass}` : (disabled) ? `item ${itemClass} ${css['disabled']}` : `item ${itemClass}`;
                const click = (limit > idx && !disabled) ? dispatches.$_fnTabMoving(idx, dispatch, $_cid) : false
                return (
                  <div className={className} key={item.key} onClick={click}>
                    {item.title}
                    {(closure) ? closeBtn : ''}
                  </div>
                )
              })
            }
          </div>
          {
            $_headers.map((item, idx) => {
              let className = idx == $_active ? 'ui bottom attached active tab segment' : 'ui bottom attached tab segment';
              className = `${className} ${css['page']}`
              return (limit > idx) ? (
                  <div className={className}
                       key={`page${idx}`}>
                    <div className={`ui list ${css['list']}`}>
                      <div className="item">
                        {children[idx]}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={className} key={`page${idx}`}>
                    <div className={`ui two column grid ${css['top']}`}>
                      <div className={`${$_left.adj} column ${css['left']}`.trim()} style={$_left.style}>
                        {children[idx]}
                      </div>
                      <div className={`${$_right.adj} column ${css['right']}`.trim()} style={$_right.style}>
                        <div className={`ui raised segments ${css['container']}`}>
                          <h6 className={`ui segment`}>
                            {$$.Render.Field.jsxIcon('help', 'circular blue')}
                            <div className={`ui tag ${$_theme.color} label`}>{$_title}</div>
                          </h6>
                          <div className={`ui segment`}>
                            <div className="ui ordered list">
                              {
                                $_steps.map((item, idx) => {
                                  return (
                                    <div className={`item`} key={idx}>
                                      <div className="header">{item.name}</div>
                                      <div className={`${css['step']}`}>{item.message}</div>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            })
          }
        </div>
      </main>
    )
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
export default mapping.multi(Component, dispatches, {
  status: ['content', 'status'],
  // Tab List专用
  $_headers: ['content', 'uex', 'tab', 'headers'],
  $_active: ['content', 'uex', 'tab', 'active']
});
