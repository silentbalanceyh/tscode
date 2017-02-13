import MOD from '../module'
// ------------------------------------
// InitState
// ------------------------------------
const initialState = MOD.$$.Redux.State.Init.module();
// ------------------------------------
// Action Handlers
// ------------------------------------
const HANDLERS = {
  [MOD.$$.Redux.Types.SUCCESS_MOD_INIT]: MOD.$$.Redux.State.Module.success,
  [MOD.$$.Redux.Types.SUCCESS_MOD_START]: MOD.$$.Redux.State.Status.write,

  [MOD.$$.Redux.Types.SUCCESS_DATA_RELOAD]: MOD.$$.Redux.State.Module.loading,
  [MOD.$$.Redux.Types.SUCCESS_GOONEY_DATA]: MOD.$$.Redux.State.Gooney.success,
  [MOD.$$.Redux.Types.SUCCESS_GOONEY_CLEAN_DATA]: MOD.$$.Redux.State.Gooney.clean,
  // Module专用UCA合并Reducer
  [MOD.$$.Redux.Types.SUCCESS_FANTOM_DATA]: MOD.$$.Redux.State.Fantom.success,
  [MOD.$$.Redux.Types.SUCCESS_FANTOM_CLEAN_DATA]: MOD.$$.Redux.State.Fantom.clean,
  // Control处理
  [MOD.$$.Redux.Types.SUCCESS_CONTROL_HASH]: MOD.$$.Redux.State.Hash.success,
  // Array单行处理
  [MOD.$$.Redux.Types.SUCCESS_UI_ROW_REFRESH]: MOD.$$.Redux.State.Array.success,
  // Form专用Reducer
  [MOD.$$.Redux.Types.SUCCESS_UI_FORM_INIT]: MOD.$$.Redux.State.UI.Form.init,
  [MOD.$$.Redux.Types.SUCCESS_UI_FORM_ETAT]: MOD.$$.Redux.State.UI.Form.etat,
  [MOD.$$.Redux.Types.SUCCESS_UI_FORM_CLEAN]: MOD.$$.Redux.State.UI.Form.clean,
  [MOD.$$.Redux.Types.SUCCESS_UI_FORM_CRITERIA]: MOD.$$.Redux.State.UI.Form.criteria,

  // UI界面专用Reducer
  [MOD.$$.Redux.Types.SUCCESS_UI_TAB_MOVING]: MOD.$$.Redux.State.UI.Tab.moving,
  [MOD.$$.Redux.Types.SUCCESS_UI_TAB_SELECT]: MOD.$$.Redux.State.UI.Tab.select,
  [MOD.$$.Redux.Types.SUCCESS_UI_TAB_REMOVING]: MOD.$$.Redux.State.UI.Tab.removing,
  [MOD.$$.Redux.Types.SUCCESS_UI_TAB_DYNAMIC]: MOD.$$.Redux.State.UI.Tab.dynamic,
  [MOD.$$.Redux.Types.SUCCESS_UI_TAB_HIT]:MOD.$$.Redux.State.UI.Tab.hit,

  // Pager界面专用Reducer
  [MOD.$$.Redux.Types.SUCCESS_UI_PAGER_INDEX]: MOD.$$.Redux.State.UI.Pager.index,
  [MOD.$$.Redux.Types.SUCCESS_UI_PAGER_SIZE]: MOD.$$.Redux.State.UI.Pager.size,
  [MOD.$$.Redux.Types.SUCCESS_UI_PAGER_SORT]: MOD.$$.Redux.State.UI.Pager.sort,
  [MOD.$$.Redux.Types.SUCCESS_UI_PAGER_RELOAD]: MOD.$$.Redux.State.UI.Pager.reload,
  [MOD.$$.Redux.Types.SUCCESS_UI_SELECTED_ROW]: MOD.$$.Redux.State.UI.Select.row,

  // ------------------------------------
  // Failure流程
  // ------------------------------------
  [MOD.$$.Abrupt.Types.FAILURE_MOD_INIT]: MOD.$$.Redux.State.Module.failure,
  // ------------------------------------
  // Action专用
  // ------------------------------------
  // Success
  [MOD.$$.Redux.Types.SUCCESS_ACT_LOGIN]: MOD.$$.Redux.State.Module.success,
  [MOD.$$.Redux.Types.SUCCESS_ACT_FORM]: MOD.$$.Redux.State.UI.Form.submit,
  // Failure
  [MOD.$$.Abrupt.Types.FAILURE_ACT_LOGIN]: MOD.$$.Redux.State.Module.failure,
  [MOD.$$.Abrupt.Types.FAILURE_ACT_FORM]: MOD.$$.Redux.State.Module.failure,
}
// ------------------------------------
// Reducer
// ------------------------------------

export default MOD.$$.Redux.Handler.initReducer(HANDLERS, initialState)
