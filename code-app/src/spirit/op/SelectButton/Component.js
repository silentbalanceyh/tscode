import React from 'react'

import $$ from '../../../seed'
import connect from '../../_internal/Redux'
import dispatches from './Redux'

class Component extends React.PureComponent{
  render(){
    const {
      pristine,
      submitting,
      config
    } = this.props
    /** 1.Status构造 **/
    const status = $$.Op.Button.rdxStatus(config,{ pristine, submitting });
    /** 2.Class Name构造 **/
    const className = `${$$.Op.Button.rdxUI(config.config)}`;
    /** 3.Text设置 **/
    const {text} = config.config;
    return (
      <button id={config.cid} className={className}
        type="button"
        disabled={status}
        onClick={dispatches.$_fnHandler(this.props)}>
        {text}
      </button>
    )
  }
}

export default connect.single(Component,["content","uex","selected"],dispatches,"selected")
