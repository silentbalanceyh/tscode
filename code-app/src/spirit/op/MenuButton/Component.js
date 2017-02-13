import React from 'react'
import Link from 'react-router/lib/Link'
import $$ from '../../../seed'

class Component extends React.PureComponent {
  render() {
    const {meta = {}, config} = this.props
    /** 3.Handle构造 **/
    const handler = $$.Op.Button.rdxHandler(config, {meta});
    /** 4.Text设置 **/
    const {text, icon} = config.config;
    return (
      <Link id={config.cid} key={config.cid} className={`${meta.className} item`}
            onClick={handler}>
        {$$.Render.Field.jsxIcon(icon)}
        {text}
      </Link>
    )
  }
}

export default Component
