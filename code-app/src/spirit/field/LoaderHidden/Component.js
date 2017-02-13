// ======================================================
// FieldRender
// ======================================================
import PureField from '../_assembly/PureField'
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
    super(props, 'hidden')
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
