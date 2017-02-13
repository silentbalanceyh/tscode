import React from 'react'
import mapping from '../../_internal/Redux'
import $$ from '../../../seed'

import css from './Menu.scss'
import Immutable from 'immutable'

class Component extends React.PureComponent {
  shouldComponentUpdate() {
    return false
  }

  render() {
    const {menu = {}, sidebar, active, path} = this.props
    const keys = Object.keys(menu)
    return (
      <div key="Menu" className={`jsxLeft`}>
        {
          keys.map(key => {
            const data = menu[key]
            const style = (String(active) == key) ? {display: 'inline-block'} : {display: 'none'}
            return (
              <aside key={key} id={`sidebar${key}`}
                     className={`ui vertical menu ${css['menu']} jsxSidebar`}
                     style={style}>
                {
                  data.map((item) => {
                    /** 防止无限递归修改uri导致uri增加 **/
                    const $item = Immutable.fromJS(item).toJS()
                    return (
                      $$.Render.Anchor.Tree.renderTree($item, {
                        path,
                        item: {
                          css: css['item'],
                          sidebar,
                          active: key,
                          parentId: item.uniqueId
                        }
                      })
                    )
                  })
                }
              </aside>
            )
          })
        }
      </div>
    )
  }
}

Component.displayName = 'Menu'

export default mapping.multi(Component, {}, {
  menu: ['app', 'data', 'sidebar'],
  path: ['app', 'config', 'path']
})

