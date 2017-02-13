import React from 'react'

import $$ from '../../../../seed'
import css from './Lymph.scss'
class Lymph {
  /**
   * 处理field部分的修饰className
   */
  static jsxField({
    touched, error,
  }) {
    if (error) {
      return `${touched && error ? 'error' : ''}`.trim()
    } else {
      return ''
    }
  }

  /**
   * 处理asterisk
   * @param config
   */
  static jsxAsterisk(config) {
    const {asterisk} = config
    if ("required" == asterisk) {
      return <i className={`red tiny asterisk icon`}></i>
    } else {
      return false
    }
  }

  /**
   * 追加在后边的浮游错误信息
   * @param touched
   * @param active
   * @param visited
   * @param error
   */
  static jsxError({touched, active, error}, {
    errorStyle, tips, type
  }) {
    const condition = ($$.Tool.Form.isError(type))?(touched && error):(touched && active && error)
    return (tips) ? (
      touched && active &&
      <div className={`ui pointing below basic ${error ? 'red' : ''} label ${css['error']} animated zoomIn`}
           style={errorStyle}>
        <span className={`error`}>{error ? error : tips}</span>
      </div>
    ) : (
      condition &&
      <div className={`ui pointing below basic red label ${css['error']} animated fadeInUp`} style={errorStyle}>
        <span className={`error`}>{error}</span>
      </div>
    )
  }
}

export default Lymph
