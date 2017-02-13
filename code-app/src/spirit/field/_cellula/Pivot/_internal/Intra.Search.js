// ======================================================
// 支持组件类型
// type = text
// type = password
// type = number
// ======================================================
import Immune from '../../Centrum/Immune'
import Immutable from 'immutable'

import $$ from '../../../../../seed'

import Dialog from '../../../ListSelector/Dialog/Component'

const SUPPORTED = Immutable.fromJS(['list.selector'])
/**
 * 专用selector配置器
 * @param config
 */
const selector = (config) => {
  /** 1.拷贝配置信息 **/
  let $config = Immutable.fromJS({})
  /** 2.提取selector的数据节点 **/
  $config = $config.set('selector',config.selector)
  /** 3.提取操作input标识信息 **/
  $config = $config.set('cid',config.cid)
  /** 4.Ajax配置 **/
  $config = $config.set('ingest',config['ingest'])
  /** 5.Linker配置 **/
  $config = $config.set('pagination',config['pagination'])
  /** 6.Search配置 **/
  $config = $config.set('search',config['search'])
  /** 7.List专用配置 **/
  $config = $config.set('columns',config['columns'])
  /** 8.设置Query **/
  $config = $config.set('query',$$.Tool.Selector.initQuery(config))
  /** 9.设置dispatch **/
  $config = $config.set('dispatch',config.dispatch)
  $config = $config.set('form',config.form)
  $config = $config.set('sigma',config.sigma)
  return $config.toJS()
}

class Search{
  static render(config = {},input){
    if(config.type && SUPPORTED.contains(config.type)){
      config.icon = 'blue search link'
      config.position = 'right'
      config.type = 'text'
      config.click = () => {
        $$.Dialog.Retort.list(Dialog,selector(config))
      }
      return Immune.jsxSelector(config,input)
    }else{
      return false
    }
  }
}

export default Search
