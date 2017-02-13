import React from 'react'
import Link from 'react-router/lib/Link'
import $$ from '../../../seed'
import css from './Component.scss'
import dispatches from './Redux'
import mapping from '../../_internal/Redux'

class Component extends React.PureComponent {
  render() {
    return (
      <div>
        <Link className={`link item ${css['item']}`}
              onClick={dispatches.$_fnEdit(this.props)}>
          {$$.Render.Field.jsxOto('edit',{ node:'Op' })}
          编辑
        </Link>
        &nbsp;&nbsp;
        <Link className={`link item ${css['item']}`}
              onClick={dispatches.$_fnRemove(this.props)}>
          {$$.Render.Field.jsxOto('delete',{ node:'Op' })}
          删除
        </Link>
      </div>
    )
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if (process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    data: React.PropTypes.any
  }
}

export default mapping.dispatch(Component, dispatches);
