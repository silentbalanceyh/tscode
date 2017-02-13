import React from 'react'
import mapping from '../../_internal/Redux'
import Link from 'react-router/lib/Link'
import $$ from '../../../seed'

class Component extends React.PureComponent {
  render() {
    const {meta = {}, config, selected} = this.props
    /** 1.监听变化处理selected **/
    meta.selected = selected
    /** 3.Handle构造 **/
    const handler = $$.Op.Button.rdxHandler(config, {meta});
    /** 4.Text设置 **/
    const {text, icon, show} = config.config;
    return (
      <Link id={config.cid} key={config.cid} className={`${meta.className} item`}
            style={{display:(show)?'inline-block':'none'}}
            onClick={handler}>
        {$$.Render.Field.jsxIcon(icon)}
        {text}
      </Link>
    )
  }
}

export default mapping.multi(Component, {},{
  selected:["content","uex","selected","row"]
});
