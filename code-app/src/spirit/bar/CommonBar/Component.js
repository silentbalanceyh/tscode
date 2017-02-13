import React from 'react'

import dispatches from './Redux'
import css from './Component.scss'

class Component extends React.Component {

  componentDidMount(){
    jQuery('.clsDropDown').dropdown()
  }

  componentDidUpdate(){
    jQuery('.clsDropDown').dropdown()
  }

  render() {
    const {config, hidden = [], dynamic = [], active} = this.props
    /** 1.构造元数据 **/
    const {support = [], data} = config
    /** 2.左 **/
    const left = dispatches.$_fnMeta({support, data, hidden, dynamic, active}, 'LEFT')
    /** 3.右 **/
    const right = dispatches.$_fnMeta({support, data}, 'RIGHT')
    return (
      <div className={`ui menu ${css['menu']}`}>
        {
          left.map(item => (dispatches.$_fnRender(item)))
        }
        <div className="right icon menu">
          {
            right.map(item => (dispatches.$_fnRender(item)))
          }
        </div>
      </div>
    )
  }
}

export default Component
