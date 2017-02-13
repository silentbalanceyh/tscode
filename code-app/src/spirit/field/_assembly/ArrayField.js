
import Cellula from '../_cellula'
import ArrayInput from './ArrayInput'

class ArrayField extends ArrayInput{

  constructor(props, type = 'textarray',redux = {}){
    super(props,{
      type,
      component:Cellula.Pivot.jsxFields,
      redux
    })
  }
}

export default ArrayField
