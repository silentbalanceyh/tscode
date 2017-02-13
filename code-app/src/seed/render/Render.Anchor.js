import React from 'react'
import Link from 'react-router/lib/Link'
import Immutable from 'immutable'

import Assert from '../assert'
import Tool from '../tool'
import Op from '../op'
import Field from './Render.Field'

import Tree from './Render.Anchor.Tree'

class Anchor {
  /** **/
  static Tree = Tree
  /**
   * Pager工具栏
   * @param name
   * @param text
   * @param icon
   * @param code
   * @param inverted
   * @param dispatch
   * @param pagination
   * @param className
   * @param pager
   * @returns {XML}
   */
  static renderPager({
    name,
    text,
    icon = '',
    code = '',
    inverted = false
  }, meta, pager) {
    const callback = pager[code];
    Assert.isFunction({callback});
    return (
      <Link key={name} className={`${meta.className} item`} onClick={Op.Anchor.click(callback, meta)}>
        {(inverted) ? text : ''}
        {Field.jsxIcon(icon)}
        {(inverted) ? '' : text}
      </Link>
    )
  }

  /**
   * 渲染工具栏
   * @param name
   * @param text
   * @param icon
   * @param code
   * @param majorIcon
   * @param tab
   * @param dispatch
   * @returns {XML}
   */
  static renderTabOp(item, {
    dispatch,
    pages,
    className,
    cid,
    selected
  }, tab) {
    const {tabpage, icon, text, code, name} = item;
    const callback = tab[code];
    Assert.isFunction({callback});
    const page = pages[tabpage];
    let $item = Immutable.fromJS(item);
    $item = $item.set('page', page);
    $item = $item.set('dispatch', dispatch);
    return (
      <Link key={name} className={`${className} item`} onClick={Op.Anchor.click(callback, Object.assign({
        cid,
        selected
      }, $item.toJS()))}>
        {Field.jsxIcon(icon, 'large')}
        {text}
      </Link>
    )
  }
  /**
   * 一般的Link处理，非树形链接
   * @param item
   * @param css
   * @param text
   * @param inject
   * @param path
   * @returns {XML}
   */
  static render(item, css, text, {path}, inject = {}) {
    Assert.isArrayString({path});
    Assert.isObject({css});
    /** 2.Attrs **/
    let $attrs = Immutable.fromJS({});
    $attrs = $attrs.merge(Op.Anchor.link(item, path))
    $attrs = $attrs.merge(Op.Anchor.action(item, path, inject))
    /** 3.最终生成属性计算 **/
    const attrs = $attrs.toJS()
    /** Uri计算 **/
    attrs['to'] = `${attrs['to']}${Tool.Builder.buildParams(css.active)}`
    if (item.uniqueId) {
      attrs['id'] = item.uniqueId;
    }
    const size = css.size ? css.size : '';
    return (
      <Link id={item.uniqueId} key={item.uniqueId} className={css.className} {...attrs}>
        {(item.icon) ? Field.jsxIcon(item.icon, size) : false}
        {(css.br) ? <br/> : ''}
        {text}
      </Link>
    )
  }
}

export default Anchor
