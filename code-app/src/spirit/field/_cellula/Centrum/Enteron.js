import React from 'react'
import $$ from '../../../../seed'
import Neuron from '../Neuron/Neuron'
import Iota from '../Iota/Iota'

const $_fnCombo = (config) => {
  return (event) => {
    if (event.target) {
      const {form, name, dispatch} = config
      const field = name
      const value = event.target.value
      if (dispatch) {
        /** 因为Remote Change取值问题，所以借用Redux Form提取对应值 **/
        $$.Plugin.ReduxForm.change(dispatch, {form, field, value})
      }
    }
  }
}

class Enteron {
  /**
   *
   * @param config
   * @param input
   */
  static jsxRanger(config, input) {
    $$.Logger.Input.field(config, 'jsxRanger')
    config.className = `${config.className} jsxPure`.trim()
    return Neuron.jsxInput(config, input)
  }

  /**
   *
   * @param config
   * @param input
   * @returns {*}
   */
  static jsxMarcher(config, input) {
    $$.Logger.Input.field(config, 'jsxMarcher')
    config.className = `${config.className} jsxPure`.trim()
    return (
      <div className="ui mini input">
        {Neuron.jsxInput(config, input)}
      </div>
    )
  }

  /**
   * Tabular专用下拉
   * @param config
   * @param input
   */
  static jsxTabular(config, input) {
    $$.Logger.Input.field(config, 'jsxTabular')
    config.options = Iota.options(config, 'tabular')
    input.multiple = true
    config.className = `${config.className} jsxSelect`.trim()
    // Fix Issue，multiple为true则value必须是数组
    return (config.tabular) ? Neuron.jsxSelect(config, input) : false
  }

  /**
   * RemoteCombo专用
   * @param config
   * @param input
   */
  static jsxCombo(config, input) {
    $$.Logger.Input.field(config, 'jsxCombo')
    config.options = []
    input.onChange = $_fnCombo(config)
    config.className = `${config.className} jsxSelect`.trim()
    return Neuron.jsxSelect(config, input)
  }

  /**
   * Assist专用下拉
   * @param config
   * @param input
   */
  static jsxSelector(config, input) {
    $$.Logger.Input.field(config, 'jsxDropdown')
    if (config.multi) input.multiple = true
    config.className = `${config.className} jsxSelect`.trim()
    return (0 < config.options.length) ? Neuron.jsxSelect(config, input) : false
  }
}

export default Enteron
