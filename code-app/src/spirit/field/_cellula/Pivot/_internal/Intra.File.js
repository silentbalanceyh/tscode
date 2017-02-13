// ======================================================
// 支持组件类型
// type = text
// type = password
// type = number
// ======================================================
import Immune from '../../Centrum/Immune'
import Immutable from 'immutable'

const SUPPORTED = Immutable.fromJS(['file'])

class File{

  static render(config = {},input){
      if(config.type && SUPPORTED.contains(config.type)){
        return Immune.jsxFile(config,input)
      }else{
        return false
      }
    }
}

export default File
