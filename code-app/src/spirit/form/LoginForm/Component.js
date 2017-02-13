import React from 'react'
import {reduxForm} from 'redux-form'

import css from './Component.scss'
import $$ from '../../../seed'
import dispatches from './Redux'
import mapping from '../../_internal/Redux'

import PureForm from '../../_assembly/PureForm'

class Component extends PureForm {
  // ------------------------------------
  // 默认构造函数
  // ------------------------------------
  constructor(props){
    super(props,'form.LoginForm')
  }
  render() {
    /** 1.配置UI信息 **/
    const config = $$.Tool.Form.initUi(this.props)
    /** 2.执行Render **/
    return super.romance((config) ? (
      <form className={`ui fluid form segment ${css['top']}`}>
        {
          config.field.map((item) => ($$.Render.Field.jsxField(item)))
        }
        <div className={`inline field`}>
          {
            config.op.map((item) => ($$.Render.Op.jsxAct(item, this.props)))
          }
        </div>
      </form>
    ) : false)
  }
}

// ------------------------------------
// React Specification
// ------------------------------------
if(process.env.NODE_ENV === `development`) {

}
//export default reduxForm({})(mapping.redux(Component,Remote));
export default mapping.redux(reduxForm({})(Component),dispatches);
