import React from 'react'

import $$ from '../../../seed'
import dispatches from './Redux'
import mapping from '../../_internal/Redux'
import Hit from '../../../hit/Hit'
import Content from './Content'
// ------------------------------------
// 将Template改成容器模式
// ------------------------------------
class Component extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    dispatches.$_fnInit(this.props)
  }

  componentDidUpdate(nextProps) {
    /** 2.顶部操作 **/
    dispatches.$_fnActive(this.props, nextProps)
  }

  shouldComponentUpdate(nextProps){
    return dispatches.$_fnRefresh(this.props, nextProps)
  }

  render() {
    $$.Logger.Prop.layout("template.FlatTemplate", this.props)
    const {children, status = {}, config = {}, params} = this.props
    /** app数据专用 **/
    // ------------------------------------
    // 只渲染children和Content两部分内容，Content部分只传入params
    // ------------------------------------
    return (status.isData) ? (
        <Content key="TplContent" config={config} params={params}>
          {children}
        </Content>
      ) : $$.Tool.Flow.loading('应用程序加载中...')
  }
}

Component.displayName = 'Container'

export default Hit.Perf(mapping.multi(Component, dispatches, {
  status: ['app', 'status'],
  active: ['router', 'locationBeforeTransitions', 'query', 'active'],
  sidebar: ['router', 'locationBeforeTransitions', 'query', 'sidebar'],
}))

