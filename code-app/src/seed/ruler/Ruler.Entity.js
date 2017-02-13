import Immutable from 'immutable'
import InHere from './Ruler.InHere'

class Entity{

  static isRender(props, name){
    /** 1.检查render **/
    let render = InHere.isRender(props,name)
    /** 2.为true继续检查 **/
    if(render){
      const $data = Immutable.fromJS(props[`$_${name}`])
      if(!$data || !Immutable.Map.isMap($data) || 0 >= $data.size){
        render = false
      }
    }
    return render
  }

  static isUpdated(props, nextProps, name){
    if(Entity.isRender(props,name)) {
      const key = `$_${name}`
      const newVal = Immutable.fromJS(nextProps[key])
      const oldVal = Immutable.fromJS(props[key])
      return !Immutable.is(newVal, oldVal)
    }else{
      return true
    }
  }
}

export default Entity
