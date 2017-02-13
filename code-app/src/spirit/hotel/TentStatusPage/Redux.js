import $$ from '../../../seed'
import Immutable from 'immutable'
import Component from '../RoomDetail/Component'
// HTL系统专用
const $_fnExtractStatus = (tabular) => {
  /** 0.Flat Tabular **/
  let meta = $$.Entity.Array.tabular(tabular);
  /** 1.计算状态 **/
  return meta;
}

const $_offMask = (props, prevProps) => {
  const newData = Immutable.fromJS(props['data'])
  const oldData = Immutable.fromJS(prevProps['data'])
  if (!Immutable.is(newData, oldData)) {
    $$.Plugin.JQuery.hiddenMask()
  }
}
// HTL系统专用
const $_fnViewRoom = (props, selected) => () => {
  /** 1.构造专用属性信息 **/
  const target = {}
  target['selected'] = selected
  target['assist'] = {}
  /** 2.构造层、栋、房屋类型 **/
  const {assist = {}} = target
  assist['floors'] = props['$_floors']
  assist['tents'] = props['$_tents']
  assist['room.types'] = props['$_types']
  /** 3.构造状态数据 **/
  target['tabular'] = props['$_tabular']
  /** 4.房屋数据本身 **/
  target['data'] = props['data']
  /** 5.弹出框 **/
  $$.Dialog.Retort.dialog(Component, {selector: target}, 'winSelector')
}
const $_fnContext = (props, selected) => (event) => {
  event.preventDefault()

}
export default {
  $_fnExtractStatus,
  $_fnViewRoom,
  $_fnContext,
  $_offMask
}
