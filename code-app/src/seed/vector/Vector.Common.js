import Eblis from './Vector.Eblis'
import Immutable from 'immutable'

class Common{
  /**
   * 将Config结构执行平行
   * @param configuration
   * @param key
   */
  static flatByKey(configuration = {}, cid = '') {
    /** 1.读取config节点 **/
    const {config = {}} = configuration
    /** 2.判断当前config **/
    let flat = {}
    if (config[cid]) {
      let $config = config[cid]
      $config.cid = cid
      /** 3.强行合并 **/
      flat = Common.flat({config: $config});
    }
    return flat
  }

  /**
   * 将Config结构执行平行
   * @param configuration
   */
  static flat(configuration = {}) {
    /** 1.读取config节点 **/
    const {config = {}} = configuration
    /** 2.提取config中的cid和data **/
    const flat = {}
    flat.cid = config.cid
    /** 3.强制合并 **/
    let $flat = Immutable.fromJS(flat)
    $flat = $flat.merge(config.data)
    return $flat.toJS()
  }
  /**
   * 子节点
   * @param configuration
   * @returns {any|*}
   */
  static eblisLeaf(configuration = {}){
    // Leaf节点可以改动
    let $configuration = Immutable.fromJS(configuration)
    $configuration = $configuration.set('config',Common.flat(configuration))
    return Eblis.shared($configuration.toJS())
  }

  /**
   * 容器
   * @param configuration
   * @param cid
   * @returns {any|*}
   */
  static eblisContainer(configuration = {}, cid = ''){
    // Container节点不可更改
    let $configuration = Immutable.fromJS(configuration)
    $configuration = $configuration.set('config',Common.flatByKey(configuration,cid))
    return Eblis.shared($configuration.toJS())
  }
}
export default Common
