import React from 'react'
import {reduxForm} from 'redux-form'

import css from './Component.scss'
import $$ from '../../../seed'
import dispatches from '../../_shared/FormInit'
import mapping from '../../_internal/Redux'

import PureForm from '../../_assembly/PureForm'

class Component extends PureForm {
  // ------------------------------------
  // 默认构造函数
  // ------------------------------------
  constructor(props) {
    super(props, 'form.CriteriaForm')
  }
  componentDidUpdate(prevProps) {
    // 必须代码，在Router修改了params时重新初始化
    $$.Plugin.ReduxForm.initialize(this.props, prevProps, false);
  }
  render() {
    /** 1.field字段，op操作，etat状态 **/
    const {$_etat, $_field, $_op} = this.props

    return super.romance((
      $$.Tool.Form.etat($_etat) &&
      $$.Adom.Render.mountJArrays([$_field, $_op]) &&
      $$.Tool.Form.render(this.props)
    ) ? (
      <div className={`ui segment ${css['segment']}`}>
        <form className={`ui form`}>
          <div className={`fields ${css['fields']}`}>
            {
              $_field.map((item) => ($$.Render.Field.jsxInput(item, $_etat, $$.Tool.Form.configData(this.props))))
            }
            <div className="inline field">
              {
                $_op.map((item) => ($$.Render.Op.jsxOp(item, this.props, $_etat)))
              }
            </div>
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
  Component.defaultProps = {
    $_etat: 'COMMON'
  }

  Component.propTypes = {
    $_field: React.PropTypes.array.isRequired,
    $_op: React.PropTypes.array.isRequired,
    $_etat: React.PropTypes.oneOf(['COMMON', 'EDIT', 'ADD', 'VIEW']),
    $_title: React.PropTypes.string
  }
}

export default reduxForm({})(mapping.redux(Component,dispatches));
