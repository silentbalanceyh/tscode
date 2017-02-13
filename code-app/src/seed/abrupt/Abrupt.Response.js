import Assert from '../assert'
import Repdor from './_response/Repdor'
import Flow from './Abrupt.Flow'
/**
 * 响应函数信息
 */
class Response {
  /**
   * 构造错误信息
   * @param res
   */
  static error(res = {}) {
    const error = {};
    /** Vie Engine错误信息 **/
    if (res.body && res.body.error && res.body.error.info) {
      error.info = res.body.error.info;
    }
    error.code = res.body.error.code;
    error.error = res.body.error.message;
    /** Http状态信息 **/
    error.status = res.status;
    error.statusText = res.statusText;
    /** Request信息 **/
    error.uri = res.error.url;
    error.method = res.error.method;
    return error;
  }

  /**
   * 生成响应函数
   * @param reference
   */
  static exec(reference) {
    /** 返回Ajax Promise部分 **/
    return (err) => {
      console.error(err)
      console.warn(reference)
      const {abrupt, dispatch} = reference
      Assert.isObject({abrupt})
      /** 提取Error相关信息 **/
      if (abrupt.flow == Flow.FLOW_FORM_SUBMIT) {
        /** Form类型专用错误信息 **/
        return dispatch(Repdor.Form.abysm({error: err,reference}))
      }
    }
  }
}

export default Response
