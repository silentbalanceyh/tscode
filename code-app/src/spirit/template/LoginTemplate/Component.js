import React from 'react'

import css from './Component.scss'
import mapping from '../../_internal/Redux'
import $$ from '../../../seed'

class Component extends React.PureComponent {

  render() {
    $$.Logger.Prop.template("template.LoginTemplate", this.props)
    const {
      children,
      $_title
    } = this.props;
    return (
      <div className={css['bg']}>
        <header className={css['header']}/>
        <div className={`ui three column stackable grid`}>
          <div className="row">
            <div className="column"/>
            <div className="column">
              <div className={`ui raised segments ${css['frame']}`}>
                <h4 className={`ui inverted segment ${css['title']}`}>
                  <i className="large icon building"/>
                  {$_title}
                </h4>
                {children}
              </div>
            </div>
            <div className="column"/>
          </div>
        </div>
      </div>
    )
  }
}

export default mapping.multi(Component, {}, {
  status: ['app', 'status'],
  $_title: ['app', 'config', 'title']
})
