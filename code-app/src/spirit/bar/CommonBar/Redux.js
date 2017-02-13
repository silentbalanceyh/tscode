import React from 'react'

import meta from './Meta.json'
import $$ from '../../../seed'
import Immutable from 'immutable'
import css from './Component.scss'

import Random from 'random-js'

const $_fnClick = (id) => {
  return () => {
    if(jQuery(`#${id}`)[0]) {
      jQuery(`#${id}`)[0].click()
    }else{
      console.warn(`Element of id = ${id} could not be found in current page`)
    }
  }
}

const $_fnKey = () => {
  const engine = Random.engines.mt19937().autoSeed()
  return Random.string()(engine, 8)
}

const $_fnMeta = ({support = [], data = {}, hidden = [], dynamic = [], active}, position = "LEFT") => {
  const $support = Immutable.fromJS(support)
  const $filter = Immutable.fromJS(hidden)
  const result = []
  /** 先处理Support **/
  for (const key in meta[position]) {
    /** 检测到Connect，注入Dynamic的位置 **/
    if ("CONNECT" == key) {
      let $tabIndex = meta[position][key]
      dynamic.forEach(item => {
        /** 生成随机的key **/
        const target = Immutable.fromJS(item).toJS()
        target.key = $_fnKey()
        target.defined = true
        /** 重写tabIndex，特殊配置，用于配置当前按钮在哪个Tab页生效 **/
        if(target.active) $tabIndex = target.active
        if ($tabIndex == active) {
          target.click = $_fnClick(item.id)
        } else {
          target.distext = `disabled`
          target.disicon = css['disicon']
        }
        result.push(target)
      })
    } else {
      const itemData = data[key]
      const item = Immutable.fromJS(meta[position][key]).toJS()
      /** 额外配置 **/
      let id = '';
      if(itemData) {
        if ("string" != typeof(itemData)) {
          item.text = itemData.text
          item.icon = itemData.icon
          id = itemData.id
        } else {
          id = itemData
        }
      }
      item.key = key
      if (!$support.contains(key)) {
        item.distext = `disabled`
        item.disicon = css['disicon']
      } else {
        item.click = $_fnClick(id)
      }
      if (!$filter.contains(key)) {
        result.push(item)
      }
    }
  }
  return result;
}

const $_fnLink = (item = {}, node) => {
  const {icon, text, iconCls, textCls, click, key} = item
  return (
    <div className={textCls} key={key} onClick={(click) ? click : false}>
      {$$.Render.Field.jsxOto(icon, {
        node, className: iconCls
      })}
      {text}
    </div>
  )
}

const $_fnRender = (item = {}) => {
  const itemCls = `item ${css['item']}`
  if (item.defined) {
    item.iconCls = (item.disicon) ? `${item.disicon}` : ''
    /** 非菜单类型 **/
    if (item.id) {
      item.textCls = (item.distext) ? `${item.distext} ${itemCls}` : `link ${itemCls}`
    }
    return (item.id) ? ($_fnLink(item)) : (
        <div className={`ui dropdown item clsDropDown ${(item.distext) ? `${item.distext}` : ''}`} key={item.key}>
          {$$.Render.Field.jsxOto(item.icon, {
            className: item.iconCls
          })}{item.text}<i className="dropdown icon"></i>
          <div className={`menu ${css['barmenu']}`}>
            {
              (item.items) ? (
                  item.items.map(subitem => {
                    if (subitem.id) {
                      subitem.click = $_fnClick(subitem.id)
                    }
                    subitem.textCls = `link ${itemCls}`
                    subitem.key = $_fnKey()
                    return $_fnLink(subitem)
                  })
                ) : false
            }
          </div>
        </div>
      )
  } else {
    item.textCls = (item.distext) ? `${item.distext} ${itemCls}` : `link ${itemCls}`
    item.iconCls = (item.disicon) ? `${item.disicon}` : ''
    return $_fnLink(item, 'Op')
  }
}


export default {
  $_fnMeta,
  $_fnRender
}
