import Assert from '../assert'
import Immutable from 'immutable'
import Shared from './Visitor.Shared'

const _LAYOUT = {
  "left": {
    "adj": "center aligned",
    "style": {
      "width": "78%",
      "paddingTop": "0.5em"
    }
  },
  "right": {
    "adj": "left aligned",
    "style": {
      "width": "21%",
      "paddingRight": "0.5em",
      "paddingTop": "0.5em"
    }
  },
  "help": {
    "color": "blue"
  }
}

const _LAYOUTFUN = (dft, config) => {
  return Shared.$_fnMerge(dft, config.style, ["left","right","help"])
}

const DFTS = {
  "holder.TabListHolder": _LAYOUT,
  "holder.ListHolder": _LAYOUT,
  "holder.SingleFormHolder": _LAYOUT,
  "holder.CubeHolder": _LAYOUT,
  "holder.DivideHolder": _LAYOUT
}

const DFTSFUN = {
  "holder.TabListHolder": _LAYOUTFUN,
  "holder.ListHolder": _LAYOUTFUN,
  "holder.SingleFormHolder": _LAYOUTFUN,
  "holder.CubeHolder": _LAYOUTFUN,
  "holder.DivideHolder": _LAYOUTFUN
}
class Style {
  /**
   *
   * @param config
   */
  static visit(config) {
    /** 配置中必须包含info键 **/
    Assert.isObject({config});
    /** 读取默认的Style **/
    const style = DFTS[config.name] ? DFTS[config.name] : {}
    let target = Immutable.fromJS(style)
    if (!config.style) {
      return target.toJS()
    } else {
      const jsFun = DFTSFUN[config.name]
      if (jsFun) return jsFun(target, config)
      else return config.style
    }
  }
}

export default Style
