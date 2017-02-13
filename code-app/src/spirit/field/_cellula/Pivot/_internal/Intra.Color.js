import Immune from '../../Centrum/Immune'
import Immutable from 'immutable'

const SUPPORTED = Immutable.fromJS(['color'])

class Color{

  static render(config = {},input){
    if(config.type && SUPPORTED.contains(config.type)){
      return Immune.jsxColor(config,input)
    }else{
      return false
    }
  }
}

export default Color
