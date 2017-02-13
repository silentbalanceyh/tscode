import React from 'react'
import Bridge from './Render.Bridge'
import Assert from '../assert'

class Content {

  static cubes(ui, config) {
    Assert.isArray({ui});
    Assert.isObject({config});
    // 2.UI中只有一个元素
    const item = ui[0];
    // 3.全局Mask，在Container中添加Mask标记，仅针对根节点
    return Bridge.render(item, config)
    /**
    if (0 == ui.length) {
      // 1.UI没有读取到，Error
      return <div>No UI has been configured...</div>
    } else if (1 == ui.length) {
      // 2.UI中只有一个元素
      const item = ui[0];
      // 3.全局Mask，在Container中添加Mask标记，仅针对根节点
      return Bridge.render(item, config)
    } else {
      return <div>Root UI should not be multi...</div>
    }**/
  }
}

export default Content
