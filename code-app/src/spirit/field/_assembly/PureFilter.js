// ======================================================
// FieldRender
// ======================================================
import Cellula from '../_cellula'
import PureInput from './PureInput'

class PureFilter extends PureInput{

  constructor(props, type = 'text', redux = {}){
    super(props,{
      type,
      component:Cellula.Pivot.jsxFilter,
      redux
    })
  }
}

export default PureFilter
