import Immutable from 'immutable'
import Eblis from './Vector.Eblis'
import Tool from '../tool'
import Valve from '../valve'
import Input from './Vector.Input'
import Logger from '../logger'
class Form {
  /**
   * 处理Redux Form专用配置
   * @param configuration
   */
  static reduxForm(configuration, etat) {
    const redux = {}
    if (configuration.config) {
      /** 1.读取验证器 **/
      const {validate, cid} = configuration.config
      /** 2.Form表单名称 **/
      redux['form'] = cid
      /** 3.验证器分类 **/
      const validators = Tool.Form.filterRules(validate, etat)
      /** 4.Sync同步验证器 **/
      const sync = validators.filter(item => (!item.async))
      redux['validate'] = (value) => (Valve.validate(sync, value))
      /** 5.Async异步验证器 **/
      const async = validators.filter(item => (item.async))
      if (0 < async.length) {
        const fields = async.map(item => (item.field))
        redux['asyncBlurFields'] = fields
        redux['asyncValidate'] = (value) => (Valve.asyncValidate(async, value))
      }
    }
    return redux
  }

  /**
  static extractData(configuration) {
    const cid = configuration.config.cid
    const pathes = ['data', 'form', cid]
    let $data = Immutable.fromJS(configuration)
    $data = $data.getIn(pathes)
    if (!$data) {
      $data = Immutable.fromJS({})
    }
    return $data.toJS()
  }**/

  /**
  static lookupEtat(configuration) {
    const {config} = configuration
    const $configuration = Immutable.fromJS(configuration)
    let etat;
    if (config) {
      const statePathes = ["data", "form", config.cid, "state"]
      etat = $configuration.getIn(statePathes)
    }
    if (!etat) {
      const pathes = ["config", "spec", "defaultState"]
      etat = $configuration.getIn(pathes)
    }
    return etat
  } **/

  /**
   * 共享信息提取
   * @param $eblisRef
   * @param config
   */
  static shared($eblisRef, config = {}) {
    // 1.提取type数据信息
    if (config.type) $eblisRef = $eblisRef.set('$_type', config.type)
    // 2.Form的cid提取
    $eblisRef = $eblisRef.set('form',config[Tool.ID.CLIENT])
    // 3.默认Form的etat
    if (config.spec && config.spec.defaultState) $eblisRef = $eblisRef.set('$_status',config.spec.defaultState)
    return $eblisRef
  }

  /**
   * 读取ops配置信息
   * @param ops
   * @param etat
   */
  static ops(ops = [], etat){
    if(etat){
      // 1.过滤配置信息
      let filtered = []
      ops.forEach(op => {
        if(op.state && op.state.supported){
          const $supported = Immutable.fromJS(op.state.supported)
          if($supported.contains(etat)){
            const $op = Immutable.fromJS(op).toJS()
            /** 过滤op中的state，处理过后不需要 **/
            delete $op.state
            filtered.push($op)
          }
        }
      })
      return filtered
    }else return []
  }
  /**
   * 读取fields配置信息
   * @param fields
   * @param etatKey
   * @returns {*}
   */
  static fields(fields = [], etatKey){
    if(etatKey){
      // 1.先过滤key的信息
      let filtered = fields.filter(field => (field[etatKey]))
      // 2.将配置执行Flat流程，先拷贝过滤过的field
      filtered = Immutable.fromJS(filtered).toJS()
      filtered.forEach(field => {
        const config = field[etatKey]
        delete field[etatKey]
        Object.assign(field, config)
      })
      // 3.返回最终配置
      return filtered
    }else return []
  }

  /**
   * Record处理
   * @param record
   * @param etat
   * @param data
   */
  static initials(record = {}, etat, data = {}){
    // 1.根据record记录提取initials数据
    if(record[etat] && record[etat].initialValues) {
      const $data = Immutable.fromJS(data)
      const initialValues = Immutable.fromJS(record[etat].initialValues).toJS()
      if (initialValues) {
        const ret = {}
        // 2.遍历initialValues
        const fixed = initialValues['$FIXED$']
        // 3.固定值
        if (fixed) {
          for (const key in fixed) {
            ret[key] = fixed[key]
          }
          delete initialValues['$FIXED$']
        }
        // 4.路径值
        for (const key in initialValues) {
          const path = initialValues[key]
          if (Array.prototype.isPrototypeOf(path)) {
            const value = $data.getIn(path)
            if (value) {
              ret[key] = value
            }
          }
        }
        return ret
      }
    }
  }

  /**
   * Validate验证专用
   * @param validates
   * @param etat
   */
  static validate(validates = [], etat){
    if(etat){
      // 1.过滤配置信息
      let filtered = []
      validates.forEach(rule => {
        if(rule.state && rule.state.supported){
          const $supported = Immutable.fromJS(rule.state.supported)
          if($supported.contains(etat)){
            const $rule = Immutable.fromJS(rule).toJS()
            /** 过滤op中的state，处理过后不需要 **/
            delete $rule.state
            filtered.push($rule)
          }
        }
      })
      return filtered
    }else return []
  }
  /**
   * 区分四种不同状态
   * @param $eblisRef
   * @param config
   * @param data
   */
  static split($eblisRef, config = {}, data = {}){
    // 1.不同状态节点状态读取
    const $config = {}
    const etats = ['COMMON','ADD','EDIT','VIEW']
    etats.forEach(key => {
      $config[key] = {}
      // 2.读取配置的key
      const etatKey = Tool.Form.configKey(key)
      // 3.读取所有的field
      const field = Form.fields(config.field, etatKey)
      if(field && 0 < field.length) {
        $config[key]['$_field'] = field
      }
      // 4.读取所有的op
      const op = Form.ops(config.op, key)
      if(op && 0 < op.length){
        $config[key]['$_op'] = op
      }
      // 5.处理validate验证信息
      const validate = Form.validate(config.validate, key)
      if(validate && 0 < validate.length){
        $config[key]['$_validate'] = validate
      }
      // 6.处理Form中的initialValues配置
      const initial = Form.initials(config.record, key, data)
      if(initial){
        $config[key]['$_initial'] = initial
      }
      // 7.删除无法读取的配置
      if(0 == Object.keys($config[key]).length){
        delete $config[key]
      }
    })
    return $eblisRef.set('config',$config)
  }
  /**
   * Form组件的EBLIS配置
   */
  static eblis(configuration = {}) {
    console.info(Immutable.fromJS(configuration.config).toJS())
    let timer = new Logger.Timer('Eblis Form', 'eblis(configuration)')
    timer.start()
    /**
     * 1.Form对应的ID配置
     */
    const lucifier = Eblis.ids(configuration.config)
    timer.end()
    timer.output(`1 Start ${lucifier.$_cid}`)
    timer = new Logger.Timer('Eblis Form', 'eblis(configuration)')
    timer.start()
    /**
     * 2.Form共享信息提取
     */
    let $eblis = Immutable.fromJS(lucifier)
    $eblis = Form.shared($eblis, configuration.config)
    timer.end()
    timer.output(`2 Extract Shared Information`)
    timer = new Logger.Timer('Eblis Form', 'eblis(configuration)')
    timer.start()
    /**
     * 3.Form中的mapping信息读取
     */
    const mapping = Eblis.lookup(configuration)
    $eblis = $eblis.merge(mapping)
    timer.end()
    timer.output(`3 Extract Mapping Config`)
    timer = new Logger.Timer('Eblis Form', 'eblis(configuration)')
    timer.start()
    /**
     * 4.Form按照状态读取不同的配置信息
     */
    timer.end()
    timer.output(`4 Extract Field/Op/Initials Information`)
    timer = new Logger.Timer('Eblis Form', 'eblis(configuration)')
    timer.start()
    $eblis = Form.split($eblis, configuration.config, configuration)

    timer.end()
    timer.output(`8 End ${lucifier.$_cid}`)
    /**
     * 7.返回最终配置
     */
    console.info($eblis.toJS())
    return $eblis.toJS()
  }
}

export default Form
