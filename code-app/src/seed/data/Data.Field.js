import Immutable from 'immutable'
import Entity from '../entity'
import Tool from '../tool'
import Ajax from '../ajax'
import Plugin from '../plugin'
import Arkt from '../vie.json'
import moment from 'moment'
/** 从配置中读取ingest **/
const getIngest = (props) => {
  const {ingest} = props.config
  return ingest
}

const getConfig = (props, monitor) => {
  /** 1.构造config **/
  let $config = Immutable.fromJS(props.config)
  $config = $config.set('monitor', monitor.target)
  return $config.toJS()
}

class Field {
  /**
   * 读取Field中的output
   * @param props
   */
  static output(props) {
    /** 读取原始数据 **/
    const {config} = props
    const addons = config['add-on']
    const output = config.ingest.output
    /** 遍历addons **/
    const outputs = []
    for (const key in addons) {
      const item = {}
      item.type = key
      if ("hidden" == key) {
        item.id = addons[key]
      } else {
        item.id = addons[key].id
      }
      item.config = output[item.id]
      outputs.push(item)
    }
    return outputs
  }

  /**
   * Order序号处理
   * @param props
   * @param monitor
   */
  static order(props, monitor = {}) {
    const config = getConfig(props, monitor)
    const ingest = getIngest(props)
    ingest.uri = "/lst/order"
    ingest.method = "POST"
    /** Sigma分流专用处理 **/
    if (Tool.Form.isSigma(ingest.input.identifier)) {
      return Field.promise(config, ingest, true)
    } else {
      return Field.promise(config, ingest, false)
    }
  }

  /**
   *
   * @param props
   */
  static ingest(props, monitor = {}) {
    const config = getConfig(props, monitor)
    const ingest = getIngest(props)
    return Field.promise(config, ingest)
  }

  static promise(config, ingest, sigma = true) {
    /** 3.构造最终结果 **/
    const prepared = Tool.Parameter.prepare(config, ingest)
    /** 4.直接返回Promise **/
    const {method, api, parameters} = prepared;
    /** 5.加入Sigma **/
    if (sigma) parameters.sigma = config.sigma
    return Ajax.Async.locator(method, api, parameters, ingest.refresh)
  }

  /**
   * 读取当前props中的monitor
   * @param props
   */
  static monitor(props) {
    const {config = {}} = props
    /** 读取monitor **/
    const {monitor = {}} = config
    const values = {}
    for (const key in monitor) {
      const pathes = monitor[key]
      const value = Entity.Data.lookup(props, pathes)
      if (value) {
        /** Fix：Moment默认只处理Day级别的变更，如果需要支持Time解析则需要重新设置配置 **/
        if (moment.isMoment(value)) {
          const $value = value.format(Arkt['TIME'])
          /** 还原成Moment **/
          values[key] = moment($value)
        } else {
          values[key] = value
        }
      }
    }
    return {
      source: monitor,
      target: values
    };
  }

  /** 初始化方法 **/
  static execInit(props, fnCallback) {
    const monitor = Field.monitor(props)
    if (Field.isExecute(monitor)) {
      fnCallback(props, monitor)
    }
  }

  /** 执行Update方法 **/
  static execUpdate(props, prevProps, fnCallback) {
    if (Field.isUpdated(props, prevProps)) {
      const monitor = Field.monitor(props)
      if (Field.isExecute(monitor)) {
        fnCallback(props, monitor)
      } else {
        if (props.config.ingest) {
          /** 1.如果定义了ingest **/
          const output = Field.output(props)
          Plugin.JQuery.setOutput(output);
        } else {
          /** 2.没有定义ingest则直接回调 **/
          fnCallback(props, monitor)
        }
      }
    }
  }

  /**
   * 判断是否执行
   * @param monitor
   */
  static isExecute(monitor) {
    const {source, target = {}} = monitor
    const srcKey = Object.keys(source).length
    const tgtKey = Object.keys(target).length
    return srcKey == tgtKey
  }

  /**
   *
   * @param props
   * @param prevProps
   * @returns {boolean}
   */
  static isUpdated(props, prevProps) {
    /** 1.先处理Limitation部分 **/
    let $current = Immutable.fromJS(Field.monitor(props).target)
    let $previous = Immutable.fromJS(Field.monitor(prevProps).target)
    /** 2.读取Limitation的配置 **/
    const {limitation} = props.config
    if (limitation) {
      /** 默认limit字段相同 **/
      let changed = true
      for (const key in limitation) {
        /** 读取limit字段的值 **/
        let curVal = $current.get(key)
        let preVal = $previous.get(key)
        const mode = limitation[key]
        /** 转换Moment的值，两个都存在时转换 **/
        if (curVal && preVal) {
          if (!moment.isMoment(preVal)) preVal = moment(preVal, Arkt['TIME'])
          if (!moment.isMoment(curVal)) curVal = moment(curVal, Arkt['TIME'])
          changed = !curVal.isSame(preVal, mode)
        }
        /** 移除当前值 **/
        $current = $current.remove(key)
        $previous = $previous.remove(key)
      }
      if (changed) {
        return changed
      } else {
        return !Immutable.is($current, $previous)
      }
    } else {
      /** 没有Limitation直接判断 **/
      return !Immutable.is($current, $previous)
    }
  }
}

export default Field
