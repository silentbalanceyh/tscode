import React from 'react'
import memoize from 'lodash/memoize'
import css from './Component.scss'

import $$ from '../../../seed'

import Footer from './Footer'
import Header from './Header'
import Status from './Status'
import Menu from './Menu'
// ------------------------------------
// Content专用Cache
// ------------------------------------
const TPL = {}

const $_fnTpl = (key, jsx) => {
  let Component
  if (TPL[key]) {
    Component = TPL[key]
  } else {
    Component = jsx
    TPL[key] = Component
  }
  return Component
}
// ------------------------------------
// 容器模式中的内容信息
// ------------------------------------
class Content extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  // ------------------------------------
  // 记忆读取Footer
  // ------------------------------------
  _renderFooter = memoize(() => {
    return $_fnTpl('FOOTER', <Footer key="Footer"/>)
  })
  // ------------------------------------
  // 记忆读取Status
  // ------------------------------------
  _renderStatus = memoize(({op}) => {
    return $_fnTpl('STATUS', <Status key="Status" op={op['employee']}/>)
  })
  // ------------------------------------
  // 记忆读取Header
  // ------------------------------------
  _renderHeader = memoize(({active}) => {
    return $_fnTpl('HEADER', <Header key="Header" active={active}/>)
  })
  // ------------------------------------
  // 记忆读取菜单Lefts
  // ------------------------------------
  _renderMenu = memoize(({active, sidebar}) => {
    return $_fnTpl('MENU', (<Menu key="Menu" active={active} sidebar={sidebar}/>))
  })
  // ------------------------------------
  // Render方法主流程，children部分不执行记忆
  // ------------------------------------
  render() {
    const {children, config = {}, params = {}} = this.props
    // Status专用
    const {op = {}} = config
    // Header专用
    const {active, sidebar} = params
    // console.info(this.props)
    /**
     const {app = {}, config, params = {}} = this.props
     // app
     const {status = {}, data = {}, user} = app
     // status
     const {op = {}} = config
     const {path = '', title = ''} = app.config
     // params
     const {active, sidebar} = params
     // treemenu
     const {children} = this.props
     const lefts = data['sidebar'] ? Object.keys(data['sidebar']) : []
     **/
    return (
      <div key="Content" className={'ui grid'}>
        <div key="TplHeader" className={`row ${css['header']}`}>
          <div key="FixedBar" className="column">
            {this._renderFooter()}
            {this._renderHeader({active})}
          </div>
        </div>
        <div key="TplContent" className={`row ${css['row']}`}>
          <div key="TplMenu" className={`column ${css['menucol']}`}>
            {this._renderStatus({op})}
            {this._renderMenu({active, sidebar})}
          </div>
          <div key="TplModule" className={`column ${css['content']}`}>
            {children}
            {$$.Plugin.JQuery.mask()}
          </div>
        </div>
      </div>
    )
  }
}

Content.displayName = 'Content'

export default Content

