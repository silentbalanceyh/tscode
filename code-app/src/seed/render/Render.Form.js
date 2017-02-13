import React from 'react'
import Assert from '../assert'
import Tool from '../tool'
import Vector from '../vector'
import Immutable from 'immutable'

import PageList from './Render.PageList'
import css from './style/Order.scss'

class Form {
  /**
   * 专用渲染Order Form的Title信息
   * @param data
   */
  static renderOrder(data, meta = {}) {
    const {format = '', digit = 2} = meta.price
    const price = Tool.Format.string(format, Tool.Format.currency(data['amountActual'], digit))
    return (
      <div className="ui three column grid">
        <div className={`column ${css['serial']}`}>
          {meta.serial}：{data['serial']}
        </div>
        <div className={`center aligned column ${css['credence']}`}>
          {(data.credence) ? `${meta.credence}：${data['credence']}` : false}
        </div>
        <div className={`right aligned column ${css['price']}`}>
          {price}
        </div>
      </div>
    )
  }

  /**
   *
   * @param data
   * @param config
   * @param meta
   */
  static renderSubList(data = {}, columns = [], range, meta) {
    /** 1.提取Items专用数据 **/
    let listData = data.initialValues['$ITEMS$']?data.initialValues['$ITEMS$']:{}
    listData = listData[range.key]?listData[range.key]:[]
    /** 去掉color **/
    return (0 < columns.length) ? (
      <table className={`ui single line table`}>
        <thead>
        <tr className={`${css['header']}`}>
          {
            columns.map((item) => {
              const $item = Immutable.fromJS(item).toJS()
              if($item.style && $item.style.color){
                delete $item.style.color
              }
              return (
                <th style={$item.style} key={`header${$item.cid}`}>{$item.title}</th>
              )
            })
          }
        </tr>
        </thead>
        <tbody>
        {
          (0 < listData.length)?listData.map((row, idx) => (PageList.renderRow(row, columns, meta))):
            <tr><td colSpan={columns.length}>{range.empty}</td></tr>
        }
        </tbody>
      </table>
    ) : false
  }

  /**
   *
   * @param name
   * @param app
   * @param data
   * @param config
   * @param dispatch
   * @param status
   * @param failure
   * @returns {XML}
   */
  static render(name, configuration) {
    Assert.isString({name});
    Assert.isObject({configuration});
    Assert.isDefinedKey({configuration}, ['config']);
    const eblis = Vector.Form.eblis(configuration);

    const Component = Tool.UCA.uca(name);
    Assert.isFunction({Component});
    return (
      <Component {...eblis} isLoading={Tool.Loader.isLoading(eblis)}/>
    )
  }
}

export default Form
