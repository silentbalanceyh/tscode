// ======================================================
// FieldRender
// ======================================================
import Cellula from '../_cellula'
import PureInput from './PureInput'

class PureLabel extends PureInput{

  constructor(props, type = 'label', redux = {}){
    super(props,{
      type,
      component:Cellula.Pivot.jsxLabel,
      redux
    })
  }
}

export default PureLabel
