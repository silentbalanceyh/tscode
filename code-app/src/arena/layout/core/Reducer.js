import MOD from '../module'
// ------------------------------------
// InitState
// ------------------------------------
const initialState = MOD.$$.Redux.State.Init.app();

const HANDLERS = {
  [MOD.$$.Redux.Types.SUCCESS_APP_INIT]: MOD.$$.Redux.State.App.success,
  [MOD.$$.Redux.Types.SUCCESS_APP_START]: MOD.$$.Redux.State.Status.write,
  [MOD.$$.Redux.Types.SUCCESS_ARBOR_DATA]: MOD.$$.Redux.State.Arbor.success,
  [MOD.$$.Redux.Types.SUCCESS_ARBOR_TPL]: MOD.$$.Redux.State.Arbor.init,
  // 菜单专用
  [MOD.$$.Redux.Types.SUCCESS_UI_MENU_START]:MOD.$$.Redux.State.UI.Menu.start,
  [MOD.$$.Redux.Types.SUCCESS_APP_DOWNLOAD]:MOD.$$.Redux.State.Arbor.download,
  // ------------------------------------
  // Failure流程
  // ------------------------------------
  [MOD.$$.Abrupt.Types.FAILURE_APP_INIT]: MOD.$$.Redux.State.App.failure
}
// ------------------------------------
// Reducer
// ------------------------------------
export default MOD.$$.Redux.Handler.initReducer(HANDLERS,initialState)
