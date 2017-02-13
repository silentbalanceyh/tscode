import React from 'react'
import moment from 'moment'
import $$ from '../../../../../seed'

import css from '../Pivot.scss'

const render = (config, value) => {
  if (value && "" != value) {
    if (!config.style) config.style = {}
    return (
      <label id={config.cid} style={config.style} className={css['label']}>
        {(config.icon) ? <i className={`${config.icon} icon`}></i> : false}
        {value}
      </label>
    )
  } else {
    return (
      <label id={config.cid} style={config.style} className={css['label']}></label>
    )
  }
}

const filter = (config, keys = []) => {
  if (config) {
    keys.forEach(key => {
      if (config[key]) delete config[key]
    })
  }
}
class Label {

  static assist(config, input) {
    $$.Logger.Input.field(config, "jsxAssist")
    if (!input.value) {
      return false;
    } else {
      let current;
      if (config.assist) {
        const item = config.assist.list.filter(item => item.uniqueId == input.value)
        if (0 < item.length) {
          current = item[0][config.display]
        } else {
          current = config.assist[0][config.display]
        }
      }
      return render(config, current)
    }
  }

  static fixed(config) {
    $$.Logger.Input.field(config, "jsxFixed")
    return render(config, config.fixed)
  }

  static common(config, input) {
    $$.Logger.Input.field(config, "jsxCommon")
    return render(config, input.value)
  }

  /** Linker专用 **/
  static linker(config) {
    $$.Logger.Input.field(config, "jsxLinker")
    /** Delay的方式呈现 **/
    return render(config, '')
  }

  static logical(config, input) {
    $$.Logger.Input.field(config, "jsxLogical")
    const {logical = {}} = config
    const key = (input.value && "" != input.value) ? "true" : "false"
    const value = logical[key]
    return render(config, value)
  }

  static date(config, input) {
    $$.Logger.Input.field(config, "jsxDate")
    let current;
    if ("" != input.value) {
      current = moment(input.value).format(config.format)
    }
    return render(config, current)
  }

  static tabular(config, input) {
    $$.Logger.Input.field(config, "jsxTabular")
    if (input.value) {
      let current;
      if (config.tabular) {
        const field = (config.filter) ? config.filter : 'uniqueId'
        const item = config.tabular.filter(item => item[field] == input.value)
        if (0 < item.length) {
          current = item[0][config.display]
        } else {
          current = config.tabular[0][config.display]
        }
        if (item[0].config) {
          config.icon = item[0].config.icon
        }
        /** Tabular专用配置 **/
      }
      return render(config, current)
    } else return false
  }

  static button(config, input) {
    $$.Logger.Input.field(config, "jsxButton")
    return false
  }

  static state(config) {
    $$.Logger.Input.field(config, "jsxState")
    const current = $$.Entity.Data.lookup(config, config.path)
    return render(config, current)
  }

  static currency(config, input) {
    $$.Logger.Input.field(config, "jsxCurrency")
    return render(config, input.value)
  }
}

export default Label
