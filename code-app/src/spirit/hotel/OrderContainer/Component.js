import React from 'react'

import $$ from '../../../seed'
import css from './Component.scss'
import dispatches from './Redux'
import render from './Render'
import mapping from '../../_internal/Redux'

import PureContainer from '../../_assembly/PureContainer'
import Toolbar from './Toolbar'

class Component extends PureContainer {
  // ------------------------------------
  // 默认构造函数
  // ------------------------------------
  constructor(props) {
    super(props, 'hotel.OrderContainer')
  }

  // ------------------------------------
  // Component Valid Ensure
  // ------------------------------------
  componentWillMount() {
    $$.Tool.Flow.init(this.props, {force: true})
  }

  render() {
    /** 1.field字段，op操作，etat状态 **/
    // const {children,$_connect} = this.props
    const children = dispatches.$_fnConnect(this.props)
    const meta = $$.Tool.Form.configData(this.props)
    /** 2.计算最上边的Auditor部分 **/
    const {$_auditor = []} = this.props
    /** 3.订单部分的元数据 **/
    const {$_meta = {}} = this.props
    /** 4.处理Order部分 **/
    const {$_flag} = this.props
    /** 5.Tab页专用 **/
    const {$_subactive = 0, $_subtab = {}} = this.props
    const {headers = []} = $_subtab
    /** 6.订单数据信息 **/
    const {$_data = {}} = this.props
    return super.romance(($$.Tool.Form.render(this.props)) ? (
        <div className={`ui basic segment ${css['container']}`}>
          {/** 当前操作者的Render **/}
          {render.$_fnOperator($_auditor, meta)}
          {/** Order对应的Title信息的Render **/}
          <div className={css['title']}>{$$.Render.Form.renderOrder($_data, $_meta)}</div>
          <h5 className={`ui dividing header ${css['header']}`}/>
          {/** Order信息本身的Render **/}
          {render.$_fnOrder($_flag, children["-1"])}
          {/** Tab页的Title对应的Render流程 **/}
          {Toolbar.$_fnTab(headers, $_subactive, meta, this.props)}
          {
            /** 分页执行Render流程 **/
            headers.map((item, idx) => {
              const key = `${$_flag}${idx}`
              const fnRender = render.Page[`${key}`]
              /** 查看fnRender是不是函数 **/
              return (fnRender) ? fnRender(children[String(idx)], {
                  item,
                  idx,
                  meta,
                  props: this.props
                }) : false
            })
          }
        </div>
      ) : $$.Tool.Loader.loader(this.props))
  }
}

export default mapping.redux(Component, dispatches)
