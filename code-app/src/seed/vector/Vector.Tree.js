import Immutable from 'immutable'
import Entity from '../entity'

class Tree {
  /**
   * 过滤单节点input
   * @param $_ajax
   */
  static filter(item = {}, keys = []) {
    const input = []
    keys.forEach(key => {
      if (item[key] && item[key].input) {
        if (0 < Object.keys(item[key].input).length) {
          for (const attr in item[key].input) {
            input.push(item[key].input[attr])
          }
        }
      }
    })
    return input
  }

  /**
   * 抽取单个配置
   * @param $horiz
   * @param item
   * @returns {any|*}
   */
  static item($horiz, item){
    let $tree = Immutable.fromJS({})
    if(item){
      /** 2.处理config节点 **/
      $horiz = $horiz.set('config',item.config)
      /** 3.读取所有路径值 **/
      const input = Tree.filter(item['$_ajax'], ['record'])

      if (0 < input.length) {
        /** 4.路径遍历，填充值 **/
        input.forEach(path => {
          $tree = $tree.setIn(path, Entity.Data.lookup($horiz.toJS(),path,undefined))
        })
      }
    }
    return $tree.toJS()
  }
  /**
   * 从horiz中提取所有的input
   * @param props
   * @param componentConfig
   */
  static layout(horiz, componentConfig = {}) {
    /** 1.提取根组件所需参数集 **/
    let tree = {}
    /** 2.处理input **/
    let $horiz = Immutable.fromJS(horiz)
    const reg = RegExp('Config','g')
    for (const key in componentConfig) {
      const item = componentConfig[key]
      /** 4.Input处理 **/
      const config = Tree.item($horiz,item)
      const dataKey = key.replace(reg,'Data')
      tree[dataKey] = config
    }
    return tree
  }
}

export default Tree
