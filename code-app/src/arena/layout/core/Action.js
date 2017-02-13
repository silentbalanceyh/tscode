import MOD from '../module'
// ------------------------------------
// Loaded判断，防止重复加载
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------
const initiate = (props = {}, params = {}, component) => {
  const { dispatch } = props
  if(dispatch){
    /**
     * 1. 构造reference变量
     */
    const user = MOD.$$.Cache.Session.get(MOD.$$.Cache.Key.SESSION);
    const reference = MOD.$$.Abrupt.Abysm.app({dispatch, user})
    /**
     * 2. 构造Promise链式结构
     * @type {any}
     */
    const params = MOD.$$.Entity.Params.app(props);
    /**
     * 3. 处理Cache Key
     * @type {*}
     */
    const promise = MOD.$$.Ajax.Promise;
    const api = MOD.$$.Config.App;
    // End <-------------
    const fnSlice = promise.end(dispatch, 'slice', reference, MOD.$$.Redux.Action.succApp(component));
    // <-----------------
    const fnLayout = promise.flow(api.slice, fnSlice, 'layout', reference);
    // <-----------------
    const fnConfig = promise.flow(api.layout, fnLayout, 'config', reference);
    // <----------- Start
    return promise.start(api.config, fnConfig, params, 'params', reference);
  }
}
export default {
  initiate
}
