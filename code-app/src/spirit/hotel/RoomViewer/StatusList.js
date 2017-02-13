import React from 'react'

import selector from './Selectors'
import css from './StatusList.scss'

import RoomItem from './RoomItem'

class Component extends React.Component{
  render(){
    const { tabular, $_current, assist } = this.props
    const status = selector.$_fnExtractStatus(tabular)
    let types = assist['room.types']
    types = types = (types.list && 0 < types.list.length)?types.list:[]
    return (
      <div className={`ui horizontal list ${css['list']}`}>
        {
          $_current.map((item) => {
            const key = `item${item.uniqueId}`;
            return (
              <div className={`item ${css['item']}`} key={key}>
                <RoomItem id={key} $_data={item} $_status={status} $_types={types}/>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Component
