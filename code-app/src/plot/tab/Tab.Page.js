import $$ from '../../seed'
import Shared from '../shared'

const _redux = (meta, config, type = $$.Redux.Types.SUCCESS_UI_TAB_DYNAMIC) => {
  const {pages} = meta
  const {state, form} = config
  const tabpage = pages[state]
  // const cid = form ? form : meta.cid
  const etat = state
  return {
    type, uex: {tabpage}, config: {etat, form, init: config.initials}
  }
}

const _add = (meta, config, {
  dispatch
}) => {
  $$.Logger.Input.formInput(meta, '_add', config)
  /** 插件效果 **/
  $$.Plugin.JQuery.showMask()
  /** 提取需要的逻辑 **/
  setTimeout(() => {
    const redux = _redux(meta, config.config)
    return dispatch(redux)
  }, 100)
}

const _edit = (meta, config, {
  dispatch
}) => {
  $$.Logger.Input.formInput(meta, '_edit', config)
  /** 提取选中行信息 **/
  const {selected} = meta
  const {dialog} = config.config
  if ($$.Render.Hatch.row(dialog, selected)) {
    /** 插件效果 **/
    $$.Plugin.JQuery.showMask()
    /** Delay效果 **/
    setTimeout(() => {
      const redux = _redux(meta, config.config)
      return dispatch(redux)
    }, 100)
  }
}

const _back = (meta, config = {}, {
  dispatch
}) => {
  $$.Logger.Input.formInput(meta, '_back', config)
  const {target} = config.config
  return dispatch({
    type: $$.Redux.Types.SUCCESS_UI_TAB_REMOVING,
    cid: target, uex: {}
  })
}

const _delete = (meta, config, {
  dispatch
}) => {
  /** 提取选中行信息 **/
  $$.Logger.Input.formInput(meta, '_delete', config)
  const {selected} = meta
  const {dialog} = config.config
  if ($$.Render.Hatch.row(dialog, selected)) {
    $$.Dialog.Semantic.confirm("确认删除选中记录？", () => {
      /** 插件效果 **/
      $$.Plugin.JQuery.showMask()
      /** Delay效果 **/
      setTimeout(() => {
        // 构造input
        const input = {uniqueId: selected}
        // 构造最终OP
        return Shared.Submit.execute(input, config, dispatch)
      }, 100)
    })
  }
}

export default {
  _add,
  _edit,
  _delete,
  _back
}
