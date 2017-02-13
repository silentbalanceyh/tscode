// ======================================================
// FieldRender
// ======================================================
import PureField from '../_assembly/PureField'
import Cellula from '../_cellula/Cellula'

class Component extends PureField {
  constructor(props) {
    super(props, 'text',{
      normalize:Cellula.Iota.Normalize.number
    })
  }
}

export default Component
