import React from 'react'
import Assert from '../assert'
import Tool from '../tool'
import Visitor from '../visitor'
import Vector from '../vector'
import Immutable from 'immutable'

class Slice{
  /**
   * 重新渲染Slice
   * @param config
   * @param across
   * @returns {XML}
   */
  static render(config,props = {}){
    /** 1.提取组件 **/
    const Component = Tool.UCA.uca(config.name)
    Assert.isFunction({Component})
    const eblis = Slice.eblis(config,props)
    return (
      <Component {...eblis}/>
    )
  }

  /**
   *
   * @param config
   * @param props
   */
  static eblis(config,props = {}){
    /** 2.从父节点数据中读取所需属性 **/
    const inherit = Slice.child(props,config.data)
    config = Visitor.visit(config)
    /** 3.当前配置需要添加horiz，已经传入了 **/
    let $config = Immutable.fromJS({})
    $config = $config.merge(Vector.Slice.eblisSlice(config,inherit))
    return $config.toJS()
  }

  /**
   * 处理child属性
   * @param props
   */
  static child(props,child = []){
    const data = {}
    child.forEach(key => {
      const dataKey = `$_${key}`
      data[key] = props[dataKey]
    })
    return data
  }
}

export default Slice
