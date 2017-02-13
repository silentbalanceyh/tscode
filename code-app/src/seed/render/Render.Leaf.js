import React from 'react'
import Form from './Render.Form'
import DataList from './Render.DataList'
import PageList from './Render.PageList'
import ToolBar from './Render.ToolBar'
import Direct from './Render.Direct'
import Assert from '../assert'
import Tool from '../tool'

const RENDERS = {
  "FORM": Form.render,
  "DATALIST": DataList.render,
  "PAGELIST": PageList.render,
  "TOOLBAR": ToolBar.render
}
/**
 * 子节点控件渲染
 */
class Leaf {
  /**
   * 读取配置信息
   * @param item
   * @param configuration
   * @returns {*}
   */
  static config(item, configuration) {
    Assert.isDefinedKey({item}, [Tool.ID.CLIENT, 'type']);
    const {config} = configuration
    return config[item[Tool.ID.CLIENT]];
  }

  static render(item, configuration) {
    Assert.isArrayObject({item, configuration});
    // 重写configuration
    configuration.config = Leaf.config(item, configuration);
    // 子节点容器：Form容器的渲染流程
    if (RENDERS[item.type]) {
      return RENDERS[item.type](item.name, configuration)
    } else {
      // 默认的都使用Direct的方式
      return Direct.render(item.name, configuration)
    }
  }
}
export default Leaf
