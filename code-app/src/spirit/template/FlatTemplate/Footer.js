import React from 'react'
import mapping from '../../_internal/Redux'
import css from './Footer.scss'
import $$ from '../../../seed'

class Component extends React.PureComponent {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const {data = {}} = this.props
    return (
      <footer className={css['bottom']}>
        <ui className="ui horizontal list">
          <li className={`item ${css['item']}`}>
            {$$.Render.Field.jsxOto('dept', {node: 'User', className: css['icon']})}&nbsp;
            {data.name}
          </li>
          <li className={`item ${css['item']}`}>
            {$$.Render.Field.jsxOto('realname', {node: 'User', className: css['icon']})}&nbsp;
            负责人：{data.agent}
          </li>
          <li className={`item ${css['item']}`}>
            {$$.Render.Field.jsxOto('email', {node: 'User', className: css['icon']})}&nbsp;
            管理员：<a href={`mailto:${data.email}`} className={css['link']}>{data.email}</a>
          </li>
          <li className={`item ${css['item']}`}>
            {$$.Render.Field.jsxOto('phone', {node: 'User', className: css['icon']})}&nbsp;
            客服电话：{data.call}
          </li>
          <li className={`item ${css['item']}`}>
            <i className="text qq icon"/>
            客服QQ：<a href={`tencent://message/?uin=${data.online}`} className={css['link']}>{data.online}</a>
          </li>
          <li className={`item ${css['item']}`}>
            {$$.Render.Field.jsxOto('location', {node: 'User', className: css['icon']})}&nbsp;
            地址：{data.fullName}
          </li>
        </ui>
      </footer>
    )
  }
}
Component.displayName = 'Footer'

export default mapping.multi(Component, {}, {
  data: ['app', 'data', 'hotel']
})
