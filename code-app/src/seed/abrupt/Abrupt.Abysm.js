import Types from './Abrupt.Types'
import Flow from './Abrupt.Flow'
import Redux from '../redux'
import Immutable from 'immutable'

const build = (redux,type,flow,params = {}) => {
  /** 1.构造参数 **/
  let $refs = Immutable.fromJS(params)
  /** 2.处理成功响应信息 **/
  $refs = $refs.set('type',redux)
  /** 3.处理失败响应信息 **/
  const abrupt = { type, flow }
  $refs = $refs.set('abrupt',abrupt)
  /** 4.返回最终结果 **/
  return $refs.toJS()
}
/**
 * 生成错误信息专用
 */
class Abysm{

  /** Module Reference错误信息专用生成 **/
  static mod(params = {}){
    return build(
      Redux.Types.SUCCESS_MOD_INIT,
      Types.FAILURE_MOD_INIT,
      Flow.FLOW_DATA_INIT,
      params)
  }
  /** App Reference错误信息专用生成 **/
  static app(params = {}){
    return build(
      Redux.Types.SUCCESS_APP_INIT,
      Types.FAILURE_APP_INIT,
      Flow.FLOW_DATA_INIT,
      params)
  }
  /** Login Reference错粗信息专用 **/
  static login(params = {}){
    return build(
      Redux.Types.SUCCESS_ACT_LOGIN,
      Types.FAILURE_ACT_LOGIN,
      Flow.FLOW_FORM_SUBMIT,
      params)
  }
  /** Form Reference错误信息专用 **/
  static form(params = {}){
    return build(
      Redux.Types.SUCCESS_ACT_FORM,
      Types.FAILURE_ACT_FORM,
      Flow.FLOW_FORM_SUBMIT,
      params)
  }
}

export default Abysm
