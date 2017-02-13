import React from 'react'
import memoize from 'lodash/memoize'

import {Field, reduxForm} from 'redux-form'

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
    super(props, 'list.TriplexList')
  }

  _shouldComponentUpdate = memoize((nextProps) => {
    const updated = $$.Tool.Hooker.isRefresh(this.props, nextProps)
    if (process.env.NODE_ENV === `development`) {
      if (updated) {
        this.counter++
      } else {
        this.resetCounter = true
      }
    }
    return updated
  })
  // ------------------------------------
  // Performance Fix
  // ------------------------------------
  shouldComponentUpdate(nextProps) {
    let updated = this._shouldComponentUpdate(nextProps)
    if (!updated) updated = (dispatches.$_fnRefresh(this.props,nextProps))
    return updated
  }

  // ------------------------------------
  // Component Valid Ensure & Init
  // ------------------------------------
  componentWillMount() {
    $$.Tool.Flow.init(this.props,{ hash:true })
  }

  componentDidMount() {
    //jQuery('#pgSizeBar').dropdown()
    //jQuery('.clsDropDown').dropdown()
    dispatches.$_fnDropDown(this.props)
  }

  componentDidUpdate(nextProps) {
    dispatches.$_fnReload(this.props, nextProps);
    //jQuery('#pgSizeBar').dropdown()
    //jQuery('.clsDropDown').dropdown()
    dispatches.$_fnDropDown(this.props, nextProps)
    dispatches.$_offMask(this.props, nextProps)
  }

  componentWillUnmount() {
    dispatches.$_fnClean(this.props, this.props.$_cid)
  }

  // ------------------------------------
  // Final Rendor
  // ------------------------------------
  render() {
    /** 1.处理children **/
    const {$_cid, $_selected, $_menu} = this.props;

    /** 2.TopBar专用 **/
    const {$_topbar = [], $_pages} = this.props
    const meta = $$.Tool.Form.configData(this.props)
    meta.selected = $_selected
    meta.pages = $_pages

    /** 3.PageList专用 **/
    const {dispatch} = this.props
    const {$_data = {}, $_columns, query, $_empty} = this.props
    const render = $$.Adom.Render.mountList($_data);

    /** 4.PagerMenu专用 **/
    const {$_pager, $_goto, $_counter, $_dropdown} = this.props
    const $_pagination = query.pager
    const prevPager = render ? $_pager.filter((item, idx) => idx < 2) : [];
    const nextPager = render ? $_pager.filter((item, idx) => idx >= 2) : [];
    let counterStr = '';
    /** 4.1.Menu专用 **/
    let menus = []
    if (render) {
      const pageCount = dispatches.$_fn.pageCounter($_counter, $_data, $_pagination.size);
      counterStr = pageCount.text
      $_pagination.count = pageCount.count;
      $_pagination.pages = pageCount.pages;
      /** 4.2.Menu计算 **/
      if ($_menu) {
        menus = dispatches.$_fnMenu($_topbar);
      }
    }
    /** 5.Pager需要的元数据 **/
    const $_clean = ["data", "list"]
    const pagerMeta = {
      dispatch,
      pagination: $_pagination,
      datum: $_clean,
      className: css['pitem'],
      cid: $_cid,
    }
    /** 6.Goto专用 **/
    const {handleSubmit} = this.props
    /** 7.二次专用 **/
    const {$_show} = this.props
    if (!$_data.list) $_data.list = []
    return super.romance(
      <div>
        <div className={`ui top attached menu ${css['top']} ${css['item']}`}
             style={{display: ($_show) ? 'block' : 'none'}}>
          <div className={`ui secondary menu ${css['menu']}`}>
            {($_menu) ? (
                menus.map((menu = {}) => {
                  const {items = [], config = {}} = menu
                  const {icon, text} = config
                  if (0 < items.length) {
                    return (
                      <div className={`ui dropdown item clsDropDown`} key={menu.cid}>
                        <i className={`large ${icon} icon`}></i>{text}<i className="dropdown icon"></i>
                        <div className={`menu ${css['barmenu']}`}>
                          {
                            items.map(item => ($$.Render.Op.jsxLink(item, this.props, Object.assign({
                              className: css['menuitem']
                            }, meta))))
                          }
                        </div>
                      </div>
                    )
                  } else {
                    return $$.Render.Op.jsxLink(menu, this.props, Object.assign({
                      className: css['menuitem']
                    }, meta))
                  }

                })
              ) :
              $_topbar.map((item) => ($$.Render.Op.jsxLink(item, this.props, Object.assign({
                className: css['menuitem']
              }, meta))))
            }
          </div>
        </div>
        <div className={`ui attached segment ${css['item']} ${css['middle']}`}>
          <table key="tbDataList" className={`ui selectable sortable celled table`}>
            <thead>
            <tr className={css['header']}>
              {$_columns.map((item) => ($$.Render.PageList.renderHeader(item, query, dispatches.$_fnSort(dispatch, this.props))))}
            </tr>
            </thead>
            <tbody>
            {
              (0 < $_data.list.length) ? $_data.list.map((row, idx) => ($$.Render.PageList.renderRow(row, $_columns, Object.assign({
                  row: idx
                }, meta)))) : (
                  <tr className={css['body']}>
                    <td colSpan={$_columns.length}>
                      {$_empty ? $_empty : false}
                    </td>
                  </tr>
                )
            }
            </tbody>
          </table>
        </div>
        <div className={`ui bottom attached menu ${css['bottom']} ${css['item']}`}>
          <ul className={`ui horizontal list ${css['pager']}`}>
            <li className={`item ${css['li']} ${css['counter']}`}>
              <div className={`ui secondary menu ${css['counter-menu']}`}>
                <div className={`item ${css['counter-item']}`}>
                  {($_counter) ? <label>{counterStr}</label> : <span/>}
                </div>
              </div>
            </li>
            <li className={`item ${css['li']} ${css['bar']}`}>
              <div className={`ui secondary basic menu ${css['pmenu']}`}>
                {
                  (1 != $_pagination.index) ? prevPager.map((item) => ($$.Render.Anchor.renderPager(item, pagerMeta, dispatches.$_fn))) : ''
                }
                <div className={`item`}>{$_pagination.index}</div>
                {
                  ($_pagination.pages != $_pagination.index) ? nextPager.map((item) => ($$.Render.Anchor.renderPager(item, pagerMeta, dispatches.$_fn))) : ''
                }
                <div className={`item ${css['goto']}`}>
                  {
                    ($_goto) ? (
                        <form key="fmGoto" form="fmGoto" className={`ui mini action input ${css['goto']}`}
                              onSubmit={handleSubmit(dispatches.$_fnGoto.$_fnGoto($_cid, $_clean, $_pagination))}>
                          <Field name="index"
                                 type="text"
                                 component={dispatches.$_fnGoto.$_fnRender}
                                 normalize={dispatches.$_fnGoto.$_fnNormalize($_pagination.pages)}/>
                          <button type="submit" className={`ui blue button ${css['button']}`}>Go</button>
                        </form>
                      ) : false
                  }
                </div>
              </div>
            </li>
            <li className={`item ${css['li']} ${css['drop']}`}>
              {
                ($_dropdown) ? (
                    <div>
                      {$_dropdown.prefix}：
                      <select id="pgSizeBar" name="size"
                              className={`ui compact selection dropdown ${css['select']}`}
                              style={{width: "70px", minWidth: "70px"}}
                              onChange={dispatches.$_fnSize(dispatch, $_cid, $_clean)}>)
                        {
                          $_dropdown.options.map((item, idx) => (
                            <option className={`item ${css['options']}`} value={item} key={item}>{item}</option>))
                        }
                      </select>
                    </div>
                  ) : false
              }
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
export default mapping.multi(reduxForm({
  form: 'fmGoto'
})(Component), dispatches, {
  // List查询专用
  query: ['content', 'query'],
  // 数据信息
  $_data: ['content', 'data', 'list']
});
