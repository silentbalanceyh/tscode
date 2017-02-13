import React from 'react'
import Field from './Render.Field'

class IconItem{
  /**
   * Icon List中的单个Icon设置
   * @param item
   */
  static render(item,css){
    const { config = {}} = item;
    /** 必须包含Icon **/
    if(config && config.icon){
      return <div className={`item ${css}`} key={item.code}>
        {Field.jsxIcon(config.icon)}{item.name}
      </div>
    }else{
      return ''
    }
  }
}

export default IconItem
