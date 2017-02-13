import Status from './State.Status'
import Assist from './State.Init.Assist'

class Init{
  /**
   * 应用的初始化状态生成
   */
  static initAppState(){
    const state = {};
    // 1.应用配置节点：app -> config
    state['config'] = {};
    // 2.模板界面：app -> layout
    // state['layout'] = {};
    // 3.状态数据：app -> status
    state['status'] = Status.init();
    // 4.模板中需要使用的数据：app -> data
    state['data'] = {}
    // 5.返回初始化状态
    return state;
  }

  /**
   * 模块初始化状态生成
   */
  static initModState(){
    const state = {};
    // 1.当前页面配置节点: module -> config
    // state['config'] = {};
    // 2.当前页面数据节点：module -> data
    state['data'] = {};
    // 3.当前页面状态数据：module -> status
    state['status'] = Status.init(true);
    // 4.使用组件信息
    state['controls'] = {};
    // 5.当前页面使用的Container组件：module -> container
    state['ui'] = [];
    // 6.设置查询用节点
    state['query'] = Init.query()
    // 7.设置uex节点做用户体验
    state['uex'] = Init.uex()
    // 8.返回初始化状态
    return state;
  }

  static query(){
    return {
      filters: Assist.Query.initFilters(),
      orders: Assist.Query.initOrders(),
      pager: Assist.Query.initPager(),
      criterias: Assist.Query.initCriterias()
    }
  }

  static uex(){
    return {
      tab:Assist.Uex.initTab(),
      selected:Assist.Uex.initRow(),
      reload:Assist.Uex.initReload()
    }
  }
  /** Dialog专用 **/
  static Selector = Assist.Selector
}

export default Init
