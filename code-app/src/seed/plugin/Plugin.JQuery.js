import React from 'react'
import Render from '../render'
import Tool from '../tool'
import Plugin from '../plugin'

class JQuery {

  /** 设置下拉输出 **/
  static setOptions(config, data = [], selected) {
    const cid = config.cid
    /** 提取原来的值 **/
    const selector = `#${cid}`
    /** 设置选中项目 **/
    if (!selected && 0 < data.length) {
      selected = data[0][config.value]
    }
    /** jQuery设置 **/
    jQuery(selector).empty()
    /** 设置新的options，JQuery部分必须存在，否则节点中没有数据 **/
    const options = []
    let content = ""
    data.forEach(item => {
      const text = config.expr ? Tool.Format.expression(config.display, item) : item[config.display]
      const value = item[config.value]
      const name = text
      const option = {text, name, value}
      options.push(option)
      content += `<option value="${value}">${text}</option>`
    })
    jQuery(selector).html(content)
    /** Fix：动态设置Semnatic UI必备 **/
    jQuery(selector).dropdown('setup menu', {values: options})
    Plugin.Seman.dropdown(selector, selected)
    /** Redux事件触发 **/
    const {dispatch, form, name} = config
    const field = name
    const value = selected
    Plugin.ReduxForm.change(dispatch, {form, field, value})
  }

  /** **/
  static setOutput(output = [], data) {
    /** 提取output专用配置 **/
    if (data) {
      /** 设置值 **/
      output.forEach(item => {
        /** 设置值的逻辑 **/
        Render.AddOn.setOutput(item, data)
      })
    } else {
      output.forEach(item => {
        const id = item.id
        jQuery(`#${id}`).empty()
      })
    }
  }

  /** 设置初始值 **/
  static initValues(props, value) {
    /** 1.提取当前Form的field **/
    const {$_field = []} = props
    /** 2.当前值 **/
    $_field.forEach(field => {
      /** 3.Semantic UI专用选中代码 **/
      const selected = (value && value[field.name]) ? value[field.name] : jQuery(`#${field.cid}`).val();
      /** 4.反向赋值，解决字段的初始化加载问题 **/
      value[field.name] = selected
      if (selected) {
        if (Tool.Form.isDropdown(field.type)) {
          /** 5.最后设置选中项 **/
          Plugin.Seman.dropdown(`#${field.cid}`, selected)
        } else if (Tool.Form.isCheckbox(field.type)) {
          if ("on" == selected) {
            jQuery(`#${field.cid}`).val(false)
          }
        }
      }
    })
  }

  static mask() {
    return (
      <div key="TplMask" className={`ui container`}>
        <div id="jqMask" className="ui inverted dimmer jsxMask">
          <div className="content">
            <div className="ui text loader">
              数据加载中....
            </div>
          </div>
        </div>
      </div>
    )
  }

  static showMask() {
    if(process.env.NODE_ENV === `development`) {
      console.warn("Show Masker")
    }
    jQuery("#jqMask").removeClass('disabled')
    jQuery("#jqMask").addClass('active')
    // React JS专用
    return false

  }

  static hiddenMask(seconds = 0.6) {
    if(process.env.NODE_ENV === `development`) {
      console.warn("Hidden Masker")
    }
    setTimeout(() => {
      jQuery("#jqMask").removeClass('active')
      jQuery("#jqMask").addClass('disabled')
    }, seconds * 1000)
  }
}

export default JQuery
