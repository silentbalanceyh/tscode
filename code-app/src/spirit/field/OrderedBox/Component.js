// ======================================================
// FieldRender
// ======================================================
import PureField from '../_assembly/PureField'
import Cellula from '../_cellula/Cellula'
import mapping from '../../_internal/Redux'
import dispatches from './Redux'

class Component extends PureField {
  shouldComponentUpdate(){
    return true
  }
  componentWillMount(){
    dispatches.$_fnInit(this.props)
  }
  componentDidUpdate(prevProps){
    dispatches.$_fnUpdate(this.props,prevProps)
  }
  constructor(props) {
    super(props, 'counter',{
      normalize:Cellula.Iota.Normalize.number
    })
  }
}
if (process.env.NODE_ENV === `development`) {

}
export default mapping.single(Component, [
  "form"
], dispatches, 'inputes')
