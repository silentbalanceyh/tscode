import $$ from '../../../seed'
import Immutable from 'immutable'
// HTL系统专用
const $_fnExtractStatus = (tabular) => {
  /** 0.Flat Tabular **/
  let meta = $$.Entity.Array.tabular(tabular);
  /** 1.计算状态 **/
  return meta;
}
// HTL系统专用
const $_fnViewRoom = (props) => (event) => {
  console.info(props)
}
const $_fnContext = (props) => (event) => {
  console.info("Hello")
}

const $_offMask = (props, prevProps) => {
  const newData = Immutable.fromJS(props['$_data'])
  const oldData = Immutable.fromJS(prevProps['$_data'])
  if (!Immutable.is(newData, oldData)) {
    $$.Plugin.JQuery.hiddenMask()
  }
}
export default {
  $_fnExtractStatus,
  $_fnViewRoom,
  $_fnContext,
  $_offMask
}
