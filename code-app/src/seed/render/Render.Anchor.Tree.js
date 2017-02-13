import React from 'react'
import Link from 'react-router/lib/Link'
import Assert from '../assert'
import Adom from '../adom'
import Tool from '../tool'
import Plugin from '../plugin'

import Op from '../op'
import Immutable from 'immutable'

import style from './style/Tree.scss'

const callback = (item) => {
  /** 1.菜单本身显示隐藏 **/
  const display = jQuery(`#submenu${item.uniqueId}`).css("display")
  if (display == "block") {
    jQuery(`#submenu${item.uniqueId}`).css("display", "none")
    jQuery(`#icon${item.uniqueId}`).prop('src', Plugin.Icon.Tree['folder open'])
    jQuery(`#icon${item.uniqueId}`).prop('src', Plugin.Icon.Tree['folder'])
  } else {
    jQuery(`#submenu${item.uniqueId}`).css("display", "block")
    jQuery(`#icon${item.uniqueId}`).prop('src', Plugin.Icon.Tree['folder'])
    jQuery(`#icon${item.uniqueId}`).prop('src', Plugin.Icon.Tree['folder open'])
  }
}

class Tree {
  /**
   * 计算整颗树
   * @param item
   * @param meta
   * @param text
   * @param path
   * @param inject
   */
  static renderTree(item, meta) {
    Assert.isObject({meta});
    /** 1.处理items **/
    const {items = []} = item
    const sbarIds = []
    items.forEach(item => {
      sbarIds.push(item.uniqueId)
    })
    /** 2.读取Expand **/
    let menuStyle = {display: "none"}
    let expand = false
    if(item.script && "EXPAND" == item.script){
      const $sbarIds = Immutable.fromJS(sbarIds)
      if($sbarIds.contains(meta.item.sidebar)){
        expand = true
        menuStyle = {}
      }
    }
    /** 3.构造Class **/
    return (0 == items.length) ? (Tree.item(item, meta, true, true)) : (
        <div key={`menu${item.uniqueId}`} className={`${style['item']} item`}>
          <Link to="#" ref={item.uniqueId} onClick={Op.Anchor.click(callback, item)} className={style['item']}>
            {(expand) ?
              <img id={`icon${item.uniqueId}`} className="vicon" src={`${Plugin.Icon.Tree['folder open']}`}/> :
              <img id={`icon${item.uniqueId}`} className="vicon" src={`${Plugin.Icon.Tree['folder']}`}/>}
            {item.text}
          </Link>
          <div id={`submenu${item.uniqueId}`} className="menu subitem jsxTreeItem" style={menuStyle}>
            {
              items.map(item => (Tree.item(item, meta, true, true)))
            }
          </div>
        </div>
      )
  }

  /**
   *
   * @param item
   * @param css
   * @param text
   * @param attrs
   * @returns {XML}
   */
  static item(item, meta, append, leaf = false) {
    /** 1.计算Active，这个过程只在Root节点处理 **/
    const active = {active: meta.item.active}
    active.sidebar = item.uniqueId
    const {uri} = item
    /** 2.Active处理 **/
    if (uri) {
      item.uri = `/${meta.path}${uri}${Tool.Builder.buildParams(active)}`
    }
    /** 3.计算className **/
    const itemCss = (leaf) ? style['leaf'] : meta.item.css
    // let className = Adom.Active.active(item, meta.item.sidebar, itemCss)
    let className = `item ${itemCss} jsxLeaf`
    return (
      <Link className={className} id={`sideitem${item.uniqueId}`} key={item.name} to={item.uri}>
        <img className={`vicon`} src={`${Plugin.Icon.Tree['item']}`}/>{(append) ? `${item.text}` : item.text}
      </Link>
    )
  }
}

export default Tree
