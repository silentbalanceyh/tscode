import Context from '../context'
import Assert from '../assert'
import Seed from './Op.Seed'

const filter = (code = '') => {
  let $code = code
  Seed.forEach((item) => {
    if(0 <= code.indexOf(item)){
      $code = item
      return
    }
  })
  return $code
}

class Handler {
  /**
   *
   * @param config
   * @param input
   * @param dispatch
   * @param props
   * @returns {*}
   */
  static server(config, input, dispatch, props) {
    const {path, method, script} = config;
    Assert.isArrayString({path, method});
    if (script) {
      return Context.Executor.twinkle({
        script,
        path,
        method
      }, input, {
        dispatch,
        props
      });
    } else {
      console.error("Action Error Occurs!");
    }
  }

  /**
   * 直接读取jsFun
   * @param config
   */
  static calcJSFun(config){
    const {code} = config
    Assert.isString({code})
    let jsFun
    if(0 <= code.indexOf("_")){
      /** Extension扩展库流程 **/
      jsFun = Context.Std.Extension[code]
    }else{
      /** OOB专用函数流程 **/
      const $code = filter(code)
      jsFun = Context.Std[`_STD_.${$code}`]
    }
    if(!jsFun){
      jsFun = () => {
        console.info(config)
        console.error(code)
      }
    }
    return jsFun
  }
  /**
   *
   * @param config
   * @param params
   * @param dispatch
   * @param props
   */
  static client(config, params, dispatch, props){
    const jsFun = Handler.calcJSFun(config)
    return jsFun(params, config, {dispatch, props});
  }

  static direct(config, meta = {}){
    return (event) => {
      event.preventDefault();
      /** 1.从Meta中读取参数 **/
      const { dispatch } = meta
      /** 2.提取配置信息 **/
      Assert.isFunction({dispatch});
      /** 3.仅支持客户端 **/
      return Handler.client(config, meta, dispatch, {})
    }
  }
  /**
   *
   * @param config
   */
  static generate(config) {
    return (input, dispatch, props) => {
      /** 1.提取配置信息 **/
      Assert.isFunction({dispatch});
      /** 2.分流操作 **/
      if ("CLIENT" == config['dispatch']) {
        return Handler.client(config, input, dispatch, props)
      } else {
        return Handler.server(config, input, dispatch, props)
      }
    }
  }
}

export default Handler
