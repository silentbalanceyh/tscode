import React from 'react'
import Tool from '../tool'
import css from './style/AddOn.scss'

class AddOn{
  /** **/
  static jsxHidden(addons){
    return addons && addons.hidden ? <input name={addons.hidden} type="hidden" id={addons.hidden}/> : false
  }
  /** **/
  static jsxLabel(addons){
    return addons && addons.label ? <label id={addons.label.id} style={addons.label.style}/> : false
  }
  /** **/
  static jsxDrophint(addons){
    return addons && addons.drophint ? (
      <div id={`_hint${addons.drophint.id}`} tabIndex="1000" style={addons.drophint.style} className={`ui dropdown item`}>
        {addons.drophint.text}<i className="dropdown icon"/>
        <div className="menu" id={addons.drophint.id}></div>
      </div>
    ):false
  }
  /** **/
  static setOutput(item, data){
    const { config } = item
    if("string" == typeof(config)){
      const value = Tool.Format.expression(config,data)
      /** 设置值 **/
      if("hidden" == item.type){
        jQuery(`#${item.id}`).val(value)
      }
      if("label" == item.type){
        jQuery(`#${item.id}`).text(value)
      }
      if("drophint" == item.type){
        if(data.list && 0 < data.list.length && Array.prototype.isPrototypeOf(data.list)){
          jQuery(`#${item.id}`).empty()
          const format = `<div class="item ${css['view']}">{0}</div>`
          let content = ''
          content += Tool.Format.string(format,`首序号：${Tool.Format.expression(config,data.list[0])}`)
          /** 序号少的时候不显示...... **/
          if(2 < data.list.length){
            content += Tool.Format.string(format,`......`)
          }
          content += Tool.Format.string(format,`尾序号：${Tool.Format.expression(config,data.list[data.list.length - 1])}`)
          content += Tool.Format.string(format,`最大序号：${data.list.length + 1}`)
          jQuery(`#${item.id}`).html(content)
          jQuery(`#_hint${item.id}`).dropdown({
            action:"nothing"
          })
        }
      }
    }
  }
}

export default AddOn
