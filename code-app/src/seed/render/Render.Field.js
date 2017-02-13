import React from 'react'
import Assert from '../assert'
import Tool from '../tool'
import Plugin from '../plugin'
import Immutable from 'immutable'
// ======================================================
// Field Render
// ======================================================
class Field {
  /**
   *
   * @param config
   * @param meta
   */
  static jsxField(config, meta) {
    Assert.isObject({config})
    // 1.先拷贝config
    const $config = Immutable.fromJS(config).toJS();
    // 2.删除不必要属性
    ["language", "createTime", "$loki", "controlId"].forEach(key => {
      delete $config[key]
    })
    // 3.直接提取cid，type
    const {type, cid} = config
    // 4.处理UCA的类型信息
    const Component = Tool.UCA.uca(type)
    // 5.Hidden特殊处理
    const hidden = Tool.Form.isHidden(type)
    // 6.处理meta信息
    if (meta) {
      $config.meta = meta
    } else {
      delete $config.meta
    }
    // 7.隐藏控件的单独处理，用于处理hidden
    const attrs = {type, key: cid, config: $config}
    if (hidden) {
      return ($config.enabled) ? <Component {...attrs}/> : false
    } else {
      return ($config) ? <Component {...attrs}/> : false
    }
  }

  /**
   * 根据state读取对应的状态信息
   * @param config
   * @param state
   * @returns {XML}
   */
  static jsxInput(config, state, meta = {}) {
    Assert.isObject({config});
    // 0.提取所需信息
    const {type, cid} = config;
    config = Tool.Form.configField(config, state, meta);
    Assert.isArrayString({type, cid});
    // 1.读取组件信息
    const Component = Tool.UCA.uca(type);
    // 2.抽取所有Field所需属性
    const hidden = Tool.Form.isHidden(type)
    // 3.检查是否有all配置，如果包含all配置则提取所有的assist以及tabular
    if (config) {
      //if (meta.tabular) config.tabular = meta.tabular
      //if (meta.assist) config.assist = meta.assist
      /** 4.处理dispatch的注入以及Field对应的form的流程 **/
      if (meta.dispatch) config.dispatch = meta.dispatch
      config.form = meta.form ? meta.form : meta.cid
    }
    const attrs = {type, config, state}
    attrs['key'] = cid
    {
      if (config) {
        // 删除不必要的属性信息
        ['commun', 'ajouter', 'vue', 'modifier',
          '$loki', 'createTime', 'language', 'controlId'].forEach(key => {
          if (config[key]) delete config[key]
        })
        // 删除loki中的meta
        if (config.meta && config.meta.created) {
          delete config.meta
        }
      }
    }
    // 4.隐藏控件的单独处理，用于处理hidden
    if (hidden) {
      return (config && config.enabled) ? <Component {...attrs}/> : false
    } else {
      return (config) ? <Component {...attrs}/> : false
    }
  }

  /**
   *
   * @param icon
   * @param adj
   * @returns {*}
   */
  static jsxIcon(icon = '', adj = '', cid, click) {
    const attributes = {}
    if (cid) {
      attributes['id'] = `icon-${cid}`
    }
    if (0 <= icon.indexOf('fa')) {
      attributes['className'] = `${icon} icon`
      attributes['aria-hidden'] = "true"
    } else {
      attributes['className'] = `${adj} ${icon} icon`
    }
    if (click) {
      attributes['onClick'] = click
    }
    return (icon) ? (<i {...attributes}></i>) : false
  }

  /**
   *
   * @param icon
   */
  static jsxOto(icon = '', config = {}) {
    const {node, className, click, index} = config
    const icons = (Plugin.Icon) ? Plugin.Icon : {}
    let defined
    if (0 < Object.keys(icons).length) {
      if (node) {
        defined = Plugin.Icon[node][icon]
      } else {
        for (const key in icons) {
          const item = icons[key]
          if (item && item[icon]) {
            defined = item[icon]
            break
          }
        }
      }
    }
    /** 检索到defined，生成img，没有检索到则直接使用semantic **/
    if (defined) {
      return <img id={`subtabicon${index}`} className={`${className} vicon`} src={defined}
                  onClick={(click) ? click : false}/>
    } else {
      return <i className={`${icon} icon`}/>
    }
  }
}

export default Field
