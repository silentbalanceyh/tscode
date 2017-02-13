import React from 'react'
import mapping from '../../_internal/Redux'
import css from './Status.scss'
import $$ from '../../../seed'
// ------------------------------------
// Component Private Function
// ------------------------------------
/**
 * 根据配置处理注销按钮
 * @param config
 */
const fnSignOut = (config) => {
  const {redirect, message} = config;
  $$.Dialog.Semantic.confirm(message, $$.Secure.Login.signOut(redirect));
}

class Component extends React.PureComponent {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const {op, user, path} = this.props
    return (
      <aside className={`ui cards ${css['cards']}`}>
        <div className={`card ${css['card']}`}>
          <div className={`content ${css['content']}`}>
            <i className="left floated mini circular blue big user icon"/>
            <div className="meta">
              {$$.Render.Field.jsxOto('vcard', {node: 'User'})}&nbsp;{user.employeeNumber}<br/>
              {$$.Render.Field.jsxOto('realname', {node: 'User'})}&nbsp;{user.realname}<br/>
              {$$.Render.Field.jsxOto('phone', {node: 'User'})}&nbsp;{user.workPhone}<br/>
            </div>
          </div>
          <div className={`extra content ${css['extra-content']}`}>
            <div className={`ui buttons ${css['buttons']}`}>
              {
                op.map((item) => {
                  // 修复Button的key问题
                  item.uniqueId = item.name
                  return $$.Render.Anchor.render(item, {
                    className: `ui basic ${item.color} button ${css['button']}`
                  }, item.text, {path}, {fnSignOut})
                })
              }
            </div>
          </div>
        </div>
      </aside>
    )
  }
}

Component.displayName = 'Status'

export default mapping.multi(Component, {}, {
  user: ['app', 'user'],
  path: ['app', 'config', 'path']
})
