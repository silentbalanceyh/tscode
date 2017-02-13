import Entity from '../entity'
import Eblis from './Data.Eblis'
import Logger from '../logger'
import Redux from '../redux'
import Tabular from './Data.Tabular'
import Ajax from '../ajax'
import Immutable from 'immutable'

class Form {
  /**
   static initials(props) {
      // Form专用路径：config -> config -> record -> initialValues
      // Initial Values必须存在于record节点
    const dataArr = Entity.Data.lookup(props, ['$_ajax', 'record', 'initialValues']);
    // 从其他地方读取初始化值
    let data = Entity.Data.lookup(props, ['data', 'initialValues']);
    if (!data) data = {}
    if (dataArr) {
      for (const key in dataArr) {
        const path = dataArr[key];
        if (Array.prototype.isPrototypeOf(path)) {
          const value = Entity.Data.lookup(props, path)
          data[key] = value;
        } else {
          const fixedPath = ['data', '$FIXED$']
          const values = Entity.Data.lookup(props, fixedPath)
          for (const fixedKey in values) {
            data[fixedKey] = values[fixedKey]
          }
        }
      }
    }
    if (props["$_sigma"]) data.sigma = props['$_sigma']
    return data;
  }**/

  /**
   * 初始化Form的Api
   * @param config
   */
  static initApi(props) {
    /** 1.读取配置信息 **/
    const {$_ajax = {}, $_assist}= props;
    /** 2.判断是否执行远程初始化Api **/
    const record = $_ajax.record;
    let $promises = Immutable.fromJS({})
    if (record && record.hasOwnProperty('uri')) {
      /** 3.初始化Promise **/
      const promise = Eblis.record(props, {}, true)
      $promises = $promises.set('record', promise)
    }
    if ($_ajax.tabular) {
      const promise = Tabular.promise(props)
      $promises = $promises.set('tabular', promise)
    }
    if ($_ajax.assist) {
      const meta = Eblis.filterAssist($_assist, $_ajax.assist)
      for (const key in meta) {
        const assist = meta[key]
        if (assist) {
          const promise = Eblis.assist(props, assist)
          $promises = $promises.set(key, promise)
        }
      }
    }
    return $promises.toJS()
  }

  /** **/
  static isPromise(promises = {}) {
    return promises && 0 < Object.keys(promises).length
  }

  /** **/
  static execRecord(props) {
    const {$_etat} = props
    let $props = Immutable.fromJS(props)
    const $record = $props.getIn(['$_ajax', 'record', $_etat])
    if ($record) {
      $props = $props.setIn(['$_ajax', 'record'], $record.toJS())
    }
    return $props.toJS()
  }

  /** 计算Form专用的状态 **/
  static etat(props = {}) {
    // 1.状态读取
    const {datum} = props
    // 2.datum不存在
    if (datum) {
      // TODO: 特殊状态
    } else {
      // 读取默认状态
      const {$_status} = props
      return $_status
    }
  }

  /** 初始化数据内容处理 **/
  static datum(props = {}, etat, keys = {}) {
    const reference = {}
    reference['type'] = Redux.Types.SUCCESS_UI_FORM_INIT
    reference['keys'] = keys
    reference['form'] = {}
    reference['form']['cid'] = props.form || props['$_cid']
    if (etat) reference['form']['state'] = etat
    if (props['$_type']) reference['form']['type'] = props['$_type']
    return reference
  }

  /** 数据信息提取 **/
  static data(props = {}, etat) {
    const {config = {}} = props
    let data = {}
    if (etat && config[etat]) {
      const initial = config[etat]['$_initial']
      data = {record: initial}
    }
    return data
  }

  /** 初始化数据 **/
  static initData(props = {}) {
    // 1.读取当前Form的状态
    const etat = Form.etat(props)
    // 2.读取数据

    // 3.初始化当前Form的数据路径
    const path = ['form', props.form, 'initialValues']
    const keys = {record: path}
    const data = Form.data(props, etat)
    // 4.构造返回值
    const reference = Form.datum(props, etat, keys)
    // 5.初始化最终结果
    reference.data = data
    // 6.打印日志
    Logger.Prop.formInit({
      data, output: keys, state: etat
    })
    // 7.最终dispatch
    const {dispatch} = props
    return dispatch(reference)
  }
}

export default Form;
