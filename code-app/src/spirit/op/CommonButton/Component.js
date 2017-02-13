import React from 'react'

import $$ from '../../../seed'

class Component extends React.PureComponent{
  render(){
    const {
      handleSubmit,
      reset,
      pristine,
      submitting,
      config,
      meta,
    } = this.props
    /** 1.Status构造 **/
    const status = $$.Op.Button.rdxStatus(config,{ pristine, submitting });
    /** 2.Class Name构造 **/
    const className = `${$$.Op.Button.rdxUI(config.config)}`;
    /** 3.Handle构造 **/
    const handler = $$.Op.Button.rdxHandler(config,{ handleSubmit, reset, meta });
    /** 4.Text设置 **/
    const {text,show} = config.config;
    if(meta) config.config.meta = meta
    return (
      <button id={config.cid} className={className} style={{display:(show)?'inline-block':'none'}}
        type="button"
        disabled={status}
        onClick={handler}>
        {text}
      </button>
    )
  }
}

export default Component
