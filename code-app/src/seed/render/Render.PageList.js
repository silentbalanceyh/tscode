import React from 'react'
import Tool from '../tool'
import Assert from '../assert'
import css from './style/PageList.scss'
import Vector from '../vector'
import Render from '../render'

const calcMonitor = (config = [], data) => {
    if(0 < config.length){
      const monitor = {}
      config.forEach(field => {
        const value = data[field]
        if(value){
          monitor[field] = value
        }
      })
      if(0 < Object.keys(monitor).length){
        return monitor
      }
    }
}

class PageList {
  /** Page List的render方法 **/
  static render(name, configuration){
    Assert.isString({name});
    Assert.isObject({configuration});
    Assert.isDefinedKey({configuration}, ['config']);
    const eblis = Vector.PageList.eblis(configuration)
    // 4.最终渲染
    const Component = Tool.UCA.uca(name);
    Assert.isFunction({Component});
    return (
      <Component {...eblis} isLoading={Tool.Loader.isLoading(eblis)}/>
    )
  }
  /** 渲染排序头 **/
  static renderSort(column, query = {}, fnSort) {
    const {orders} = query;
    /** 1.读取当前排序 **/
    const current = orders.filter((item) => item[column.field]);
    /** 2.构造jsx **/
    let sortIcon;
    let flag;
    if (0 < current.length) {
      const item = current[0];
      if ("ASC" == item[column.field].toUpperCase()) {
        sortIcon = Render.Field.jsxOto('up',{ node:'List' })
        flag = "DESC";
      } else {
        sortIcon = Render.Field.jsxOto('down',{ node:'List' })
        flag = "ASC";
      }
    } else {
      flag = "ASC";
    }
    const style = Object.assign({float: "left", width: "80%"}, column.style);
    if(style.color) delete style.color
    return (
      <th key={column.cid}
          onClick={fnSort({
            field: column.field,
            value: flag
          })} style={{
        paddingRight: "0.5em",
        paddingLeft: "0.5em"
      }}>
        <div style={style}>
          {column.title}&nbsp;&nbsp;
          {(sortIcon) ? sortIcon : ''}
        </div>
        <div style={{float: "right"}}>
          <i className="dropdown icon"></i>
        </div>
      </th>
    )
  }

  /** Header **/
  static renderHeader(column, query = {}, fnSort) {
    /** 1.当前列是否支持排序 **/
    const sort = column.sort ? column.sort : false;
    /** 2.提取Title **/
    const title = column.title ? column.title : '';
    /** 3.渲染 **/
    const style = Object.assign({cursor:"default"},column.style);
    /** 4.Header部分不考虑字体颜色 **/
    if(style.color) delete style.color
    return (sort) ? (PageList.renderSort(column, query, fnSort)) : (
      <th key={column.cid} style={style}>
        {title}
      </th>
    )
  }

  /** Rows **/
  static renderRow(data, columns, meta = {}) {
    const {
      row,
      selected,
      tabular,
      assist,
      cid,
      reload,
      renew
    } = meta
    const active = (selected == data.uniqueId)?'active':'';
    /** 1.处理每一个单元格 **/
    return (
      <tr key={`row${data.uniqueId}`} className={active}>
        {
          columns.map((config) => {
            // 1.生成key
            const key = `${config.cid}${row}${data.uniqueId}`;
            // 2.提取字段数据
            const cellData = data[config.field];
            // 3.提取组件
            const Cell = Tool.UCA.uca(config.type);
            Assert.isFunction({Cell});

            const params = {}
            if(tabular) params.tabular = tabular
            if(assist) params.assist = assist
            // 4.查看是否开启了monitor，开启的情况下需要将monitor数据提取出来注入到Cell中
            const monitor = calcMonitor(config.monitor,data)
            if(monitor) params.monitor = monitor
            if(reload) params.reload = reload
            if(renew) params.renew = renew
            // 是否包含了inputes数据，用于抓取Redux Form中的inputes对应数据
            if(meta.monitor) params.inputes = meta.monitor
            // params.selected = selected
            return (config)?(
              <td key={key} style={config.style} className={css['cell']}>
                <Cell cid={key} config={config} row={row} target={cid} data={cellData} {...params}/>
              </td>
            ):(<td key={key} className={css['cell']}></td>)
          })
        }
      </tr>
    )
  }
}

export default PageList
