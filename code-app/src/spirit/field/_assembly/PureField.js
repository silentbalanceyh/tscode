// ======================================================
// FieldRender
// ======================================================
import Cellula from '../_cellula'
import PureInput from './PureInput'

class PureField extends PureInput{

  constructor(props, type = 'text', redux = {}){
    super(props,{
      type,
      component:Cellula.Pivot.jsxField,
      redux
    })
  }
}

export default PureField

