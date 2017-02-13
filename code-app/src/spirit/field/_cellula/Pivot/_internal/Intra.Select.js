// ======================================================
// 支持组件类型
// type = hidden
// ======================================================
import Immune from '../../Centrum/Immune'
import Enteron from '../../Centrum/Enteron'
import Immutable from 'immutable'

const SUPPORTED = Immutable.fromJS(['tabular','dropdown','combo'])

class Select{
  /**
   *
   * @param config
   * @param input
   * @returns {*}
   */
  static render(config = {},input){
    if(config.type && SUPPORTED.contains(config.type)){
      return Immune.jsxTabular(config,input)
    }else{
      return false
    }
  }
  /**
   *
   * @param config
   * @param input
   * @returns {*}
   */
  static combo(config = {},input){
    if(config.type && SUPPORTED.contains(config.type)){
      return Enteron.jsxCombo(config,input)
    }else{
      return false
    }
  }

  /**
   *
   * @param config
   * @param input
   * @returns {*}
   */
  static tabular(config = {}, input){
    if(config.type && SUPPORTED.contains(config.type)){
      return Enteron.jsxTabular(config,input)
    }else{
      return false
    }
  }

  /**
   * 专用下拉
   * @param config
   * @param input
   * @returns {*}
   */
  static dropdown(config = {}, input){
    if(config.type && SUPPORTED.contains(config.type)){
      return Enteron.jsxSelector(config,input)
    }else{
      return false
    }
  }
}

export default Select
