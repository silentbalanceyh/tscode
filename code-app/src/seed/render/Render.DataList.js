import React from 'react'
import Assert from '../assert'
import Tool from '../tool'
import Vector from '../vector'

class DataList{
  /** Data List Render **/
  static render(name,configuration){
    Assert.isString({name});
    Assert.isObject({configuration});
    Assert.isDefinedKey({configuration},['config']);
    const eblis = Vector.DataList.eblis(configuration)
    // 4.最终渲染
    const Component = Tool.UCA.uca(name);
    Assert.isFunction({Component});
    return (
      <Component {...eblis} isLoading={Tool.Loader.isLoading(eblis)}/>
    )
  }
}

export default DataList
