import Immune from '../../Centrum/Immune'
import Immutable from 'immutable'

const SUPPORTED = Immutable.fromJS(['tree.selector'])

class Tree{
  static render(config = {},input){
    if(config.type && SUPPORTED.contains(config.type)){
      return Immune.jsxTreeSelector(config,input)
    }else{
      return false
    }
  }
}

export default Tree
