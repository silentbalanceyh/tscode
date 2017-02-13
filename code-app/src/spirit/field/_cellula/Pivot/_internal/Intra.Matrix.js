// ======================================================
// 支持组件类型
// type = hidden
// ======================================================
import Enteron from '../../Centrum/Enteron'

class Matrix{
  static marcher(config = {}, input) {
    config.type = 'text'
    return Enteron.jsxRanger(config, input)
  }
}

export default Matrix
