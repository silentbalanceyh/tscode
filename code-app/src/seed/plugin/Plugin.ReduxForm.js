import Immutable from 'immutable'
import Abrupt from '../abrupt'
import Redux from '../redux'
import JQuery from './Plugin.JQuery'
import Op from '../op'

class ReduxForm {
  /**
   * 读取initialValues
   * @param props
   */
  static extractInit(props) {
    const $props = Immutable.fromJS(props);
    const pathes = ['data', "initialValues"];
    return $props.getIn(pathes);
  }

  static clean(props) {
    const {form, dispatch} = props
    dispatch({
      type: Redux.Types.SUCCESS_UI_FORM_CLEAN,
      form
    })
  }

  /**
   *
   * @param props
   */
  static validateForm(props = {}, fields = []) {
    const {handleSubmit, values = {}, valid, asyncValidate} = props
    handleSubmit((data) => {
      console.info(data)
    },props,valid, asyncValidate, fields)(values)
  }

  /**
   *
   * @param dispatch
   * @param form
   * @param values
   */
  static linker({
    dispatch, form
  }, linker, record = {}) {
    const values = {}
    /** 专用值处理 **/
    for (const key in linker) {
      let field = linker[key]
      if (field) {
        let value = record[key]
        /** Fix Boolean值的后端传入为undefined的问题 **/
        if (0 <= field.indexOf("$RDX$")) {
          field = field.split(":")[1]
          if (field) {
            value = record[key] ? record[key] : "false"
          }
        }
        /** Fix CHECKBOX 'on'值处理 **/
        if (0 <= field.indexOf("$CHK$")) {
          field = field.split(":")[1]
          if (field) {
            value = (true == record[key]) ? "true" : "false"
          }
        }
        values[field] = value
      }
    }
    for (const field in values) {
      let payload = values[field]
      dispatch({type: Abrupt.ReduxForm.RD_FILL, meta: {form, field}, payload})
    }
  }

  static change(dispatch, {form, field, value}, touch = false) {
    dispatch({
      type: Abrupt.ReduxForm.RD_CHANGE,
      meta: {form, field, touch, persistentSubmitErrors: false},
      payload: value
    })
  }

  /**
   *
   * @param props
   * @param prevProps
   */
  static initialize(props, prevProps, mask = true) {
    /** 0.重设Pool中的数据，Form提交中必备 **/
    Op.Pool.init()

    const newIVal = ReduxForm.extractInit(props);
    const oldIVal = ReduxForm.extractInit(prevProps);
    /** 1.设置值 **/
    let value = {}
    if (!Immutable.is(newIVal, oldIVal)) {
      /** 3.执行Form本身的初始化 **/
      if (newIVal) {
        value = newIVal.toJS();
      }
      /** 4.判断初始化流程 **/
      if (props.initialize) {
        /** 5.有值执行initialize操作 **/
        props.initialize(value);
      }
      /** 6.DropDown界面效果处理钩子 **/
      JQuery.initValues(props, value)
      /** 7.钩子用于钩到对应的Form信息，是否执行验证 **/
      if (props.validate) {
        const syncErrors = props.validate(value);
        const form = props.form || props['$_cid'];
        const type = Abrupt.ReduxForm.RD_INIT;
        /** 8.调用dispatch方法触发 **/
        props.dispatch({
          type, meta: {form}, payload: {syncErrors}
        })
      }
      /** 9.最终初始化需要关闭mask **/
      if ("COMMON" != props['$_etat']) {
        JQuery.hiddenMask()
      }
    } else {
      /** Fix：解决下拉问题 **/
      JQuery.initValues(props, {})
      /** Fix: 解决Masker不消失的问题 **/
      if ("COMMON" != props['$_etat']) {
        JQuery.hiddenMask()
      }
    }
  }
}

export default ReduxForm
