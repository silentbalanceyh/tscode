import React from 'react'
import mapping from '../../_internal/Redux'
import memoize from 'lodash/memoize'
import Link from 'react-router/lib/Link'

import css from './Header.scss'
import $$ from '../../../seed'
class Component extends React.PureComponent {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const {title, path, topbar = [], active} = this.props

    return (
      <header className={`ui top fixed inverted menu ${css['top']}`}>
        <li className={`item ${css['logo']}`}>
          <Link to="/htl/main/index">
            <i className="big white icon building"/>{title}
          </Link>
        </li>
        <nav className={`right menu`}>
          {
            topbar.map(memoize((item) => {
              let className = $$.Adom.Active.active(item, active, css['item']);
              className = `${className} jsxTopbar`
              const size = "big";
              return (
                <div className={className} id={`topbar${item.uniqueId}`} key={`item${item.uniqueId}`}>
                  {
                    $$.Render.Anchor.render(item, {
                      size, br: true,
                      active: {
                        active: item.uniqueId
                      }
                    }, (
                      <label className={css['text']}>{item.text}</label>
                    ), {path})
                  }
                </div>
              )
            }))
          }
        </nav>
      </header>
    )
  }
}

Component.displayName = 'Header'

export default mapping.multi(Component, {}, {
  topbar: ['app', 'data', 'topbar'],
  title: ['app', 'config', 'title'],
  path: ['app', 'config', 'path']
})
