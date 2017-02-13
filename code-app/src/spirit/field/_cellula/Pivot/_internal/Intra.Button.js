import React from 'react'
import $$ from '../../../../../seed'

class Button {

  static view(config, input) {
    $$.Logger.Input.field(config, "jsxButton")
    /** 提取Component **/
    const { meta } = config
    let component
    if(meta.type){
      component = $$.Tool.UCA.uca(meta.type)
    }
    $$.Assert.isFunction({component})
    /** 提取参数 **/
    const ingest = config.ingest
    const params = {}
    params.type = meta.type
    params.assist = config.assist
    params.tabular = config.tabular
    params.selector = config.selector
    /** 构造函数 **/
    const jsFun = () => {
      $$.Dialog.Retort.dialog(component,{type:meta.type, ingest, selector:params})
    }
    return (<i className="blue search link icon" onClick={jsFun}></i>)
  }
}

export default Button
