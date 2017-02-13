import React from 'react'
import Assert from '../assert'
import Tool from '../tool'
import Vector from '../vector'

class Direct {

  static render(name, configuration) {
    Assert.isString({name});
    Assert.isObject({configuration});
    // 2.最终渲染
    const Component = Tool.UCA.uca(name);
    Assert.isFunction({Component});
    let eblis = Vector.Common.eblisLeaf(configuration)
    // 3.终端Loading
    return (
      <Component {...eblis} isLoading={Tool.Loader.isLoading(eblis)}/>
    )
  }
}

export default Direct
