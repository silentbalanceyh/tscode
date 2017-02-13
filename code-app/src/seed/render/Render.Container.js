import React from 'react'

import Bridge from './Render.Bridge'
import Assert from '../assert'
import Tool from '../tool'
import Vector from '../vector'
import Logger from '../logger'

class Container {
  /**
   *
   * @param name
   * @param app
   * @param data
   * @param config
   * @param dispatch
   * @param status
   * @param failure
   */
  static render(item, configuration) {
    // 1.读取Component中的items
    Assert.isObject({item});
    Assert.isDefinedKey({item}, ['items', Tool.ID.CLIENT, 'name']);
    const items = item.items;
    const cid = item[Tool.ID.CLIENT];
    // 2.Eblis处理
    const timer = new Logger.Timer('Eblis Container', 'render(item,configuration)')
    timer.start()
    let eblis = Vector.Common.eblisContainer(configuration, cid);
    timer.end()
    timer.output(`cid = ${cid}`)

    // 3.读取UCA
    const Component = Tool.UCA.uca(item.name);
    Assert.isFunction({Component});
    if (items && 0 < items.length) {
      return (
        <Component {...eblis} isLoading={Tool.Loader.isLoading(eblis)}>
          {
            items.map((item) => (Bridge.render(item, configuration)))
          }
        </Component>
      )
    } else {
      return <div>Container component must contains children...</div>
    }
  }
}

export default Container
