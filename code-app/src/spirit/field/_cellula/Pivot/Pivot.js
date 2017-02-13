import React from 'react'
import Immutable from 'immutable'
import css from './Pivot.scss'
import $$ from '../../../../seed'

import Iota from '../Iota/Iota'
import Lymph from '../Lymph/Lymph'
import Intra from './_internal'
import Neuron from '../Neuron/Neuron'

import Fields from './Pivot.Fields'

class Pivot {
  /** Field字段连接 **/
  static jsxFields = Fields.jsxFields
  /** Option字段连接 **/
  static jsxOption({
    type,
    input
  }){
    return (
      <input type={type} {...input}/>
    )
  }
  /**
   * Label专用渲染
   * @param config
   * @param type
   * @param meta
   * @param input
   * @returns {XML}
   */
  static jsxLabel({
    // 1.数据中读取的直接配置
    config,
    type,
    // 2.Redux-Form使用的特殊属性
    input,
  }){
    /**
     * 1.宽度计算
     * 1）如果多列，根据 99% / column计算每一列的宽度
     * 2）如果设置了range则表示当前这个Field会跨行操作，影响最终宽度
     */
    const style = Iota.calcWide(config)
    /**
     * 分流处理，提取Render
     */
    const render = Intra['label'][type]
    $$.Assert.isFunction({render})
    const karyon = render(config,input)
    const { label } = config
    return (
      <div className={`inline field ${css['field']}`.trim()} style={style}>
        <label className={css['label']} style={Iota.labelWidth()}>
          {label}
        </label>
        {karyon}
      </div>
    )
  }
  /**
   * 搜索界面专用
   * @param config
   * @param type
   * @param input
   * @returns {XML}
   */
  static jsxFilter({
    // 1.数据中读取的直接配置
    config,
    type,
    // 2.Redux-Form使用的特殊属性
    input,
  }) {
    let $config = Immutable.fromJS(config)
    /** 0.提取Label信息 **/
    const {label} = config
    /** 2.处理type信息 **/
    $config = $config.set('type', type)
    /** 3.分流处理 **/
    const render = Intra['filter'][type]
    $$.Assert.isFunction({render})
    /** 4.处理Label对齐问题 **/
    const className = css[type] + ' ' + css['label']
    if ("hidden" != type) {
      const karyon = render($config.toJS(), input)
      return (
        <div className={`inline field`}>
          <label className={className}>{label}</label>
          {karyon}
        </div>
      )
    } else {
      $$.Logger.Input.field($config.toJS(), 'jsxHidden')
      return Neuron.jsxInput($config.toJS(), input)
    }
  }

  /**
   * 提交表单专用
   * @param config
   * @param type
   * @param meta
   * @param input
   * @returns {*}
   */
  static jsxField({
    // 1.数据中读取的直接配置
    config,
    type,
    // 2.Redux-Form使用的特殊属性
    meta,
    input
  }) {
    let $config = Immutable.fromJS(config)
    /** 0.处理ReadOnly **/
    $config = $config.merge(Iota.readOnly(config))
    /** 1.处理type信息，这个转换是必须的，从Redux到Html中的转换流程 **/
    const _type = $config.get('type');
    $config = $config.set('type', type)
    /** 2.隐藏不占行，所以需要单独提取出来 **/
    if ("hidden" != type) {
      /** 3.提取Label信息 **/
      const {label} = config
      /** 4.Redux Form专用 **/
      const {touched, error, active, asyncValidating} = meta
      const errorClass = Lymph.jsxField({touched, active, error})
      /** 5.分流处理 **/
      const render = Intra['field'][type]
      $$.Assert.isFunction({render})
      /** 6.读取组件信息 **/
      if (config.async) $config = $config.set('asyncValidating', asyncValidating)
      const karyon = render($config.toJS(), input)
      /**
       *  7.宽度计算
       *   1）如果多列，则根据99% / column计算每一列的宽度
       *   2）需要注意如果设置了range则表示当前这个field会跨行操作，结果会影响最终宽度
       */
      const style = Iota.calcWide(config)
      /**
       *  8.Error信息的位置计算
       *   1）非inline模式则直接使用inline默认值
       *   2）如果inline模式则直接使用inline默认值
       *   3）如果需要定制则设errorStyle
       */
      const errorStyle = Iota.calcError(config)
      /**
       *  9.是否开启了inline模式
       */
      const inline = (config.inline) ? `inline` : ''
      /**
       *  10.所有的Label最小宽度为72px，用于对齐双汉字、三汉字、四汉字的Label宽度
       *  @type {{minWidth: string}}
       */
      /**
       *  11.处理带有add-on配置的
       */
      const addons = config['add-on'];
      return (
        <div className={`${inline} field ${errorClass} ${css['field']}`.trim()} style={style}>
          <label className={css['label']} style={Iota.labelWidth()}>
            {label}
            {Lymph.jsxAsterisk(config)}
          </label>
          {karyon}{Lymph.jsxError({touched, active, error}, {errorStyle, tips: config.tips, type:_type })}
          {$$.Render.AddOn.jsxLabel(addons)}
          {$$.Render.AddOn.jsxHidden(addons)}
          {$$.Render.AddOn.jsxDrophint(addons)}
        </div>
      )
    } else {
      $$.Logger.Input.field($config.toJS(), 'jsxHidden')
      return Neuron.jsxInput($config.toJS(), input)
    }
  }
}

export default Pivot
