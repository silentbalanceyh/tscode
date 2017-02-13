import React from 'react'
import $$ from '../../seed'

const $_fnRow = (data, columns = [], row) => {
  return (
    <tr key={`row${data.uniqueId}`}>
      {
        columns.map((column, idx) => {
          // 1.生成key
          const key = `${column.field}${row}${idx}`
          // 2.提取字段数据
          const cellData = data[column.field];
          // 3.提取组件
          const Cell = $$.Tool.UCA.uca(column.type);
          $$.Assert.isFunction({Cell})
          // 4.提取配置
          const config = column.config
          return (
            <td key={key}>
              <Cell cid={key} config={config} data={cellData}/>
            </td>
          )
        })
      }
    </tr>
  )
}
/**
 * 选择过程
 * @param columns
 */
const $_fnSelect = (data = [], columns = [], linker = {}, {
  dispatch, form
}) => {
  /** 1.读取group **/
  let group = ""
  /** 2.遍历提取columns **/
  columns.forEach(column => {
    /** 3.配置读取 **/
    if (column && column.config) {
      const config = column.config
      if (config.group) {
        group = config.group
        return
      }
    }
  })
  /** 3.设置linker以及对应的值 **/
  return () => {
    /** 4.读取选中值 **/
    const value = jQuery(`input[name=${group}]:checked`).val()
    const selected = data.filter(item => item.uniqueId == value)
    console.assert(1 == selected.length)
    const record = selected[0]
    /** 5.遍历linker **/
    $$.Plugin.ReduxForm.linker({ form, dispatch}, linker, record)
  }
}
/** 构造搜索配置 **/
const $_fnSearch = (search = {}, component) => {
  /** 1.构造文字 **/
  const values = Object.values(search.config)
  const hint = $$.Tool.Format.join(values, '/')
  /** 2.提取TextBox的ID **/
  const id = search.input
  /** 3.构造Search函数 **/
  const click = $_fnCriteria(id, Object.keys(search.config), component)
  return {id, hint, click}
}

const $_fnPageClick = (component) => (index) => () => {
  /** 1.翻页操作 **/
  const state = component.state
  /** 2.设置index **/
  state.pager.index = index
  /** 3.将loaded设置为false **/
  state.loaded = false
  /** 4.设置状态更新 **/
  component.setState(state)
}

const $_fnState = (component, key, value) => {
  const $state = component.state
  $state[key] = value
  component.setState($state)
}

const $_fnCriteria = (id, fields = [], component) => {
  return () => {
    /** 0.修改loaded **/
    $_fnState(component, 'loaded', false)
    console.assert(0 < fields.length)
    const value = jQuery(`#${id}`).val()
    /** 1.构造查询条件 **/
    let criterias = {}, params = {};
    fields.forEach(field => {
      /** 2.构造查询条件 **/
      criterias[field] = {mode: 'ANYWHERE', op: 'LIKE'}
      /** 3.构造查询参数 **/
      params[field] = value
    })
    /** 4.生成查询参数 **/
    criterias = $$.Criteria.generate(criterias, params, false)
    /** 5.修改状态信息 **/
    $_fnState(component, 'criterias', criterias)
  }
}

const $_fnInit = (props) => {
  return {
    data: [], loaded: false,
    criterias: {},
    pager: props.query.pager,
    counter: {count: 0, pages: 1}
  }
}

export default {
  $_fnRow,
  $_fnSearch,
  $_fnInit,
  $_fnSelect,
  $_fnPageClick
}
