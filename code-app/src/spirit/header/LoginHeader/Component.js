import React from 'react'

import css from './Component.scss'

import PureLayout from '../../_assembly/PureLayout'

class Component extends PureLayout{
  // ------------------------------------
  // 统一构造函数
  // ------------------------------------
  constructor(props) {
    super(props,'header.LoginHeader')
  }
  render(){
    const { $_cid, $_pk } = this.props

    return super.romance(
      <header id={$_cid} data-id={$_pk} className={css['bg']}/>
    )
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if(process.env.NODE_ENV === `development`) {

}

export default Component
