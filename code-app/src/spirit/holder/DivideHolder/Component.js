import React from 'react'

import css from './Component.scss'
import $$ from '../../../seed'
import dispatches from './Redux'
import mapping from '../../_internal/Redux'
import PureContainer from '../../_assembly/PureContainer'

class Component extends PureContainer {
  // ------------------------------------
  // 默认构造函数
  // ------------------------------------
  constructor(props) {
    super(props, 'holder.DivideHolder')
  }
  // ------------------------------------
  // Component Valid Ensure
  // ------------------------------------
  componentWillMount() {
    $$.Tool.Flow.init(this.props, {force: true})
  }
  render() {
    /** Header部分 **/
    const {$_title, $_icon} = this.props
    const {$_cid, $_pk, children} = this.props;
    /** Divide部分 **/
    const {$_left, $_right} = this.props
    /** List右边部分 **/
    return super.romance(
      <main id={$_cid} key={$_pk} className={`ui basic segment ${css['content']}`}>
        <h4 className={`ui dividing header ${css['header']}`}>
          {$$.Render.Field.jsxIcon($_icon)}
          {$_title}
        </h4>
        <div className={`ui two column grid ${css['top']}`}>
          <div className={`${$_left.adj} column ${css['left']}`.trim()} style={$_left.style}>
            {(0 < children.length)?children[0]:false}
          </div>
          <div className={`${$_right.adj} column ${css['right']}`.trim()} style={$_right.style}>
            <div className={`ui list ${css['list']}`}>
              {
                children.map((item, idx) => ((0 < idx) ? <div className="item" key={`item${idx}`}>{item}</div> : false))
              }
            </div>
          </div>
        </div>
      </main>
    )
  }
}

export default mapping.dispatch(Component,dispatches);
