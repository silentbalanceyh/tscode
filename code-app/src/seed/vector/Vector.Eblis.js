import Tool from '../tool'
import Entity from '../entity'
import Logger from '../logger'
import Immutable from 'immutable'

import Input from './Vector.Input'

import Memory from '../memory'

class Eblis {
  /**
   * 抽取所有组件的id信息
   * **/
  static ids(config = {}) {
    const ids = {}
    ids[`$_${Tool.ID.SERVER}`] = config[Tool.ID.SERVER] || config['uniqueId']
    ids[`$_${Tool.ID.CLIENT}`] = config[Tool.ID.CLIENT]
    // 循环专用，不可重命名
    ids['key'] = config[Tool.ID.SERVER]
    return ids
  }

  /**
   * 抽取10个基本配置中的Promise
   * @param config
   */
  static config(config = {}) {
    /** 2.处理4个Promise相关的基本配置 **/
    let $eblis = Immutable.fromJS({})
    if (config.record) $eblis = $eblis.set('record', config.record);
    if (config.assist) $eblis = $eblis.set('assist', config.assist);
    if (config.tabular) $eblis = $eblis.set('tabular', config.tabular);
    if (config.cat) $eblis = $eblis.set('cat', config.cat);
    /** 3.返回最终配置 **/
    return $eblis.toJS()
  }

  /**
   * 处理当前配置中的Hash
   * @param config
   */
  static updated(configuration = {}){
    /** 1.config的ruler提取 **/
    const {config = {}, controls = {}} = configuration
    const {ruler = {}} = config
    /** 2.有Ruler才有值 **/
    if(ruler && 0 < Object.keys(ruler).length
      && ruler.hasOwnProperty('HASH')){
      /** 3.提取更新表 **/
      const { HASH = [] } = ruler
      /** 4.处理返回结果 **/
      let $updated = Immutable.fromJS({})
      HASH.forEach((cid) => {
        if(controls[cid]){
          const { hash } = controls[cid]
          $updated = $updated.set(cid, hash)
        }
      })
      return $updated.toJS()
    }
  }
  /**
   *
   * @param configuration
   */
  static lookup(configuration = {}) {
    /** 1.config的mapping提取 **/
    const {config = {}, memory} = configuration
    /** 2.读取mapping数据 **/
    const {mapping} = config
    /** 3.读取mapping相关节点 **/
    const eblis = {};
    if (mapping) {
      /** 不走缓存 **/
      for (const key in mapping) {
        const path = mapping[key]
        const value = Entity.Data.lookup(configuration, path);
        eblis[`$_${key}`] = value;
      }
      /** 禁用缓存信息
      if(memory){
        Memory.Eblis.buildEblis(eblis,mapping,memory,configuration)
      }else {
        for (const key in mapping) {
          const path = mapping[key]
          const value = Entity.Data.lookup(configuration, path);
          eblis[`$_${key}`] = value;
        }
      }**/
    }
    return eblis;
  }
  /**
   * 共享配置读取
   * @param configuration
   * @returns {any|*}
   */
  static shared(configuration = {}) {
    let timer = new Logger.Timer('Eblis Common','shared(configuration)')
    timer.start()
    /**
     * 0.ID配置
     */
    const lucifier = Eblis.ids(configuration.config)
    timer.end()
    timer.output(`1 Start ${lucifier.$_cid}`)
    timer = new Logger.Timer('Eblis Common','shared(configuration)')
    timer.start()
    /**
     * 1.遍历mapping读取所有配置
     */
    let $eblis = Immutable.fromJS(lucifier)
    $eblis = $eblis.merge(Eblis.lookup(configuration))
    timer.end()
    timer.output(2)
    timer = new Logger.Timer('Eblis Common','shared(configuration)')
    timer.start()
    /**
     * 2.Ajax相关Promise配置
     */
    const ajaxes = Eblis.config(configuration.config)
    if (ajaxes && 0 < Object.keys(ajaxes).length) {
      $eblis = $eblis.set('$_ajax', ajaxes)
      /**
       * 3.为Ajax准备特殊输入
       */
      $eblis = $eblis.merge(Input.data(ajaxes,configuration))
    }
    timer.end()
    timer.output(3)
    timer = new Logger.Timer('Eblis Common','shared(configuration)')
    timer.start()
    /**
     * 5.处理更新配置
     */
    const controls = Eblis.updated(configuration)
    if(controls && 0 < Object.keys(controls).length){
      /**
       * 5.1.更新表设置
       */
      $eblis = $eblis.set('$_renew',controls)
    }
    timer.end()
    timer.output(4)
    timer = new Logger.Timer('Eblis Common','shared(configuration)')
    timer.start()
    /**
     * 6.抽取mask配置
     */
    if(configuration.config.mask){
      $eblis = $eblis.set('$_mask',configuration.config.mask)
    }
    timer.end()
    timer.output(`5 End ${lucifier.$_cid}`)
    /**
     * 7.返回最终配置
     */
    return $eblis.toJS()
  }
}

export default Eblis
