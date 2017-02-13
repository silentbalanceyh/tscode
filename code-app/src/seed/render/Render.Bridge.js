import React from 'react'
import Container from './Render.Container'
import Leaf from './Render.Leaf'
import Immutable from 'immutable'
import Assert from '../assert'
import Facade from '../facade'

class Bridge {

  static render(item, configuration) {
    Assert.isArrayObject({item, configuration});
    const config = Immutable.fromJS(configuration);
    let Component;
    if (Facade.isContainer(item)) {
      // Container -- 容器的渲染
      Component = Container.render(item, config.toJS());
    } else {
      // Leaf -- 子节点的渲染
      Component = Leaf.render(item, config.toJS());
    }
    return Component
  }
}

export default Bridge;
