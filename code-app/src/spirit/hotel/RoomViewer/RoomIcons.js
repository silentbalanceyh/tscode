import React from 'react'

import $$ from '../../../seed'

import selector from './Selectors'
import css from './RoomIcons'

class Component extends React.Component{

  render(){
    const { tabular } = this.props
    const current = selector.$_fnExtractStatus(tabular)
    return (
      <div className={`ui padded segments ${css['menu']}`}>
        <div className={`ui segment ${css['item']} ${css['header']}`}>
          <i className="inverted info icon"></i>图标说明
        </div>
        <div className={`ui segment ${css['item']} ${css['content']}`}>
          <div className="ui list">
          {
            current.map((item) => ($$.Render.IconItem.render(item, css['icon'])))
          }
          </div>
        </div>
      </div>
    )
  }
}

export default Component
