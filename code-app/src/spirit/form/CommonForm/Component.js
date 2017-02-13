import React from 'react'
import {reduxForm} from 'redux-form'

import css from './Component.scss'
import $$ from '../../../seed'
import dispatches from '../../_shared/FormInit'
import mapping from '../../_internal/Redux'

import PureForm from '../../_assembly/PureForm'
// ------------------------------------
// Class Definition
// ------------------------------------
class Component extends PureForm {
  // ------------------------------------
  // 默认构造函数
  // ------------------------------------
  constructor(props){
    super(props,'form.CommonForm')
  }
  // ------------------------------------
  // Major Render Method
  // ------------------------------------
  render() {
    /** 1.field字段，op操作，etat状态 **/
    const {$_etat, $_field, $_op} = this.props;
    return super.romance((
      $$.Tool.Form.etat($_etat) &&
      $$.Adom.Render.mountJArrays([$_field, $_op])
    )  ? (
      <div className={`${css['container']}`}>
        <form className={`ui form ${css['form']}`}>
          {
            $_field.map((item) => ($$.Render.Field.jsxInput(item, $_etat)))
          }
          <div className={`inline field`}>
            {
              $_op.map((item) => ($$.Render.Op.jsxOp(item, this.props, $_etat)))
            }
          </div>
        </form>
      </div>
    ) : false)
  }
}


// ------------------------------------
// React Specification
// ------------------------------------
if(process.env.NODE_ENV === `development`) {
  Component.defaultProps = {
    $_etat: 'COMMON'
  }

  Component.propTypes = {
    $_field: React.PropTypes.array.isRequired,
    $_op: React.PropTypes.array.isRequired,
    $_etat: React.PropTypes.oneOf(['COMMON', 'EDIT', 'ADD', 'VIEW'])
  }
}
export default reduxForm({})(mapping.redux(Component,dispatches));
