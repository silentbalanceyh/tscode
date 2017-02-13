import React from 'react'

import css from './Component.scss'
import $$ from '../../../seed'
import PureContainer from '../../_assembly/PureContainer'
import {CommonBar} from '../../bar'

class Component extends PureContainer {
  // ------------------------------------
  // 默认构造函数
  // ------------------------------------
  constructor(props) {
    super(props, 'holder.SingleFormHolder')
  }
  // ------------------------------------
  // Component Valid Ensure
  // ------------------------------------
  componentWillMount() {
    $$.Tool.Flow.init(this.props, {force: true})
  }
  render() {
    /** Header部分 **/
    const {$_title, $_connect = {}} = this.props
    const {hidden, dynamic = []} = $_connect
    const {$_cid, $_pk, children} = this.props;
    /** Divide部分 **/
    const {$_left, $_right} = this.props
    /** Help部分 **/
    const {$_theme, $_steps = []} = this.props
    return super.romance(
      <main id={$_cid} key={$_pk} className={`ui basic segment ${css['content']}`}>
        <CommonBar config={$_connect} hidden={hidden} dynamic={dynamic} active={1}/>
        <div className={`ui two column grid ${css['top']}`}>
          <div className={`${$_left.adj} column ${css['left']} jsxContent`.trim()} style={$_left.style}>
            {children}
          </div>
          <div className={`${$_right.adj} column ${css['right']}`.trim()} style={$_right.style}>
            <div className={`ui raised segments ${css['container']}`}>
              <h6 className={`ui segment`}>
                {$$.Render.Field.jsxIcon('help', 'circular blue')}
                <div className={`ui tag ${$_theme.color} label`}>{$_title}</div>
              </h6>
              <div className={`ui segment`}>
                <div className="ui ordered list">
                  {
                    $_steps.map((item, idx) => {
                      return (
                        <div className={`item`} key={idx}>
                          <div className="header">{item.name}</div>
                          <div className={`${css['step']}`}>{item.message}</div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default Component
