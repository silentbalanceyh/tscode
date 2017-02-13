import Immutable from 'immutable'
import Assert from '../assert'
import Logger from '../logger'
import Entity from '../entity'
import Cache from '../cache'
import Redux from '../redux'

import Locator from './Op.Locator'
import Dialog from '../dialog'
import Tool from '../tool'
import Abrupt from '../abrupt'
import $$ from '../../seed'

const _config = (reference = {}) => {
  const config = Entity.Data.lookup(reference, [`params`, `config`])
  if (config) {
    return config
  } else {
    return {}
  }
}

const fnLocate = (reference = {}) => {
  const config = _config(reference)
  if (config.callback && config.callback['LOCATE']) {
    /** 1.读取根路径 **/
    const route = config.route
    /** 2.读取路径 **/
    const {redirect, logout = false} = config.callback['LOCATE']
    /** 3.Target设置 **/
    const dest = `/${route}${redirect}`
    /** 4.是否触发注销系统行为 **/
    if (logout) {
      Cache.Session.remove(Cache.Key.SESSION)
    }
    /** 5.执行跳转 **/
    return Locator.redirect(dest)
  }
}

const fnDialog = (reference = {}, yes) => {
  const config = _config(reference)
  if (config.callback && config.callback['DIALOG']) {
    /** 1.读取Dialog信息 **/
    let {success} = config.callback['DIALOG']
    const {response} = reference
    success = Tool.Format.stringParams(success, response)
    /** 2.执行Success的Dialog **/
    Dialog.Semantic.success(success, () => {
      Assert.isFunction({yes})
      return yes(reference)
    })
  }
}

const fnTab = (reference = {}) => {
  const config = _config(reference)
  if (config.callback && config.callback['TAB']) {
    /** 1.执行Tab处理 **/
    const {tabIndex = -1, type} = config.callback['TAB']
    /** 2.执行Tab类型处理 **/
    const {form} = config
    const {dispatch} = reference
    /** 3.处理dispatch **/
    return dispatch({
      type, uex: {tabIndex}, cid: form
    })
  }
}

const fnReload = (reference = {}) => {
  const config = _config(reference)
  if (config.callback && config.callback['RELOAD']) {
    /** 1.执行RELOAD处理 **/
    let {cid, key, clean} = config.callback['RELOAD']
    /** 2.执行最终处理 **/
    const {dispatch} = reference
    /** 3.执行dispatch **/
    if (!cid) cid = "pgList"
    if (!key) key = ["uex", "reload", "pgList"]
    if (!clean) clean = ["data", "list"]
    dispatch({type: Redux.Types.SUCCESS_FANTOM_CLEAN_DATA, keys: {record: clean}})
    return dispatch({
      type: Redux.Types.SUCCESS_UI_PAGER_RELOAD,
      cid, key
    })
  }
}

const fnReset = (reference = {}) => {
  const config = _config(reference)
  if (config.callback && config.callback['RESET']) {
    /** 1.读取需要Reset的Form **/
    const {form} = config.callback['RESET']
    /** 2.执行最终处理 **/
    const {dispatch} = reference
    /** 3.执行dispatch中的Redux **/
    if (form) {
      let reload
      if (Array.prototype.isPrototypeOf(form)) {
        const type = Abrupt.ReduxForm.RD_RESET
        form.forEach(item => {
          dispatch({
            type, meta: {form: item}
          })
        })
        reload = form[0]
      } else {
        const type = Abrupt.ReduxForm.RD_RESET
        dispatch({
          type, meta: {form}
        })
        reload = form
      }
      if(reload) {
        /** 特殊Reload操作 **/
        dispatch({
          type: Redux.Types.SUCCESS_UI_PAGER_RELOAD,
          key: ["uex", 'reload', reload],
          cid: reload
        })
      }
    }
  }
}

const fnInitForm = () => {
  window.location.reload();
}

const fnHiddenMask = () => {
  $$.Plugin.JQuery.hiddenMask()
}

const fnFormReset = (reference = {}) => {
  const config = _config(reference)
  if (config.callback && config.callback['FORMRESET']) {
    /** 1.读取需要Reset的Form **/
    const {form} = config.callback['FORMRESET']
    /** 2.执行最终处理 **/
    const {dispatch} = reference
    /** 3.执行dispatch中的Redux **/
    if (form) {
      if (Array.prototype.isPrototypeOf(form)) {
        const type = Abrupt.ReduxForm.RD_RESET
        form.forEach(item => {
          dispatch({
            type, meta: {form: item}
          })
        })
      } else {
        const type = Abrupt.ReduxForm.RD_RESET
        dispatch({
          type, meta: {form}
        })
      }
    }
  }
}

const FUNSMAP = {
  "LOCATE": fnLocate,
  "DIALOG": fnDialog,
  "TAB": fnTab,
  "RELOAD": fnReload,
  "RESET": fnReset,
  "INITFORM": fnInitForm,
  "HIDDENMASK": fnHiddenMask,
  "FORMRESET": fnFormReset
}
/**
 * Callback标准回调流程
 */
class Callback {

  /**
   * 提取Function
   * @param key
   * @param reference
   */
  static jsFuns(reference, chains = []) {
    const jsFuns = {}
    const config = _config(reference)
    const $chains = Immutable.fromJS(chains)
    if (0 < $chains.size) {
      $chains.forEach(key => {
        if ('$CUSTOM$' == key && config['fnCallback']) {
          jsFuns[key] = config['fnCallback']
        } else {
          jsFuns[key] = FUNSMAP[key]
        }
      })
    }
    return jsFuns
  }

  /**
   *
   * @param chains
   */
  static split(chains = []) {
    const before = []
    const after = []
    let dialog = null
    /** 2.处理After **/
    let split = false
    chains.forEach(key => {
      if (split) {
        after.push(key)
      } else {
        before.push(key)
      }
      if ("DIALOG" == key) {
        split = true
        dialog = key
      }
    })
    /** 3.处理完整结构 **/
    return {
      before,
      after,
      dialog
    }
  }

  /**
   * 依次执行函数
   * @param keys
   * @param jsFuns
   * @param reference
   * @param isReturn
   */
  static executeFun(keys = [], jsFuns = {}, reference, isReturn = false) {
    for (let idx = 0; idx < keys.length; idx++) {
      /** 1.读取函数信息 **/
      const jsFun = jsFuns[keys[idx]]
      Assert.isFunction({jsFun})
      /** 最后一个函数执行时隐藏Mask **/
      if (idx == keys.length - 1) {
        // Plugin.JQuery.hiddenMask()
      }
      if (isReturn && idx == keys.length - 1) {
        /** 2.1.执行返回 **/
        Logger.Input.callback(reference, `[Return ${keys[idx]}]`)
        return jsFun(reference)
      } else {
        /** 2.2.执行函数 **/
        Logger.Input.callback(reference, `[Execute ${keys[idx]}]`)
        jsFun(reference)
      }
    }
  }

  /**
   * 执行回调
   * @param reference
   */
  static execute(reference) {
    try {
      /** 1.提取配置信息 **/
      const config = _config(reference)
      const callback = config.callback
      let chains = callback['EXECUTE']
      /** 2.处理链式结构 **/
      if (!chains) chains = []
      const executor = Callback.split(chains)
      const {before = [], dialog, after = []} = executor
      /** 3.抽取key **/
      const jsFuns = Callback.jsFuns(reference, chains)
      /** 4.检查Dialog **/
      if (dialog) {
        /** 4.1.1.有Dialog的函数执行 **/
        Callback.executeFun(before, jsFuns, reference, false)
        /** 4.1.2.执行Dialog专用函数 **/
        jsFuns[dialog](reference, () => {
          Callback.executeFun(after, jsFuns, reference, true)
        })
      } else {
        /** 4.2.没有Dialog的函数执行 **/
        return Callback.executeFun(before, jsFuns, reference, true)
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export default Callback
