import React from 'react'
import MOD from '../module'
import Immutable from 'immutable'

const mergeLayout = (props = {}, layout = {}) => {
  const $props = Immutable.fromJS(props).toJS()
  if ($props['app']) {
    $props['app'].layout = layout
  }
  return $props
}

class Layout extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {layout: {}}
  }

  componentWillMount() {
    // 0.开启Download
    MOD.$$.Tool.Flow.download(this.props, false)
    // 1.开启全局WebSocket
    // MOD.$$.Sock.VentBus.init(this.props);
    // 2.Download下载特殊数据，如果数据数量不对，则直接下载
    MOD.$$.Sock.Init.start(this)
    // 3.初始化应用
    MOD.$$.Tool.Flow.init(this.props, {force: true}, this)
  }

  shouldComponentUpdate() {
    // 数据一旦读取到了过后Template不发生改变
    const {status = {}} = this.props.app
    return !status.isData
  }

  render() {
    MOD.$$.Logger.Prop.template("arena.Layout", this.props)
    const {layout = {}} = this.state
    const props = mergeLayout(this.props, layout)
    // 0.提取所有属性
    const {children, app, params} = props
    // 1.应用程序加载
    const {status} = app;
    // 2.安全控制
    if (layout.secure && !status.isAuthorized) {
      return (
        <div>401：权限不够，请重新登录系统</div>
      )
    } else {
      const render = MOD.$$.Adom.Render.mountJObject(layout);
      if (render && (status.isDownload || "login" != params.module)) {
        // 1.读取模板
        const Template = MOD.$$.Tool.UCA.uca(layout.template);
        // 2.读取单个Slice相关信息
        const DirectConfig = MOD.$$.Component.Tpl.buildTemplate(props);
        // 3.构造属性
        let attrs = {}
        if (DirectConfig) {
          // NEW -> 全新模式对应的模板信息，应用于新模板FlatTemplate
          attrs = {config: DirectConfig}
        } else {
          // OLD -> 老模式，应用于老模板AdminTemplate
          /**
           // 4.1.读取组件
           const component = MOD.$$.Component.Tpl.buildComponent(layout);
           // 4.2.读取组件配置
           const componentConfig = MOD.$$.Component.Tpl.buildConfig(layout, props);
           // 4.3.读取模板需要使用的数据
           const horiz = MOD.$$.Vector.Slice.horiz(props, layout.horiz)
           // 4.4.读取根节点模板所需数据
           const componentData = MOD.$$.Vector.Tree.layout(horiz, componentConfig)
           attrs = {component, componentConfig, componentData}
           **/
        }
        /** 已经登陆，这种情况注入用户信息 **/
        if (app.user && 0 < Object.keys(app.user).length) {
          attrs['user'] = app.user
        }
        // 6.读取params信息
        attrs['params'] = MOD.$$.Entity.Params.query(props)
        // 7.仅仅需要从App继承到Content中的属性
        // 从Layout上层传入app和page两个核心参数
        return (
          <Template key="Template" {...attrs}>
            {children}
          </Template>
        )
      } else return MOD.$$.Tool.Flow.loading('应用程序加载中...')
    }
  }
}
Layout.key = 'Layout'

export default Layout
