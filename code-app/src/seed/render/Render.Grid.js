import React from 'react'
import Semantic from './Render.Semantic'
import Assert from '../assert'

class Grid {

  static renderColumns({column, content}, children) {
    Assert.isArray({column});
    return column.map((item, idx) => {
      /** 计算Css **/
      let className = ''
      if (item) {
        className = `${Semantic.number(item.wide)} wide column`;
      } else {
        className = 'column'
      }
      /** 判断是否处理Content **/
      if (content == idx) {
        return (<div className={className} key={`col${idx}`} style={item.style}>{children}</div>)
      } else {
        return (<div className={className} key={`col${idx}`} style={item.style}/>)
      }
    })
  }
}

export default Grid;
