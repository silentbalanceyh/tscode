import React from 'react'
import {reduxForm} from 'redux-form'

import css from './Component.scss'
import $$ from '../../../seed'
import dispatches from './Redux'
import mapping from '../../_internal/Redux'

import PureForm from '../../_assembly/PureForm'
// ------------------------------------
// Class Definition
// ------------------------------------
class Component extends PureForm {
  // ------------------------------------
  // 默认构造函数
  // ------------------------------------
  constructor(props) {
    super(props, 'form.StateForm')
  }
  // ------------------------------------
  // Major Render Method
  // ------------------------------------
  render() {
    /** 1.field字段，op操作，etat状态 **/
    const {$_etat, $_field, $_op} = this.props;
    /** 2.设置Loading **/
    const isLoading = dispatches.$_fnLoading(this.props)
    /** 3.处理更新界面的Loading **/
    const meta = $$.Tool.Form.configData(this.props)
    return super.romance((
      $$.Tool.Form.etat($_etat) && isLoading &&
      $$.Tool.Form.render(this.props) &&
      $$.Adom.Render.mountJArrays([$_field, $_op])
    ) ? (
      <div className={`${css['container']}`}>
        <form className={`ui form ${css['form']}`}>
          {
            $_field.map((item) => ($$.Render.Field.jsxInput(item, $_etat, meta)))
          }
          <div className={`inline field`}>
            {
              $_op.map((item) => ($$.Render.Op.jsxOp(item, this.props, $_etat)))
            }
          </div>
        </form>
      </div>
    ) : $$.Tool.Loader.loader(this.props))
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if (process.env.NODE_ENV === `development`) {

}

export default reduxForm({})(mapping.redux(Component,dispatches));
