import React from 'react'
import dispatches from './Redux'
import $$ from '../../../seed'
import css from './Component.scss'
// ------------------------------------
// 右边专用操作Button
// ------------------------------------
const $_fnClick = (id) => {
  return () => {
    if (jQuery(`#${id}`)[0]) {
      jQuery(`#${id}`)[0].click()
    } else {
      console.warn(`Element of id = ${id} could not be found in current page`)
    }
  }
}

const $_fnFixedBtns = (current, meta = {}, props = {}) => {
  const {$_actions = []} = props
  return (
    <div className={`right menu ${css['tmenu']}`}>
      {
        $_actions.map((action) => {
          const {text, icon, node, connect, active = 0} = action
          const attrs = {}
          if (connect) {
            attrs.onClick = $_fnClick(connect)
          }
          let className = `link item ${css['titem']} ${active != current ? `disabled ${css['distext']}` : ''}`
          className = `${className} jsxOp`
          let iconCls = `${css['disicon']} jsxOpIcon`
          return (
            <div id={`subtabop${active}`}
                 key={dispatches.$_fnKey()}
                 className={className}
                 {...attrs}>
              {$$.Render.Field.jsxOto(icon, {
                node,
                index:active,
                className: `${active != current ? iconCls : 'jsxOpIcon'}`
              })}{text}
            </div>
          )
        })
      }
    </div>
  )
}

const $_fnMove = (props, {index}) => {
  return () => {
    /** 上边的Tab页的Move动作 **/
    jQuery(`.jsxSubTab`).removeClass('active')
    jQuery(`#subtab${index}`).addClass('active')
    /** 下边的Page页的Move动作 **/
    jQuery(`.jsxSubTabPage`).removeClass('active')
    jQuery(`#subtabpage${index}`).addClass('active')
    /** 右边的Button **/
    jQuery(`.jsxOp`).addClass(`disabled`)
    jQuery(`.jsxOp`).addClass(css['distext'])
    jQuery(`#subtabop${index}`).removeClass(`disabled`)
    jQuery(`#subtabop${index}`).removeClass(css['distext'])
    /** 右边的Button事件替换 **/
    jQuery(`.jsxOpIcon`).addClass(css['disicon'])
    jQuery(`#subtabicon${index}`).removeClass(css['disicon'])
  }
}

const $_fnTab = (headers = [], active, meta = {}, props = {}) => {
  return (
    <div className={`ui top attached tabular menu`}>
      {
        headers.map((item, idx) => {
          let className = ''
          let click
          if (!item.disabled) {
            const current = (idx == active)
            className = (current) ? `active item ${css['acttext']}` : `item ${css['acttext']}`
            click = $_fnMove(props, {
              active,
              index: idx
            })
          } else {
            className = `disabled item ${css['distext']}`
          }
          className = `${className} jsxSubTab`
          return (
            <div className={className} id={`subtab${idx}`} key={item.key} onClick={click ? click : false}>
              {item.title}
            </div>
          )
        })
      }
      {$_fnFixedBtns(active, meta, props)}
    </div>
  )
}

export default {
  $_fnTab
}
