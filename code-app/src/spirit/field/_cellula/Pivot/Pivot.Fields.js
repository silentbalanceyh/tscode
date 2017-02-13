import React from 'react'
import {Field} from 'redux-form'
import Immutable from 'immutable'
import css from './Pivot.scss'
import $$ from '../../../../seed'

import Iota from '../Iota/Iota'
import Lymph from '../Lymph/Lymph'
import Intra from './_internal/Intra'
/**
 *
 * @param input
 * @param touched
 * @param error
 * @param active
 * @param ref
 * @param config
 * @param index
 * @param bind
 * @returns {XML}
 */
const renderItem = ({input, meta:{touched, error, active}, config}) => {
  const {type, index, bind} = config
  const dft = config.default
  const render = Intra['field'][type]
  /** 1.计算组件 **/
  config.cid = `${config.name}${index}`
  const karyon = render(config, input)
  /** 2.计算Error Class **/
  const errorClass = Lymph.jsxField({touched, active, error})
  /** 3.只能使用inline模式 **/
  const errorStyle = Iota.calcError({array: true})
  return (
    <div className={`field ${css['item']}`}>
      <div className={`ui right icon input ${errorClass}`}>
        {karyon}{Lymph.jsxError({touched, active, error}, {errorStyle})}
        {(dft < (index + 1)) ?
          <i className="blue remove user link icon" onClick={bind}></i> : false}
      </div>
    </div>
  )
}
/**
 * 根据列信息执行Render流程
 * @param ridx
 * @param idx
 * @param column
 * @returns {boolean}
 */
const isRender = (ridx, idx, column) => {
  let render = false
  if (ridx == (Math.floor(idx / column))) {
    render = true
  }
  return render
}

const buildLabel = (config, idx) => {
  const {label} = config
  let jsxLabel
  if (0 == idx) {
    jsxLabel = (
      <label style={{minWidth: `76px`}}>
        {label}
        {Lymph.jsxAsterisk(config)}
      </label>
    )
  } else {
    jsxLabel = (
      <label style={{minWidth: `76px`}}>
      </label>
    )
  }
  return jsxLabel
}

class Fields {
  /**
   * 数组类型的字段处理
   * @param config
   * @param type
   * @param input
   * @param meta
   */
  static jsxFields({
    config,
    fields = [],
  }) {
    /**
     *  1.宽度计算
     *   1）如果多列，则根据99% / column计算每一列的宽度
     *   2）需要注意如果设置了range则表示当前这个field会跨行操作，结果会影响最终宽度
     */
    const style = Iota.calcWide(config)
    /**
     *  2.计算Fields信息，Array专用配置
     */
    const structure = $$.Tool.Format.toObject(config.items.component)
    let row = Math.ceil(fields.length / config.items.columns)
    /**
     *  3.构造columns
     * **/
    const rowArr = []
    for (let idx = 0; idx < row; idx++) {
      rowArr.push(idx)
    }
    /**
     *  4.防止无数据，保证至少有一行
     */
    if (0 == rowArr.length) {
      rowArr.push(0)
    }
    return (
      <div style={style}>
        {
          rowArr.map((ridx) => {
            let jsxLabel = buildLabel(config, ridx)
            return (
              <div className={`inline fields ${css['row']}`} key={`row${ridx}`}>
                {jsxLabel}
                {
                  fields.map((field, idx) => {
                    const render = isRender(ridx, idx, config.items.columns)
                    /** 动态表单Reset专用参数 **/
                    let $structure = Immutable.fromJS(structure)
                    $structure = $structure.set('default', config.items.default)
                    $structure = $structure.set('index', idx)
                    $structure = $structure.set('bind', () => fields.remove(idx))
                    /** Name用于Reset **/
                    $structure = $structure.set('name', config.name)
                    $structure = $structure.set('isArray',true)
                    return (render) ? (
                      <Field key={`item${ridx}${idx}`} name={`${field}.${config.name}`}
                             type={structure.type} config={$structure.toJS()}
                             component={renderItem}/>
                    ) : false
                  })
                }
                {(ridx == (rowArr.length - 1)) ?
                  <i className="blue add user link icon" onClick={() => (fields.push({}))}></i> : false}
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default Fields
