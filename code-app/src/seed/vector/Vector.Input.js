import Entity from '../entity'
import Immutable from 'immutable'
import Config from '../vie.json'

class Input {
  /**
   * 根据inputes的内容设置data返回最终数据
   * @param data
   * @param inputes
   */
  static inputes(inputes = {},inputData) {
    return Input.keepInputes(inputes,{},inputData)
  }

  /**
   *
   * @param inputes
   * @param oldData
   * @param inputData
   */
  static keepInputes(inputes = {}, oldData, inputData){
    let $data = Immutable.fromJS(oldData)
    for (const dataKey in inputes) {
      const path = inputes[dataKey]
      /** 数组才执行input填充 **/
      if(Array.prototype.isPrototypeOf(path)) {
        const value = Entity.Data.lookup(inputData, path)
        $data = $data.setIn(path, value)
      }
    }
    return $data
  }

  /**
   * 处理mapping
   * @param horiz
   * @param mapping
   */
  static data(ajaxes, inputData) {
    let $data = Immutable.fromJS({})
    /** Record专用 **/
    if (ajaxes.record) {
      const ajaxItem = ajaxes.record.input
      if (ajaxItem) {
        $data = $data.merge(Input.inputes(ajaxItem, inputData))
      }
    }
    /** Assist专用 **/
    if (ajaxes.assist) {
      const assists = ajaxes.assist
      for (const assist in assists) {
        const ajaxItem = assists[assist].input
        if (ajaxItem) {
          $data = $data.merge(Input.keepInputes(ajaxItem, $data.toJS(),inputData))
        }
      }
    }
    /** Sigma提取 **/
    const sigma = Config.SIGMA
    if(sigma){
      const $input = Immutable.fromJS(inputData)
      const $sigma = $input.getIn(sigma)
      if($sigma) {
        $data = $data.setIn(['$_sigma'], $sigma)
      }
    }
    return $data.toJS()
  }


  /**
   * Form专用
   * @param ajaxes
   * @param inputData
   */
  static form(ajaxes, inputData) {
    let $data = Immutable.fromJS(Input.data(ajaxes, inputData))
    /**
     * 特殊处理，专注initialValues
     */
    if (ajaxes.record) {
      const initials = ajaxes.record.initialValues
      /** 处理每一个状态的信息 **/
      for (const injectKey in initials) {
        const path = initials[injectKey]
        if (Array.prototype.isPrototypeOf(path)) {
          const value = Entity.Data.lookup(inputData, path)
          if (value) {
            if (Array.prototype.isPrototypeOf(value) && 0 < value.length) {
              // Fix：uniqueId为不可变字段
              $data = $data.setIn(path, value[0].uniqueId)
            } else {
              $data = $data.setIn(path, value)
            }
          }
        } else {
          /** initialValues的固定值处理 **/
          if ("$FIXED$" == injectKey) {
            /** 1.处理Fields默认固定值 **/
            const fixedPath = ['data', '$FIXED$']
            $data = $data.setIn(fixedPath,path)
          }
        }
      }
    }
    return $data.toJS()
  }
}

export default Input
