import $$ from '../../../seed'
import Immutable from 'immutable'
// ------------------------------------
// Action本身
// ------------------------------------
const initiate = (props = {}) => {
  return $$.Data.Form.initData(props)
}
/**
 * 计算FieldSet
 * @param fieldset
 * @param field
 * @param columns
 */
const $_fnLocate = ($_fieldset = {}, $_field = [], $_etat) => {
  /** 1.构建fieldset信息 **/
  const fieldsets = []
  const configKey = $$.Tool.Form.configKey($_etat)
  /** 1.1.提取Hidden **/
  const hidden = $_field.filter(item => $$.Tool.Form.isHidden(item.type));
  $_field = $_field.filter(item => !$$.Tool.Form.isHidden(item.type));
  /** 2.遍历fieldset变量处理 **/
  const fsData = ($_fieldset[$_etat]) ? $_fieldset[$_etat] : []
  fsData.forEach(item => {
    /** 3.处理单个fieldset **/
    const fieldset = {}
    fieldset['title'] = item.title
    /** 4.处理Items **/
    const rows = $_field.filter(field => (field[configKey] ? (field[configKey].fieldset == item.group) : false))
    /** 5.Row **/
    const matrix = new $$.Tool.Matrix()
    rows.forEach(row => {
      const location = row[configKey].location
      console.assert(2 == location.length)
      matrix.put(row, location)
    })
    /** 6.设置Matrix信息 **/
    fieldset['items'] = matrix.get()
    fieldsets.push(fieldset)
  })
  return {
    hidden,
    fieldsets
  }
}
/**
 * 针对特殊的Array执行类型区分处理，用于处理动态Field专用
 * @param row
 */
const $_fnIsArray = (row = []) => {
  let ret = false
  if (1 == row.length) {
    const item = row[0]
    ret = $$.Tool.Form.isArrayField(item.type)
  }
  return ret
}
/**
 * 订单步骤计算器
 */
const $_fnSteps = (props) => {
  /** Steps以及Data的处理 **/
  const { $_steps = {}, data = {} } = props
  const $data = data.initialValues ? data.initialValues[$_steps.field]:undefined
  /** 通过数据信息计算Steps数据 **/
  if($_steps.progress){
    /** 修改每一个步骤的配置 **/
    let found = false
    $_steps.progress.forEach(item => {
      /** 有数据的时候处理 **/
      if($data){
        if(item.step == $data){
          found = true
          item.className = `completed active`
        }else{
          if(found){
            item.className = `disabled`
          }
        }
      }
    })
  }
  /** 直接返回Progress引用 **/
  return ($_steps.progress)?$_steps.progress:[]
}
/**
 * 订单价格计算
 * @param props
 */
const $_fnOrder = (props) => {
  const { data = {} } = props
  const initials = data.initialValues?data.initialValues:{}
  const identifier = {}
  if(0 < Object.keys(initials).length){
    identifier['serial'] = initials.serial
    identifier['credence'] = initials.credence
    identifier['price'] = initials.amountTotal
  }
  return identifier
}
// ------------------------------------
// Mapping Definition
// ------------------------------------
export default {
  initiate,
  $_fnLocate,
  $_fnIsArray,
  $_fnSteps,
  $_fnOrder
}
