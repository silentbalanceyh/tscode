import React from 'react'

import $$ from '../../../seed'
import dispatches from './Redux'
import mapping from '../../_internal/Redux'
import css from './Component.scss'

import PureControl from '../../_assembly/PureControl'

class Component extends PureControl {
  // ------------------------------------
  // 默认构造函数
  // ------------------------------------
  constructor(props) {
    super(props, 'list.FlexList')
  }

  // ------------------------------------
  // Component Valid Ensure & Init
  // ------------------------------------
  componentWillMount() {
    $$.Tool.Flow.init(this.props)
  }

  componentDidUpdate(prevProps) {
    dispatches.$_fnReload(this.props, prevProps);
    dispatches.$_offMask(this.props, prevProps)
  }

  componentWillUnmount() {
    dispatches.$_fnClean(this.props, this.props.$_cid)
  }

  // ------------------------------------
  // Final Rendor
  // ------------------------------------
  render() {
    /** 1.处理children **/
    const {$_cid, $_pk, $_selected} = this.props;

    /** 2.TopBar专用 **/
    const {$_topbar = []} = this.props
    const meta = $$.Tool.Form.configData(this.props)
    meta.selected = $_selected

    /** 3.PageList专用 **/
    const {dispatch,$_show} = this.props
    const {$_data, $_columns, $_query, $_empty} = this.props
    const render = $$.Adom.Render.mountList($_data);
    return super.romance((render) ? (
        <div id={$_cid} data-id={$_pk}>
          <div className={`ui top attached menu ${css['top']} ${css['item']}`} style={{display:($_show)?'block':'none'}}>
            <div className={`ui secondary menu ${css['menu']}`}>
              {
                $_topbar.map((item) => ($$.Render.Op.jsxLink(item, this.props, Object.assign({
                  className: css['menuitem']
                }, meta))))
              }
            </div>
          </div>
          <table className={`ui selectable sortable celled table ${css['table']}`}>
            <thead>
            <tr className={css['header']}>
              {$_columns.map((item) => ($$.Render.PageList.renderHeader(item, $_query, dispatches.$_fnSort(dispatch, this.props))))}
            </tr>
            </thead>
            <tbody className={css['body']}>
            {
              (0 < $_data.list.length) ? $_data.list.map((row, idx) => ($$.Render.PageList.renderRow(row, $_columns, Object.assign({
                  row: idx
                }, meta)))) : (
                  <tr>
                    <td colSpan={$_columns.length}>
                      {$_empty ? $_empty : false}
                    </td>
                  </tr>
                )
            }
            </tbody>
          </table>
        </div>
      ) : false)
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
export default mapping.dispatch(Component, dispatches)
