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
    super(props, 'form.PertainForm')
  }

  // ------------------------------------
  // Major Render Method
  // ------------------------------------
  render() {
    /** 1.field字段，op操作，etat状态 **/
    const {$_etat, $_field = [], $_op, $_fieldset, $_columns} = this.props;
    const {$_meta} = this.props
    /** 2.先处理Field **/
    const fields = dispatches.$_fnLocate($_fieldset, $_field, $_etat)
    const fieldsets = fields.fieldsets
    const hiddens = fields.hidden
    /** 3.处理订单步骤专用 **/
    const progress = dispatches.$_fnSteps(this.props)
    const stepAdj = $$.Render.Semantic.number(progress.length)
    /** 4.处理订单价格和单号专用 **/
    const order = dispatches.$_fnOrder(this.props)
    /** 5.处理订单项 **/
    const {$_sublist = {}} = this.props
    const {sequence = []} = $_sublist
    const meta = $$.Tool.Form.configData(this.props)
    return super.romance((
      $$.Tool.Form.etat($_etat) &&
      $$.Adom.Render.mountJArrays([$_field, $_op]) &&
      $$.Adom.Render.mountJObject($_fieldset) &&
      $$.Tool.Form.render(this.props)
    ) ? (
        <div className={`${css['container']}`}>
          <form className={`ui form ${css['form']}`}>
            <div className={`ui ${stepAdj} steps`}>
              {
                progress.map((item, idx) => ($$.Render.Progress.jsxOrder(item, idx)))
              }
            </div>
            {
              hiddens.map(item => ($$.Render.Field.jsxInput(Object.assign({column: $_columns}, item), $_etat, meta)))
            }
            <div className={css['ordertitle']}>
              {$$.Render.Form.renderOrder(order, $_meta)}
            </div>
            {
              fieldsets.map((fieldset, idx) => {
                return (
                  <div key={`fieldset${idx}`} className={css['fieldset']}>
                    <h5 className="ui dividing header">
                    </h5>
                    {
                      fieldset.items.map((row, ridx) => {
                        return (!dispatches.$_fnIsArray(row)) ? (
                            <div className={`inline fields ${css['row']}`} key={`row${ridx}`}>
                              {
                                row.map((item) => ($$.Render.Field.jsxInput(Object.assign({column: $_columns}, item), $_etat, meta)))
                              }
                            </div>
                          ) : (row.map((item) => ($$.Render.Field.jsxInput(Object.assign({column: $_columns}, item), $_etat, meta))))
                      })
                    }
                  </div>
                )
              })
            }
            {
              sequence.map(item => {
                const title = (item.title) ?
                  <h5 className={`ui dividing header ${css['subtitle']}`} key={item.key}>{item.title}</h5> : false
                const columns = $_sublist[item.key]
                return (
                  <div className={css['sublist']} key={`datatable${item.key}`}>
                    {title}
                    {$$.Render.Form.renderSubList(this.props.data, columns, item, meta)}
                  </div>)
              })
            }
            <div className={css['fieldset']}>
              <h5 className="ui dividing header"></h5>
              <div className={`inline fields ${css['actions']}`}>
                {
                  $_op.map((item) => ($$.Render.Op.jsxOp(item, this.props, $_etat)))
                }
              </div>
            </div>
          </form>
        </div>
      ) : false)
  }
}


// ------------------------------------
// React Specification
// ------------------------------------
if (process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    $_field: React.PropTypes.array.isRequired,
    $_op: React.PropTypes.array.isRequired,
    $_etat: React.PropTypes.oneOf(['COMMON', 'EDIT', 'ADD', 'VIEW'])
  }
}

export default reduxForm({})(mapping.redux(Component, dispatches));
