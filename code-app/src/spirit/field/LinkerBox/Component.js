// ======================================================
// FieldRender
// ======================================================
import PureField from '../_assembly/PureField'
import mapping from '../../_internal/Redux'
import dispatches from './Redux'

class Component extends PureField {

  componentWillMount(){
    dispatches.$_fnInit(this.props)
  }

  componentDidUpdate(prevProps){
    dispatches.$_fnUpdate(this.props,prevProps)
  }

  shouldComponentUpdate(){
    return true
  }
  constructor(props) {
    super(props, 'text')
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if (process.env.NODE_ENV === `development`) {

}
export default mapping.single(Component, [
  "form"
], dispatches, 'inputes')
