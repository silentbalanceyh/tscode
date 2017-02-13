import React from 'react'

import css from './Neuron.scss'
import $$ from '../../../../seed'
/**
 * 设置选中项
 * @param input
 * @param options
 */
const $_fnSetSelect = (input = {}, options = [], config) => {
  /** Reset问题修正，添加不选中的情况 **/
  const selector = `#${config.cid}`
  if(config.clear){
    jQuery(selector).dropdown('clear')
  }else {
    console.assert(0 < options.length)
    if (input.multiple) {
      input.value = input.value || []
    } else {
      if (!input.value) {
        input.value = options[0].value
      }
    }
    $$.Plugin.Seman.dropdown(selector,input.value)
  }
}
/**
 * 修复onChange事件的卡顿问题
 * @param input
 * @returns {function(*=)}
 */
const $_fnSetChange = (input, type, normalize) => {
  return (event) => {
    /** 有焦点的时候不执行Change，没有焦点时再执行 **/
    const focus = jQuery(event.target).is(":focus")
      || jQuery(event.target).is(":focus")
    if (!focus) {
      input.onChange(event)
    }
    /** 修正Number Box的问题 **/
    if (normalize) {
      event.target.value = normalize(event.target.value)
    }
  }
}
/**
 * 在处理onChange事件过程中导致的Reset不可用
 * @param input
 */
const $_fnSetValue = (input, config) => {
  /** 设置输入值，得到Selector **/
  const selector = `#${config.cid}`
  /** CheckBox 选中 **/
  if ("checkbox" == config.type) {
    /** Reset问题修正 **/
    jQuery(selector).val(input.value)
    if (true == input.value){
      jQuery(selector).prop("checked", input.value)
    }
  }else if ("radio" == config.type){

  }else{
    /** Reset问题修正 **/
    jQuery(selector).val(input.value)
  }
}
class Neuron {
  /**
   *
   * @param config
   * @param input
   */
  static jsxSelect(config, input) {
    const {
      name, cid,
      readonly = false,
      style = {},
      options = [],
      hint,
      compact = false
    } = config
    let {className = ''} = config
    className = `${className} ${css['input']}`.trim()
    if (hint) input.placeholder = hint
    /** 针对multiple的转换 **/
    if(0 < options.length) {
      $_fnSetSelect(input, options, config)
    }
    /** 压缩Dropdown **/
    if(compact){
      className = `ui compact selection dropdown ${className}`
    }else{
      className = `ui selection dropdown ${className}`
    }
    return (
      <select id={cid}
              name={name}
              className={className}
              style={style}
              readOnly={readonly}
              {...input}>
        {
          options.map((item, idx) => (
            <option className={`item jsxItem`} value={item.value} key={`option${idx}`}>{item.display}</option>))
        }
      </select>
    )
  }

  /**
   * 用于渲染<input>标签
   * @param config
   * @param input
   */
  static jsxInput(config, input) {
    const {
      hint, name, cid,
      type = 'text',
      readonly = false,
      style, $_value
    } = config;
    let {className = ''} = config
    className = `${className} ${css['input']}`.trim()
    /** OnChange和Value绑定设置 **/
    $_fnSetValue(input, config)
    /** Hidden时用绑定 **/
    const meta = {}
    if (readonly) {
      meta['tabIndex'] = -1
    }
    /** Html Required，Fix修复异步同步同时验证的问题！ **/
    return (
      <input name={name}
             type={type}
             id={cid}
             placeholder={hint}
             readOnly={readonly}
             className={className}
             style={style}
             data-value={$_value}
             onChange={$_fnSetChange(input, type, config.normalize)}
             onBlur={input.onBlur}
             onFocus={input.onFocus}
             {...meta}/>
    )
  }

  /**
   * 用于渲染<input file>标签
   * @param config
   * @param input
   */
  static jsxFile(config, input) {
    const {
      hint, name, cid,
      type = 'file',
      readonly = false,
      multiple = 'multiple',
      style, $_value
    } = config;
    let {className = ''} = config
    className = `${className} ${css['input']}`.trim()
    /** OnChange和Value绑定设置 **/
    //$_fnSetValue(input, config)
    /** Hidden时用绑定 **/
    const meta = {}
    if (readonly) {
      meta['tabIndex'] = -1
    }
    /** Html Required，Fix修复异步同步同时验证的问题！ **/
    return (
    <input name={name}
    type={type}
    id={cid}
    readOnly={readonly}
    className={className}
    style={style}
    data-value={null}
    multiple={multiple}
    {...input}/>
  )
  }

  /**
   *
   * @param config
   * @param input
   */
  static jsxTextArea(config, input) {
    $$.Logger.Input.field(config, 'jsxTextArea')
    const {
      hint, name, cid,
      type = 'text',
      readonly = false,
      style = {}, $_value,
      range,
      className
    } = config;
    /** OnChange和Value绑定设置 **/
    $_fnSetValue(input, config)
    return (
      <textarea rows={range.lines}
                name={name}
                type={type}
                id={cid}
                placeholder={hint}
                readOnly={readonly}
                className={className}
                style={style}
                data-value={$_value}
                onChange={$_fnSetChange(input)}
                onBlur={input.onBlur}
                onFocus={input.onFocus}>
      </textarea>
    )
  }
}

export default Neuron
