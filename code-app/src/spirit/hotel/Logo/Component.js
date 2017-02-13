import React from 'react'
import Link from 'react-router/lib/Link'

import css from './Component.scss'

import PureSlice from '../../_assembly/PureSlice'
// ------------------------------------
// Class Definition
// ------------------------------------
class Component extends PureSlice {
  // ------------------------------------
  // 统一构造函数
  // ------------------------------------
  constructor(props) {
    super(props, 'hotel.Logo')
  }
  // ------------------------------------
  // Major Render Method
  // ------------------------------------
  render() {
    const { $_title } = this.props
    const { $_cid, $_pk } = this.props
    return super.romance(
      <li id={$_cid} data-id={$_pk} className={`item ${css['logo']}`}>
        <Link to="/htl/main/index">
          <i className="big white icon building"/>{$_title}
        </Link>
      </li>
    )
  }
}
// ------------------------------------
// React Specification
// ------------------------------------

Component.propTypes = {
  $_title: React.PropTypes.string.isRequired
}
export default Component
