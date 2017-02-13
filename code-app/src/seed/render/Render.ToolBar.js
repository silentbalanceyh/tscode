import React from 'react'
import Assert from '../assert'
import Tool from '../tool'
import Vector from '../vector'

class ToolBar {
  /**
   * 专用
   * @param name
   * @param configuration
   */
  static render(name, configuration = {}){
    Assert.isString({name});
    Assert.isObject({configuration});
    Assert.isDefinedKey({configuration}, ['config']);
    const eblis = Vector.ToolBar.eblis(configuration);
    const Component = Tool.UCA.uca(name);
    Assert.isFunction({Component});
    return (
      <Component {...eblis}/>
    )
  }
}

export default ToolBar
