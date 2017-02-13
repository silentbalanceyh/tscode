import Immune from '../../Centrum/Immune'
import Immutable from 'immutable'

const SUPPORTED = Immutable.fromJS(['date'])

class Date{

  static render(config = {},input){
    if(config.type && SUPPORTED.contains(config.type)){
      return Immune.jsxDate(config,input)
    }else{
      return false
    }
  }
}

export default Date
