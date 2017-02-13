import React from 'react'
import $$ from '../../../../seed'
import Neuron from '../Neuron/Neuron'
import Iota from '../Iota/Iota'
import Marrow from '../Neuron/Marrow'
import css from './Immune.scss'
import Tree from '../Neuron/Tree'
// ======================================================
// 第三方时间日期专用
// ======================================================
class Immune {
  /**
   * Tabular专用下拉
   * @param config
   * @param input
   */
  static jsxTabular(config, input) {
    $$.Logger.Input.field(config, 'jsxTabular')
    const {style = {}} = config
    config.options = Iota.options(config, 'tabular')
    config.className = `${config.className} jsxSelect`.trim()
    return (
      <div className={`ui mimi input ${config.className}`} style={style}>
        {config.tabular ? Neuron.jsxSelect(config, input) : false}
      </div>
    )
  }

  /**
   * 渲染日期信息
   * @param config
   * @param input
   */
  static jsxDate(config, input) {
    $$.Logger.Input.field(config, 'jsxDate')
    const {style = {}, icon, position} = config
    config.className = `${config.className} jsxIcon`.trim()
    return (
      <div className={`ui ${icon ? `${position} icon` : false} input`} style={style}>
        {Marrow.jsxDate(config, input)}
        {$$.Render.Field.jsxIcon(icon, '', config.cid)}
      </div>
    )
  }

  /**
   * 渲染颜色信息
   * @param config
   * @param input
   */
  static jsxColor(config, input) {
    $$.Logger.Input.field(config, 'jsxColor')
    const {style = {}, icon, position} = config
    config.className = `${config.className} jsxIcon`.trim()
    return (
      <div className={`ui ${icon ? `${position} icon` : false} input`} style={style}>
      {Marrow.jsxColor(config, input)}
    {$$.Render.Field.jsxIcon(icon, '', config.cid)}
  </div>
  )
  }

  /**
   * 渲染树型
   * @param config
   * @param input
   */
  static jsxTreeSelector(config, input) {
    $$.Logger.Input.field(config, 'jsxTreeSelector')
    const {style = {}, icon, position} = config
    config.className = `${config.className} jsxIcon`.trim()
    return (
      <div className={`ui ${icon ? `${position} icon` : false} input`} style={style}>
        {Tree.jsxTreeSelector(config, input)}
        {$$.Render.Field.jsxIcon(icon, '', config.cid)}
      </div>
    )
  }

  /**
   * 渲染纯的Input
   * @param config
   * @param input
   */
  static jsxPure(config, input) {
    $$.Logger.Input.field(config, 'jsxPure')
    const {style = {},range = {}} = config
    /**
     * Fix：修正没有Icon的时候边框无法对齐的问题，15.25em属于特殊设置，主要针对于所有组件对齐
     * @type {string}
     */
    if(1 < range.columns){
      /** 单行跨列文本 **/
      config.className = `${config.className} jsxMulti${range.columns}`.trim()
    }else {
      config.className = `${config.className} jsxPure`.trim()
    }
    return (
      <div className={`ui mimi input`} style={style}>
        {Neuron.jsxInput(config, input)}
      </div>
    )
  }

  /**
   * 渲染Input file
   * @param config
   * @param input
   */
  static jsxFile(config, input) {
    $$.Logger.Input.field(config, 'jsxFile')
    const {style = {}} = config
    /**
     * Fix：修正没有Icon的时候边框无法对齐的问题，15.25em属于特殊设置，主要针对于所有组件对齐
     * @type {string}
     */
    if (!style['width']) {
      /** 不带width时的默认最小width **/
      style['minWidth'] = "14.21em"
    }
    return (
      <div className={`ui mimi input`} style={style}>
      {Neuron.jsxFile(config, input)}
  </div>
  )
  }

  /**
   * Selector
   * @param config
   * @param input
   * @returns {XML}
   */
  static jsxSelector(config, input) {
    $$.Logger.Input.field(config, 'jsxSelector')
    $$.Assert.isDefinedKey({config}, ['icon'])
    const {position = 'left', icon, style = {}, asyncValidating} = config
    config.className = `${config.className} jsxIcon`.trim()
    return (
      <div className={`ui mini ${icon ? `${position} icon` : false} ${asyncValidating ? 'async-validating' : ''} input`}
           style={style}>
        {Neuron.jsxInput(config, input)}
        {$$.Render.Field.jsxIcon(icon, 'large', `icon-${config.cid}`, config.click)}
      </div>
    )
  }

  /**
   * 渲染Icon Text Box（带图标）
   * @param config
   * @param input
   */
  static jsxIcon(config, input) {
    $$.Logger.Input.field(config, 'jsxIcon')
    $$.Assert.isDefinedKey({config}, ['icon'])
    const {position = 'left', icon, style = {}} = config
    config.className = `${config.className} jsxIcon`.trim()
    return (
      <div className={`ui mini ${icon ? `${position} icon` : false} input`} style={style}>
        {Neuron.jsxInput(config, input)}
        {$$.Render.Field.jsxIcon(icon, 'large')}
      </div>
    )
  }

  /**
   * 渲染Label Text Box（带单位）
   * @param config
   * @param input
   */
  static jsxUnit(config, input) {
    $$.Logger.Input.field(config, 'jsxUnit')
    $$.Assert.isDefinedKey({config}, ['unit'])
    const {position = 'right', unit, style = {}} = config
    if(!style['width']) {
      config.className = `${config.className} jsxUnit`.trim()
    }
    return (
      <div className={`ui mini ${position} labeled input ${config.className}`} style={style}>
        {('left' == position) ? <div className={`ui label`}>{unit}</div> : false}
        {Neuron.jsxInput(config, input)}
        {('right' == position) ? <div className={`ui label`}>{unit}</div> : false}
      </div>
    )
  }

  /**
   * 渲染 checkbox Input
   * @param config
   * @param input
   */
  static jsxCheck(config, input) {
    $$.Logger.Input.field(config, 'jsxCheck')
    const {style = {}} = config
    /**
     * Fix：修正没有Icon的时候边框无法对齐的问题，15.25em属于特殊设置，主要针对于所有组件对齐
     * @type {string}
     */
    config.className = `${config.className} jsxCheck`.trim()
    return (
      <div className={`ui mini checkbox ${css['checkbox']} ${config.className}`} style={style}>
        {Neuron.jsxInput(config, input)}<label/>
      </div>
    )
  }
}

export default Immune
