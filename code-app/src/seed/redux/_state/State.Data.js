import Cache from '../../cache'
import Tool from '../../tool'
import Builder from '../Redux.Builder'
import System from './State.System'
import Query from './State.Query'
import Immutable from 'immutable'
import Kit from '../Redux.Kit'

const fnCalcMenus = (menu = []) => {
  /** 1.计算最小Level **/
  const level = Tool.Tree.calcLevel(menu)
  /** 2.读取根节点菜单 **/
  const roots = menu.filter(item => (level == item.level))
  /** 3.构造整棵树 **/
  roots.forEach(root => {
    /** 3.1.构造对应的Items **/
    Tool.Tree.calcItems(root, menu)
  })
  return roots;
}

class Data {

  static download(state, {
    finished = false
  }) {
    let $state = Immutable.fromJS(state)
    $state = $state.setIn(["status", "isDownload"], finished)
    return $state.toJS()
  }

  /**
   * 清除数据
   * @param state
   * @param clean
   */
  static cleanData(state, {
    cid,
    clean = []
  }){
    let $state = Immutable.fromJS(state);
    // 1.遍历clean
    clean.forEach(path => {
      if(Array.prototype.isPrototypeOf(path)) {
        $state = $state.setIn(path, {})
      }
    })
    // 2.写入cid的值
    $state = Kit.resetHash($state,cid,state)
    return $state.toJS()
  }
  /**
   * 刷新CID
   * @param state
   * @param cid
   */
  static successHash(state, {
    cid,
    data = {}
  }) {
    let $state = Immutable.fromJS(state);
    // 1.处理节点中的数据
    if (data.path && data.value) {
      const pathes = data.path
      $state = $state.setIn(pathes, data.value)
    }
    // 2.写入cid的值
    $state = Kit.resetHash($state,cid)
    return $state.toJS()
  }
  /**
   *
   * @param state
   * @param cid
   */
  static successArray(state, {
    cid,
    data = {}
  }) {
    let $state = Immutable.fromJS(state);
    if (data.path && data.id && data.value && data.field) {
      const pathes = data.path
      const $data = $state.getIn(pathes)
      if ($data) {
        const row = $data.toJS()
        row.forEach(item => {
          if (item.uniqueId == data.id) {
            item[data.field] = data.value
          }
        })
        $state = $state.setIn(pathes, row)
      }
    }
    // 1.写入cid的值
    $state = Kit.resetHash($state,cid,state)
    return $state.toJS()
  }

  /**
   * 开启Loading，重新加载数据
   * @param state
   * @param keys
   */
  static cleanFantom(state,{
    keys = {}
  }){
    let $state = Immutable.fromJS(state)
    /** 清空Record专用output **/
    if(keys.record){
      const list = keys.record.concat(['list'])
      $state = $state.deleteIn(list)
      $state = $state.setIn(keys.record,{ count: -1 })
    }
    return $state.toJS()
  }
  /**
   * Fantom合并到一起的专用数据输出，主要用于配置数据节点
   * Tabular, Assist, Record, Cat
   * @param state
   * @param data
   * @param key
   * @param params
   */
  static successFantom(state, {
    data = {},
    keys = {},
    params = {}
  }) {
    // 1.执行tab处理
    let _state = Immutable.fromJS(state).toJS()
    // 2.添加Tabular, Assist, Record, Cat
    for (let item in keys) {
      const key = keys[item];
      let itemData = data[item];
      // 3.特殊处理tabular
      itemData = System.tabular(key, itemData);
      _state = Builder.refreshState(_state, itemData, key);
    }
    // 4.query参数统一处理
    let $state = Immutable.fromJS(_state);
    if (params.query) {
      const query = Query.query(state, params.query);
      $state = $state.set('query', query);
    }
    // 5.写入Hash：注意第三参数，用于表示当前Fantom数据项是否发生过Diff，如果未曾Diff则不写Hash
    if(!params.hash){
      $state = Kit.resetHash($state, params.cid, state)
    }
    // 6.数据加载钩子
    return $state.toJS()
  }

  /**
   * Module中的State处理不会访问缓存
   * @param state
   * @param data
   * @param key
   */
  static successMod(state, {
    data = {},
    key = '',
    params = {}
  }) {
    // 0.不需要读取key

    // 1.对于record状态直接处理
    const _state = Builder.refreshState(state, data, key);
    let $state = Immutable.fromJS(_state);
    // 2.写入Hash
    $state = Kit.resetHash($state,params.cid, state)
    // 3.数据加载钩子
    return $state.toJS()
  }

  /**
   * App中的State处理会访问缓存
   * @param state
   * @param data
   * @param key
   * @param params
   * @returns {*|any}
   */
  static successApp(state, {
    data = {},
    key = [],
    params = {}
  }) {
    // 0.写入数据信息
    const {user} = state;
    if (Cache.enabled()) {
      Cache.Config.writeData({user, key: Tool.Builder.buildCacheKey(key, params), data});
    }
    // 1.读取key，读取新状态
    let $state = Builder.refreshState(state, data, key);
    return $state // Kit.output($state,state)
  }

  /**
   * 数据本身信息
   * @param state
   * @param data
   * @param keys
   */
  static successTpl(state,{
    data = {},
    keys = {}
  }){
    let $state = Immutable.fromJS(state)
    for(const key in keys){
      if('record' != key){
        $state = $state.setIn(keys[key],data[key])
      }else{
        /** 菜单专用 **/
        if(data[key] && data[key].list){
          const $data = data[key].list
          /** 顶部菜单 **/
          const topbar = $data.filter(item => 'NAV' == item.type)
          $state = $state.setIn(['data','topbar'],topbar)
          /** 左边主菜单 **/
          const sidebar = $data.filter(item => 'SIDEBAR' == item.type)
          $state = $state.setIn(['data','sidebar',undefined], sidebar)
          /** 左边分级菜单 **/
          let menus = $data.filter(item => 'MENU' == item.type)
          if(menus){
            /** 构造树形菜单 **/
            menus = fnCalcMenus(menus)
            menus = Immutable.fromJS(menus).groupBy(item => item.get('parentId')).toJS()
            for(const key in menus){
              $state = $state.setIn(['data','sidebar',key],menus[key])
            }
          }
        }
      }
    }
    /** status信息 **/
    $state = $state.setIn(['status','isData'], true);
    /** 最终数据构成 **/
    return $state.toJS()//Kit.output($state.toJS(),state)
  }
}

export default Data
