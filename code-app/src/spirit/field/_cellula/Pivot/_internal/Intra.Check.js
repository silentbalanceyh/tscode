import Immune from '../../Centrum/Immune'
import Immutable from 'immutable'

const SUPPORTED = Immutable.fromJS(['checkbox'])

class Check{

  static render(config = {},input){
    if(config.type && SUPPORTED.contains(config.type)){
      return Immune.jsxCheck(config,input)
    }else{
      return false
    }
  }

}

export default Check
