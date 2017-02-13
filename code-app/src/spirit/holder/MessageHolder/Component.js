import React from 'react'

import css from './Component.scss'
import $$ from '../../../seed'
import dispatches from '../../_shared/ModuleInit'
import mapping from '../../_internal/Redux'
import PureContainer from '../../_assembly/PureContainer'
// ------------------------------------
// Class Definition
// ------------------------------------
class Component extends PureContainer {
  // ------------------------------------
  // 默认构造函数
  // ------------------------------------
  constructor(props){
    super(props,'holder.MessageHolder')
  }
  // ------------------------------------
  // Component Valid Ensure & Init
  // ------------------------------------
  componentWillMount() {
    $$.Tool.Flow.init(this.props)
  }
  // ------------------------------------
  // Major Render Method
  // ------------------------------------
  render() {
    const { $_title, $_icon, $_brief, $_messages = [] } = this.props
    const { $_cid, $_pk, children } = this.props;

    return super.romance(
      <main id={$_cid} key={$_pk} className={`ui basic segment ${css['content']}`}>
        <h4 className={`ui dividing header ${css['header']}`}>
          {$$.Render.Field.jsxIcon($_icon)}
          {$_title}
        </h4>
        <div className={`ui list ${css['list']}`}>
          <div className="item">
            <div id={$_cid} data-id={$_pk} className={`ui message ${css['top']}`}>
              <h5 className="small header">
                <i className="info icon"></i>
                {$_brief}
              </h5>
              <ul className="list">
                {
                  $_messages.map((item, idx) => (<li key={`msgItem${idx}`}>{item}</li>))
                }
              </ul>
            </div>
          </div>
          {
            children.map((item, idx) => (<div className="item" key={`content${idx}`}>{item}</div>))
          }
        </div>
      </main>
    )
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if(process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    $_title: React.PropTypes.string.isRequired,
    $_icon: React.PropTypes.string
  }
}
export default mapping.dispatch(Component,dispatches);
