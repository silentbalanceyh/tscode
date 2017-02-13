import MOD from '../module'
// ------------------------------------
// Actions
// ------------------------------------
const initiate = (props = {}, params = {}, component) => {
  const {dispatch} = props
  if (dispatch) {
    const prev = props.params
    /** 1.读取Layout专用，用于抓取pageId **/
    const promise = MOD.$$.Config.App.layout({prev})
    /** 2.异步读取 **/
    promise.then(data => {
      // console.info(data)
      // console.info(props.app)
      /**
       * 1. 处理参数信息
       */
      const cache = MOD.$$.Entity.Params.module({params: props.params, page: data.pageId, app: props.app});
      /**
       * 2. 构造reference变量
       * @type {{type: string, errorType: string, dispatch: *, cache: *}}
       */
      const reference = MOD.$$.Abrupt.Abysm.mod({dispatch, cache})
      /**
       * 3. Promise链式结构
       * @type {any}
       */
      const promises = MOD.$$.Ajax.Promise;
      const api = MOD.$$.Config.Module;
      // End <-----------------
      const fnFinal = promises.end(dispatch, 'config', reference, MOD.$$.Redux.Action.succModule(component));
      // <---------------------
      const fnConfig = promises.flowArray({
        "cache": cache,
        "type": MOD.$$.Facade.orention(),
      }, fnFinal, "controls", reference, api.config);
      // <--------------- Start
      return promises.start(api.control, fnConfig, cache, 'params', reference);
    })
  }
}
export default {
  initiate
}
