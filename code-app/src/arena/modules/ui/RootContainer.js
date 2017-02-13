import React from 'react'
import Immutable from 'immutable'
import $$ from '../../../seed'
import mapping from '../../../spirit/_internal/Redux'
/**
 * Root Container刷新条件，Root Container不监控controls的hash
 * @param props
 * @param nextProps
 * @returns {boolean}
 */
const $_fnRefresh = (props, nextProps) => {
  // 仅在status中isData完成过后处理Container
  /**
   let $old = Immutable.fromJS(props.status)
   let $new = Immutable.fromJS(nextProps.status)
   if(!Immutable.is($old,$new)) return true
   **/
  let $old = Immutable.fromJS(props.ui)
  let $new = Immutable.fromJS(nextProps.ui)
  if (!Immutable.is($old, $new)) return true
  return false
}
/**
 * 防止不必要的Render
 */
class RootContainer extends React.PureComponent {
  shouldComponentUpdate(nextProps) {
    return $_fnRefresh(this.props, nextProps)
  }

  render() {
    $$.Logger.Prop.template("arena.RootContainer", this.props)
    /** 1.RootContainer配置数据提取 **/
    const config = this.props.$_fnConfig()
    /** 2.读取ui节点 **/
    const {ui = [], app = {}, user = {}, status = {}, controls = {}, appdata = {}} = this.props
    if (0 < Object.keys(config).length && 1 == ui.length) {
      /** 3.系统全局数据（非菜单部分） **/
      const apkey = $$.Arkt['APKEY']
      const global = {}
      global[apkey] = appdata[apkey]
      const data = {app: global}
      /** 4.模块数据 **/
      const moduleData = {
        config, user, status, app, controls, data
      }
      /** 5.渲染组件 **/
      return $$.Render.Content.cubes(ui, moduleData)
    } else {
      return ($$.Tool.Flow.loading('数据加载中...'))
    }
  }
}

export default mapping.multi(RootContainer, {}, {
  ui: ['content', 'ui'],
  controls: ['content', 'controls'],
  user: ['app', 'user'],
  appdata: ['app', 'data']
})
